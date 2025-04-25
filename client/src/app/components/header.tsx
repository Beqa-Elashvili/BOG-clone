"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { useAuthModal } from "./authModal";
import { useAppDispatch } from "../redux";

function Header() {
  const [isSearch, setISsearch] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { AuthModal, setIsAuthModalOpen } = useAuthModal();

  return (
    <div className="p-2 flex justify-between items-center w-full">
      <AuthModal />
      <button className="cursor-pointer p-1 px-4 rounded-lg transition-all ease-in-out duration-300 hover:scale-110 shadow-custom">
        iHome
      </button>
      <div className="flex items-center justify-between">
        <FaHouseUser
          onClick={() => dispatch(setIsAuthModalOpen(true))}
          className={`-translate-x-10 ${
            isSearch && "-translate-x-42"
          } size-8 text-cyan-500 cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-300 bg-gray-200 rounded-full p-1`}
        />
        <div className="relative w- flex items-center">
          <input
            type="text"
            placeholder="search..."
            className={`
            absolute text-sm right-0 w-0 transition-all duration-300 ease-in-out
            shadow-custom rounded-lg p-2 outline-none
            ${isSearch ? "opacity-100 w-40" : "opacity-0 pointer-events-none "}
          `}
          />
          <FaSearch
            onClick={() => setISsearch(!isSearch)}
            className="absolute z-10 cursor-pointer right-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
