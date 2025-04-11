import React from "react";
import { MdHome } from "react-icons/md";
import { FaRegRectangleList } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { PiGridFourFill } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { VscSignOut } from "react-icons/vsc";

function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const SignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="bg-gray-900 p-2 pb-3 w-full flex justify-between items-center">
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
      <div
        className="cursor-pointer"
        onClick={() => router.push("/transaction")}
      >
        <div className="font-semibold">₾</div>
      </div>
      <div className="flex flex-col items-center">
        <BiSolidOffer />
        <p className="text-[12px] font-semibold">შეთავაზებები</p>
      </div>
      <div onClick={SignOut} className="flex flex-col items-center">
        <VscSignOut />
        <p className="text-[12px] font-semibold">გამოსვლა</p>
      </div>
    </div>
  );
}

export default Footer;
