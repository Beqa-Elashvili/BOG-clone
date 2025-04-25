"use client";

import React, { useState } from "react";
import { useAppSelector } from "../redux";
import Modal from "../(Components)/modal";

function page() {
  const { isUser } = useAppSelector((state) => state.global);
  const [openModal, setIsOpenModal] = useState<boolean>(false);
  return (
    <div className="py-8 shadow-inner-custom  pb-12 flex flex-col gap-2 w-full">
      {openModal && (
        <div className="absolute bg-white/50 w-full h-full inset-0 flex items-center justify-center">
          <Modal setState={setIsOpenModal} />
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl text-cyan-800 text-balance font-semibold">
            Reliable Home Cleaning Services at Your Fingertips
          </h1>
          <div className="max-w-4/5 text-cyan-600 text-sm shadow-custom p-2 rounded-lg">
            Book trusted, background-checked maids with ease. Whether it's a
            one-time deep clean or recurring service, we’ve got the perfect
            match for your home. Affordable, flexible, and hassle-free cleaning
            solutions.
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setIsOpenModal(true)}
              className="p-2 transition-all text-cyan-800 font-semibold duration-300 ease-in-out hover:scale-110 cursor-pointer rounded-lg shadow-custom"
            >
              Your Home Service
            </button>
            <button className="p-2 transition-all text-cyan-800 font-semibold duration-300 ease-in-out hover:scale-110 cursor-pointer rounded-lg shadow-custom">
              MaidConnect Portal
            </button>
          </div>
        </div>
        <img
          className="w-3/6 object-contaion"
          src="./images/pngtree-house-cleaning.png"
          alt="img"
        />
      </div>
    </div>
  );
}

export default page;
