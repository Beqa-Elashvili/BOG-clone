"use client";
import { useAppSelector } from "../redux";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const { users, isUser } = useAppSelector((state) => state.global);
  return (
    <div>
      <div className="p-2 flex items-center gap-4">
        <FaAngleLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1 className="font-semibold">გადარიცხვები</h1>
      </div>
      <div className="flex  gap-2">
        <div className="relative w-full flex overflow-hidden items-center">
          <div className="h-20 w-full  rounded-r-full z-0  bg-orange-400"></div>
          <FaChevronRight className="size-40  absolute  z-10 -right-18  text-gray-900" />
        </div>
        <div className="h-20 w-full bg-orange-400 "></div>
      </div>
    </div>
  );
}

export default page;
