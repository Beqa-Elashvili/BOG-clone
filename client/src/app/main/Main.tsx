"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { storyTypes } from "../types/globaltypes";
import { useAppSelector } from "../redux";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

type Props = {};

function page({}: Props) {
  const [stories, setStories] = React.useState<storyTypes[]>([]);
  const { isUser } = useAppSelector((state) => state.global);
  const [visible, setVisible] = useState<boolean>(true);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getStories = async () => {
    const resp = await axios.get(`${url}/api/story/stories`);
    setStories(resp.data);
  };
  useEffect(() => {
    getStories();
  }, []);

  const [walute, setWalute] = useState<string>("₾");

  const getCalculatedWallet = () => {
    const balance = isUser?.balance;
    if (balance)
      if (walute === "₾") {
        return balance;
      } else if (walute === "$") {
        return balance * 0.3;
      } else if (walute === "€") {
        return balance * 0.25;
      }
    return balance;
  };

  const getFullWallet = (coin: string) => {
    if (isUser)
      if (coin === "₾") {
        return isUser?.balance;
      } else if (coin === "$") {
        return isUser?.balance * 0.3;
      } else if (coin === "€") {
        return isUser?.balance * 0.25;
      }
  };

  return (
    <div className="p-2 flex flex-col gap-2 w-full">
      <Carousel
        slidesToScroll={2}
        centerPadding="30px 0px 0px 0px"
        centerMode={true}
        slidesToShow={3}
        dots={false}
      >
        {stories.map((story) => (
          <div key={story.id} className="p-2">
            <div className="ring-2 w-[5rem]  p-px ring-orange-600 rounded-lg">
              <img
                src={story.imageUrl}
                alt="storyImg"
                className=" h-[6rem] w-[5rem] object-cover m-auto rounded-lg"
              />
            </div>
          </div>
        ))}
      </Carousel>
      <div>
        <div className="flex z-20 bg-gray-900  relative justify-between items-center">
          <div>
            <h1 className="text-sm text-gray-300">სულ ხელმისაწვდომი თანხა</h1>
            <input
              type={visible ? "text" : "password"}
              value={getCalculatedWallet() + walute}
              className="text-md  outline-none"
              readOnly
            />
          </div>
          <div className="flex items-center gap-4">
            <div
              className="cursor-pointer"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            >
              {dropDown ? <FaAngleUp /> : <FaAngleDown />}
            </div>
          </div>
        </div>
        <div
          className={`flex  text-[12px] text-gray-400  items-center pointer-events-none gap-2 transition-transform duration-500 ease-in-out ${
            dropDown ? "transform translate-y-0 " : "transform -translate-y-10 "
          }`}
        >
          <div
            className={`bg-gray-800 ${
              walute === "₾" && "text-white"
            }  p-px px-1 rounded-xl inline`}
          >
            {getFullWallet("₾")} ₾
          </div>
          <div
            className={`bg-gray-800 ${
              walute === "$" && "text-white"
            }  p-px px-1 rounded-xl inline`}
          >
            {getFullWallet("$")} $
          </div>
          <div
            className={`bg-gray-800 ${
              walute === "€" && "text-white"
            }  p-px px-1 rounded-xl inline`}
          >
            {getFullWallet("€")} €
          </div>
        </div>
      </div>
      <div className="relative  transition duration-300 overflow-hidden  gap-2  cursor-pointer rounded-md group">
        <div className="bg-cyan-800 rounded-lg p-2 flex flex-col gap-4">
          <div className="flex z-20 flex-col">
            <h1>უნივერსალური ანგარიში</h1>
            <input
              type={visible ? "text" : "password"}
              value={getCalculatedWallet() + walute}
              className="text-xl  outline-none"
              readOnly
            />
          </div>
          <div className="flex z-20 gap-2 items-center">
            <div
              onClick={() => setWalute("₾")}
              className="ring-1 hover:bg-gray-700 transition duration-300  cursor-pointer ring-white p-px w-6 text-center rounded-lg"
            >
              ₾
            </div>
            <div
              onClick={() => setWalute("$")}
              className="ring-1 hover:bg-gray-700 transition duration-300 cursor-pointer ring-white p-px w-6 text-center rounded-lg"
            >
              $
            </div>
            <div
              onClick={() => setWalute("€")}
              className="ring-1 hover:bg-gray-700 transition duration-300  cursor-pointer ring-white p-px w-6 text-center rounded-lg"
            >
              €
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br  opacity-50  from-cyan-800 to-orange-500 rounded-lg absolute bottom-0 right-0 w-full h-full transform"></div>
        <div
          className={`absolute pointer-events-none inset-0 bg-white/10 w-full h-full z-10 ${
            visible ? "translate-x-full" : "translate-x-0"
          } transition-transform duration-300 ease-in-out rounded-lg`}
        ></div>
      </div>
    </div>
  );
}

export default page;
