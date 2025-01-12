import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addTOPaste, upadateFromPaste } from '../redux/pasteSlice';
import {useDispatch, useSelector} from 'react-redux'
import { Copy } from 'lucide-react';

import toast from 'react-hot-toast';

const Home = () => {
    const [title,setitle]=useState('');
    const[value,setvalue]=useState('');
    const [searchParams,setsearchParams]=useSearchParams();
    const pasteId=searchParams.get("pasteId");
    const dispatch= useDispatch();
   const allpastes = useSelector((state) =>state.paste.pastes)


 useEffect(() => {
  if(pasteId){
const paste= allpastes.find((p)=> p._id===pasteId)
setitle(paste.title);
setvalue(paste.content);

  }
 }, [pasteId])
 

    function createpaste(){
      const paste={
       title:title,
       content: value,
       _id: pasteId ||
          Date.now().toString(36),
            createdAt:new Date().toISOString(),
        
      }

       if(pasteId){
        // update
  dispatch(upadateFromPaste(paste));
       }
         else {
          //create
        dispatch(addTOPaste(paste));
      }

      // after creation and upadation
        
      setitle('');
      setvalue('');
      setsearchParams({});
    }

  return (
<div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
<div className='flex flex-row place-content-between '>

  {/* input or textarea in side the setup */}
   
   <input 
   className='p-2 rounded  w-[77%] pl-4 border ml-20 '
   type="text"
   value={title}
   placeholder='Enter Your title ✍️'
   onChange={(e)=> setitle(e.target.value)}
   />

      <button 
      onClick={createpaste} className='p-1.5 rounded-1xl mt-3 bg-blue-800	text-white'>
      {
          pasteId ? "Update My paste" : "create My paste"
      }
      </button>
  </div>



  <div className=' border border-[rgba(128,121,121,0.3)] mt-8 ml-20 w-[84%] absolute '>
  <div className=' p-1 text-left flex flex-row items-center place-content-between'>
    
    <section className='flex flex-row gap-2 p-4'>
  <div className='w-4 h-4 bg-orange-400	rounded-2xl '></div>
  <div className='w-4 h-4 bg-red-500	 rounded-2xl '></div>
  <div className='w-4 h-4 bg-green-500	rounded-2xl '></div>
  </section>
   <button onClick={() => { navigator.clipboard.writeText(value);
   toast.success("copied to clipboard",{position : "top-right"
   });
  
    
   }}
   >
    <Copy />
    </button>
   
  </div>
    <textarea 
    className=' p-4 min-w-[800px] border-t border-[rgba(128,121,121,0.3)] relative w-[100%] h-80'
    value={value}
    placeholder='Enter Your Content here....'
    rows={20}
    onChange={(e)=> setvalue(e.target.value)}
    />
  </div>
</div>

  )
}

export default Home
