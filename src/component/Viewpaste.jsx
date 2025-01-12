
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addTOPaste, upadateFromPaste } from '../redux/pasteSlice';
import {useDispatch, useSelector} from 'react-redux'


const Viewpaste = () => {
const {id} =useParams();
 const allpastes =useSelector((state)=>state.paste.pastes);

 const paste =allpastes.filter((p)=>p._id===id)[0];

 console.log("final paste",paste)


  return (
    <div>
    <div className='flex flex-row gap-7 place-content-between '>
       
       <input 
       className='p-2 rounded-2xl mt-2 w-[66%] pl-4'
       type="text"
       value={paste.title}
       disabled
       placeholder='enter your title'
       onChange={(e)=> setitle(e.target.value)}
       
       />
    
          {/* <button 
          onClick={createpaste} className='p-1.5 rounded-2xl mt-2'>
          {
              pasteId ? "Update My paste" : "create My paste"
          }
          </button> */}
      </div>
    
      <div className='p-8 pl-1'>
        <textarea 
        className='rounded-2xl p-4 min-w-[500px] border '
        value={paste.content}
        placeholder='enter your content '
        rows={20}
        onChange={(e)=> setvalue(e.target.value)}
        disabled
        />
      </div>
    </div>
    
  )
}

export default Viewpaste
