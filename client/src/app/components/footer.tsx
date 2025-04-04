import React from "react";
import { MdHome } from "react-icons/md";
import { FaRegRectangleList } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { PiGridFourFill } from "react-icons/pi";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  return (
    <div className="absolute bottom-0 bg-gray-900 p-2 pb-3 w-full flex justify-between items-center">
      <div
        className={`flex flex-col items-center ${
          pathname === "/" && "text-orange-500"
        } `}
      >
        <MdHome />
        <p className="text-[12px] font-semibold">მთავარი</p>
      </div>
      <div className="flex flex-col items-center">
        <FaRegRectangleList />
        <p className="text-[12px] font-semibold">ჩემი სივრცე</p>
      </div>
      <div>
        <div className="font-semibold">₾</div>
      </div>
      <div className="flex flex-col items-center">
        <BiSolidOffer />
        <p className="text-[12px] font-semibold">შეთავაზებები</p>
      </div>
      <div className="flex flex-col items-center">
        <PiGridFourFill />
        <p className="text-[12px] font-semibold">პაბი</p>
      </div>
    </div>
  );
}

export default Footer;
