/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAllpaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { FormatDate } from "../date/dateformat";
import { Copy, Eye, Pencil, SquareX, Share } from "lucide-react";
import {FaWhatsappSquare ,FaFacebook} from"react-icons/fa";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setsearchterm] = useState("");
  const dispatch = useDispatch();

  const filterdData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handledelete(pasteId) {
    dispatch(removeAllpaste(pasteId));
  }

  return (
    <div className="w-full h-full py-10 max-w-[1280] mx-auto px-5 lg:px-0 flex flex-col justify-center items-center">
      <input
        className="  p-4 mb-4 rounded min-w-[900px] bg-transparent border "
        type="search"
        placeholder="search term"
        value={searchTerm}
        onChange={(e) => setsearchterm(e.target.value)}
      />
      <div className="border p-5 font-bold w-[900px] flex flex-col items-center ">
        <h1 className="text-left mb-5 ">All pastes </h1>
        <div className=" flex flex-col gap-5 w-[800px] items-center">
          {filterdData.length > 0 &&
            filterdData.map((paste) => {
              return (
                <div
                  className="border flex flex-row border-[(128,121,121,0.3)] w-full  justify-center "
                  key={paste?._id}
                >
                  <div className=" w-[100%] flex flex-col space-y-5 text-left p-4  ">
                    <div className="text-6xl font-semibold">{paste.title}</div>
                    <div
                      className=" text-2xl
                font-normal line-clamp-3 max-w-[80%] text-[#707070]"
                    >
                      {paste.content}
                    </div>
                  </div>

                  <section className="flex flex-col items-center  justify-center w-[300px gap-1 p-3" >
                    <div className="flex flex-row gap-2 p-2">
                      <button  className="bg-black">
                        <a href={`/?pasteId=${paste?._id}`}>
                          <Pencil
                            className="text-white
                            
                            group-hover:text-blue-500"
                            size={15}
                          />
                        </a>
                      </button>
                      <button
                      className="bg-black"> 
                        <a href={`/pastes/${paste?._id}`}>
                          <Eye
                            className="text-white group-hover:text-blue-500"
                            size={15}
                          />
                        </a>
                      </button>
                      <button className="bg-black"
                        onClick={() => {
                          {
                            navigator.clipboard.writeText(paste?.content);
                          }

                          toast.success("copied to clipboard");
                        }}
                      >
                        <Copy
                          className="text-white group-hover:text-blue-500"
                          size={10}
                        />
                      </button>

                      <button onClick={() => handledelete(paste?._id)} className="bg-black">
                        <SquareX
                          className="text-white group-hover:text-blue-500"
                          size={10}
                        />
                      </button>

                      <button className="bg-black">
                        <Share
                          className="text-white group-hover:text-blue-500"
                          size={10}
                        />
                      </button>
                    </div>

                   <div className="flex  gap-4">
                 <a href="http://www.youtube.com"><FaFacebook size={40}/> </a>

                 <a href="http://www.youtube.com"><FaWhatsappSquare 
                 size={40}/> </a>

                 
                 <a href="http://www.youtube.com"><FaFacebook size={40}/></a>
                 </div>

                    <div 
                    className="text-xl mb-3 ">{FormatDate(paste.createdAt)}</div>
                  </section>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Paste;
