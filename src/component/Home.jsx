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
<div>
<div className='flex flex-row gap-7 place-content-between '>
   
   <input 
   className='p-2 rounded-2xl mt-3 w-[66%] pl-4 border'
   type="text"
   value={title}
   placeholder='enter your title ✍️'
   onChange={(e)=> setitle(e.target.value)}
   />

      <button 
      onClick={createpaste} className='p-1.5 rounded-1xl mt-3 bg-blue-700	'>
      {
          pasteId ? "Update My paste" : "create My paste"
      }
      </button>
  </div>



  <div className=' border border-[rgba(128,121,121,0.3)] mt-3 '>
  <div className=' p-3 text-left flex flex-row items-center place-content-between '>
   💖💞😍  
   <button onClick={() => { navigator.clipboard.writeText(value);
   toast.success("copied to clipboard",{position : "top-right"
   });
    
   }}
   >
    <Copy />
    </button>
   
  </div>
    <textarea 
    className=' p-3 min-w-[500px] border border-[rgba(128,121,121,0.3)]'
    value={value}
    placeholder='enter your content'
    rows={20}
    onChange={(e)=> setvalue(e.target.value)}
    />
  </div>
</div>

  )
}

export default Home
