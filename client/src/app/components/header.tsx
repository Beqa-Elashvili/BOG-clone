import React from "react";
import { IoIosSearch } from "react-icons/io";

function Header() {
  return (
    <div className="text-white p-2 flex items-center w-full justify-between">
      <h1>მთავარი</h1>
      <IoIosSearch size={16} />
    </div>
  );
}

export default Header;
