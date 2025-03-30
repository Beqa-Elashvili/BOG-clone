"use client";

import React, { use } from "react";
import { useState, useEffect } from "react";
import Button from "../(Components)/Button";
import Input from "../(Components)/Input";
import { Checkbox } from "antd";
import { IoClose } from "react-icons/io5";
import { FaDeleteLeft } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";

import { useAppDispatch, useAppSelector } from "../redux";
import { setIsRegisterForm } from "@/redux/globalSlice";
import axios from "axios";

function Authentification() {
  const [moveTop, setMoveTop] = useState(false);
  const dispatch = useAppDispatch();
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const isRegister = useAppSelector((state) => state.global.isRegisterForm);

  useEffect(() => {
    setMoveTop(false);
    setTimeout(() => {
      setMoveTop(true);
    }, 2000);
  }, [isRegister]);

  const ToggleForms = () => {
    dispatch(setIsRegisterForm(!isRegister));
  };

  const [numbers, setNumbers] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    <FaDeleteLeft />,
  ]);

  const [value, setValue] = useState("");

  const handleClick = (key: keyof typeof userValue, number: any) => {
    if (number.type === FaDeleteLeft) {
      setValue(value.slice(0, -1)); // Remove the last character from the field
    } else {
      setValue(value + number);
    }
  };

  const handleRegister = (kay: any, value: any) => {
    if (kay === "personalNumber" || kay === "phoneNumber") {
      handleClick(kay, value);
    } else {
      setValue(value);
    }
  };

  const [userValue, setUserValue] = useState({
    name: "",
    personalNumber: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleUser = async () => {
    const resp = await axios.get(`${url}/api/users/email/${userValue.email}`);
    setUserValue((prev) => ({
      ...prev,
      personalNumber: resp.data.personalNumber,
      name: resp.data.name,
      phoneNumber: resp.data.phoneNumber,
    }));
  };

  const handleValues = (kay: any, value: any) => {
    if (kay === "personalNumber" && value.length !== 11) {
      alert("პირადი ნომერი უნდა იყოს 11 ციფრი");
      return;
    } else {
      setUserValue((prev) => ({
        ...prev,
        [kay]: value,
      }));
    }
  };

  console.log(userValue);

  return (
    <div className="h-screen overflow-hidden">
      {isRegister ? (
        <div className="bg-[#ff6022]">
          <img src="images/unnamed.webp" alt="BOG" />
          <div
            className={` text-white translate-y-0 p-4 px-4 transition-transform rounded-t-2xl  duration-1000 bg-black w-full min-h-screen h-full transform ${
              moveTop ? "translate-y-0" : "translate-y-40"
            }`}
          >
            {userValue.personalNumber ? (
              <div>
                <div className="flex items-center gap-2">
                  <CiUser className="text-2xl" />
                  <div>
                    <p className=" text-sm text-gray-400">მომხმარებელი</p>
                    <h1 className="font-semibold">{userValue.name}</h1>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <Input
                    onChange={(e) =>
                      setUserValue((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    value={userValue.password}
                    name="password"
                    type="text"
                    label="პაროლი"
                  />
                  <Button>შემდეგი</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 justify-start">
                  <h1 className="font-semibold">შესვლა</h1>
                  <Input
                    onChange={(e) =>
                      setUserValue((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    value={userValue.email}
                    name="name"
                    type="text"
                    label="მომხმარებლის მეილი"
                  />
                </div>
                <div className="flex justify-center mt-8 items-center gap-2">
                  <Checkbox />
                  <p className="text-sm">მომხმარებლის დამახსოვრება</p>
                </div>
                <div className="mt-2">
                  <Button onClick={handleUser}>შემდეგი</Button>
                </div>
                <div>
                  <p className="text-[12px] text-center mt-8">
                    არ ხარ დარეგსტრირებული?
                  </p>
                </div>
                <button
                  onClick={ToggleForms}
                  className="w-full cursor-pointer text-center mt-2 backdrop-opacity-95 bg-orange-700 bg-opacity-50  p-2 rounded-lg font-semibold text-sm transition duration-200"
                >
                  რეგისტრაცია
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className=" bg-gray-900  h-screen  w-full text-white">
            <div className="p-4">
              <div className="flex w-full justify-between">
                <h1 className="w-full font-semibold">რეგისტრაცია</h1>
                <IoClose
                  onClick={() => dispatch(setIsRegisterForm(true))}
                  className="text-white p-1 cursor-pointer bg-gray-800 h-8 w-8 rounded-full "
                />
              </div>
              <div className="p-12 rounded-lg">
                <img
                  className="w-full rounded-xl"
                  src="images/idCard.jpg"
                  alt="idCard"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  value={value}
                  type="number"
                  name="personalNumber"
                  label="პიდარი ნომერი"
                />
                <Button onClick={() => handleValues("personalNumber", value)}>
                  შემდეგი
                </Button>
              </div>
            </div>
            <div
              className={` text-white  translate-y-0  p-4 px-4 transition-transform duration-1000 bg-gray-800 w-full min-h-screen h-full transform ${
                moveTop ? "translate-y-2" : "translate-y-40"
              }`}
            >
              <div className="grid grid-cols-3 gap-2 justify-center items-center">
                {numbers.map((number, index) => (
                  <div
                    key={index}
                    onClick={() => handleRegister("personalNumber", number)}
                    className={`h-10 hover:bg-gray-700 cursor-pointer bg-gray-600 w-full rounded-lg flex justify-center items-center text-xl font-semibold ${
                      index === numbers.length - 1
                        ? "col-span-1 justify-center"
                        : ""
                    } ${
                      index === numbers.length - 1
                        ? "col-span-2 justify-center"
                        : ""
                    }`}
                  >
                    {number}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Authentification;
