/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAllpaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { FormatDate } from "../date/dateformat";
import { Copy, Eye, Pencil, SquareX, Share } from "lucide-react";
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
    <div className="w-full h-full py-10 max-w-[1000px] mx-auto px-5 lg:px-0">
      <input
        className=" w-full p-2 mb-5 rounded-2xl min-w-[500px] mt-1 bg-transparent border"
        type="search"
        placeholder="search term"
        value={searchTerm}
        onChange={(e) => setsearchterm(e.target.value)}
      />
      <div className="border p-5 font-bold ">
        <h1 className="text-left mb-5">All pastes </h1>
        <div className="w-full flex flex-col gap-5 ">
          {filterdData.length > 0 &&
            filterdData.map((paste) => {
              return (
                <div
                  className="border flex flex-row border-[(128,121,121,0.3)]"
                  key={paste?._id}
                >
                  <div className=" w-[90%] flex flex-col space-y-3 text-left p-3 ">
                    <div className="text-4xl font-semibold">{paste.title}</div>
                    <div
                      className="
               text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]"
                    >
                      {paste.content}
                    </div>
                  </div>

                  <section className="flex flex-col items-center  justify-center w-[300px gap-2" >
                    <div className="flex flex-row gap-2 p-2 ol">
                      <button>
                        <a href={`/?pasteId=${paste?._id}`}>
                          <Pencil
                            className="text-white 
                            group-hover:text-blue-500"
                            size={15}
                          />
                        </a>
                      </button>
                      <button>
                        <a href={`/pastes/${paste?._id}`}>
                          <Eye
                            className="text-white group-hover:text-blue-500"
                            size={15}
                          />
                        </a>
                      </button>
                      <button
                        onClick={() => {
                          {
                            navigator.clipboard.writeText(paste?.content);
                          }

                          toast.success("copied to clipboard");
                        }}
                      >
                        <Copy
                          className="text-white group-hover:text-blue-500"
                          size={15}
                        />
                      </button>

                      <button onClick={() => handledelete(paste?._id)}>
                        <SquareX
                          className="text-white group-hover:text-blue-500"
                          size={15}
                        />
                      </button>

                      <button>
                        <Share
                          className="text-white group-hover:text-blue-500"
                          size={15}
                        />
                      </button>
                    </div>
                    <div className="text-xs">{FormatDate(paste.createdAt)}</div>
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
