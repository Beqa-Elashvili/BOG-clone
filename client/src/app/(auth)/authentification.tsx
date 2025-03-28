"use client";

import React from "react";
import { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";

function Authentification() {
  const [moveTop, setMoveTop] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMoveTop(true);
    }, 2000);
  }, []);

  return (
    <div className="bg-[#ff6022] h-screen overflow-hidden">
      <img src="images/unnamed.webp" alt="BOG" />
      <div
        className={` text-white transition-transform rounded-t-4xl p-4 duration-1000 bg-black w-full min-h-screen h-full transform ${
          moveTop ? "translate-y-0" : "translate-y-6/12 "
        }`}
      >
        <div>
          <CiUser />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Authentification;
