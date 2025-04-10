"use client";

import React, { act, useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { storyTypes, offerTypes, TransactionTypes } from "../types/globaltypes";
import { useAppSelector } from "../redux";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { Spin } from "antd";
import { IoMdCheckmarkCircle } from "react-icons/io";
import useGetActivateOffers from "../hooks/getActivateOffers/useGetActivateOffers";

function page() {
  const [stories, setStories] = React.useState<storyTypes[]>([]);
  const [offers, setOffers] = React.useState<offerTypes[]>([]);
  const [transactions, setTransactions] = useState<TransactionTypes[] | null>(
    []
  );
  const { isUser } = useAppSelector((state) => state.global);

  const [visible, setVisible] = useState<boolean>(true);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [offerLoading, setOfferLoading] = useState<boolean>(false);
  const { getActiveOffer } = useGetActivateOffers();
  const activeOffers = useAppSelector((state) => state.global.activatorOffers);
  const [animateLine, setAnimateLine] = useState(false);
  const [storyId, setStoryId] = useState<string>("");
  const [transitionId, setTransitionId] = useState<string>("");

  useEffect(() => {
    if (storyId) {
      setAnimateLine(true);
      const timer = setTimeout(() => {
        setStoryId("");
        setAnimateLine(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [storyId]);

  const getInfo = async () => {
    const resp = await axios.get(`${url}/api/story/stories`);
    const OfferResp = await axios.get(`${url}/api/offers/offers`);
    const transactionsResp = await axios.get(
      `${url}/api/transaction/transaction/${isUser?.id}`
    );
    setTransactions(transactionsResp.data.transactions);
    setStories(resp.data);
    setOffers(OfferResp.data);
    await getActiveOffer();
  };

  useEffect(() => {
    getInfo();
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

  const PointsCosts = () => {
    if (isUser?.points) {
      const costs = isUser?.points / 400;
      return costs;
    }
  };
  const [succes, setSucces] = useState<boolean>(false);

  const [offerId, setOfferId] = useState<string>("");

  if (storyId) {
    const story = stories.find((item) => item.id === storyId);
    return (
      <div className="absolute z-10  inset-0 text-center bg-black w-full h-full ">
        <img
          className="h-full w-full  object-cover"
          src={story?.imageUrl}
          alt="image"
        />
        <IoIosClose
          onClick={() => {
            setStoryId(""), setAnimateLine(false);
          }}
          className="cursor-pointer absolute bg-gray-500 rounded-full top-2 right-2"
        />
        <div
          className={`absolute bottom-0 left-0 h-1 bg-white transition-all duration-3000 ease-in-out ${
            animateLine ? "w-full" : "w-0"
          }`}
        ></div>
      </div>
    );
  }

  if (offerId) {
    const offer = offers.find((item) => item.id === offerId);

    const handleOfferActivate = async () => {
      try {
        setOfferLoading(true);
        await axios.post(`${url}/api/offers/activateOffer`, {
          userId: isUser?.id,
          offerId: offer?.id,
        });
        await getActiveOffer();
        setSucces(true);
      } catch (error) {
        console.log(error);
      } finally {
        setOfferLoading(false);
        const timeout = setTimeout(() => {
          setSucces(false);
          setOfferId("");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    };

    const findOffer = activeOffers?.find((item) => item.offerId === offerId);
    return (
      <div className="absolute p-2 inset-0 bg-white/10 w-full h-full z-10">
        <div className="mt-8 flex justify-between items-center">
          <FaAngleLeft
            className="cursor-pointer"
            onClick={() => setOfferId("")}
          />
          <h1>{offer?.title}</h1>
        </div>
        <img className="size-40 m-auto" src={offer?.imageUrl} alt="" />
        <p className="text-gray-300">{offer?.metaDescription}</p>
        <div className="flex flex-col mt-8 justify-start gap-2">
          {offer?.description.map((item, index) => (
            <div key={index} className="flex items-cente gap-2">
              <CiCircleCheck className="size-6 text-green-500" />
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
        <div className="relative w-full" style={{ position: "relative" }}>
          <button
            disabled={findOffer ? true : false}
            onClick={() => handleOfferActivate()}
            className="text-center  w-full mt-12 p-2 bg-orange-700 rounded-lg"
          >
            {findOffer ? "შეთავაზება უკვე გააქტიურებულია !" : offer?.title}
          </button>
          {offerLoading && (
            <Spin
              style={{
                position: "absolute",
                top: "65%",
                color: "#3434343",
                bottom: "50%",
                right: 6,
              }}
            />
          )}
        </div>
        {succes && (
          <div className="absolute bg-black/50 flex justify-center items-center inset-0 text-white   w-full h-full z-10 ">
            <div className="border flex items-center justify-center rounded-lg  bg-orange-500 w-5/6 h-2/12">
              <h1>შეთავაზება წარმატებით გააქტიურდა</h1>
              <IoMdCheckmarkCircle className="text-orange-100  size-6 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (transitionId) {
    const transition = transactions?.find((item) => item.id === transitionId);
    const date = new Date(transition?.createdAt!);
    const formDate = new Intl.DateTimeFormat("ka-GE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
    return (
      <div className="absolute z-10  inset-0 text-center bg-black w-full h-full">
        <div className="bg-gray-800 space-y-2 p-2">
          <div className="flex gap-4 items-center">
            <FaAngleLeft
              className="cursor-pointer"
              onClick={() => setTransitionId("")}
            />
            <h1>ტრანზაქციები</h1>
          </div>
          <h1 className="text-orange-500 text-6xl">₾</h1>
          <p>{transition?.toUser.name}</p>
          <p>{formDate}</p>
          <div className="text-4xl">
            {transition?.fromUser.id === isUser?.id ? (
              <h1>-{transition?.amount} ₾</h1>
            ) : (
              <h1>{transition?.amount} ₾</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
  const today = new Date();

  const monthsInGeorgian = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];

  const day = today.getDate().toString().padStart(2, "0");
  const month = monthsInGeorgian[today.getMonth()];
  const year = today.getFullYear();

  const formattedDate = `${day} ${month.slice(0, 3)}, ${year}`;

  console.log(transactions);
  return (
    <div className="p-2 flex flex-col gap-2 w-full">
      <Carousel
        slidesToScroll={2}
        centerPadding="30px 0px 0px 0px"
        centerMode={true}
        autoplay={true}
        slidesToShow={3}
        dots={false}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setStoryId(story.id)}
            className="p-2"
          >
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
      <div className="mt-4 bg-gray-800 p-2 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-[12px]">PLUS ქულები</p>
          <p className="text-sm">{isUser?.points}</p>
          <p className="text-gray-400 text-[12px]">{PointsCosts()} ₾</p>
        </div>
        <p className="text-orange-600 font-semibold text-sm">PLUS</p>
      </div>
      {offers && offers.length > 0 && (
        <div className="bg-gray-800 p-1 rounded-lg">
          <h1 className="text-md p-2">ბოლო შეთავაზებები</h1>
          <Carousel
            slidesToScroll={2}
            centerPadding="2px 0px 0px 0px"
            slidesToShow={2}
            dots={false}
          >
            {offers.map((offer) => (
              <div key={offer.id} className="p-2">
                <div
                  style={{ backgroundColor: "rgba(109, 74, 18, 0.434)" }}
                  className="w-full  h-42 m-auto p-1  rounded-lg"
                >
                  <div className="flex w-full h-full text-white">
                    <div className="w-full flex flex-col justify-between h-full">
                      <div>
                        <img
                          src={offer.imageUrl}
                          alt="storyImg"
                          className=" h-[4rem]  w-[4rem] object-cover"
                        />
                        <p className="text-[12px]">{offer.mainTitle}</p>
                      </div>
                      <button
                        onClick={() => setOfferId(offer.id)}
                        className=" cursor-pointer text-orange-600 font-semibold text-[12px] text-start rounded-lg"
                      >
                        {offer.title}
                      </button>
                    </div>
                    <IoIosClose
                      onClick={() =>
                        setOffers(offers.filter((item) => item.id !== offer.id))
                      }
                      className="p-px inline cursor-pointer w-6 h-6 rounded-full bg-gray-800 size-6 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <div className="text-white  bg-gray-800 rounded-lg p-2 mb-20">
        <h1 className="text-md">ბოლო ტრანზაქციები</h1>
        <p className="my-2 text-sm text-gray-400">{formattedDate}</p>
        <div className="space-y-4">
          {transactions?.map((item: TransactionTypes) => (
            <div
              onClick={() => setTransitionId(item.id)}
              key={item.id}
              className="flex justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <div className="text-orange-500 border-gray-500 bg-gray-900 border rounded-full h-8 w-8 flex items-center justify-center">
                  ₾
                </div>
                <div>
                  {item.fromUser.id === isUser?.id ? (
                    <h1>{item.toUser.name}</h1>
                  ) : (
                    <>
                      <h1>{item.fromUser.name}</h1>
                    </>
                  )}
                  <p className="text-gray-400 text-sm">გადარიცხვები</p>
                </div>
              </div>
              <div>
                {item.fromUser.id === isUser?.id ? (
                  <h1>-{item.amount} ₾</h1>
                ) : (
                  <h1 className="text-green-500">{item.amount} ₾</h1>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
