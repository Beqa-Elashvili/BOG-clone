"use client";
import { useAppSelector } from "../redux";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Form, FormProps, Select, Spin } from "antd";
import Input from "../(Components)/Input";
import axios from "axios";
import { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

function page() {
  const router = useRouter();
  const { users, isUser } = useAppSelector((state) => state.global);
  const [personalNum, setPersonalNum] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [form] = Form.useForm();

  const filtered = users?.find((item) => item.personalNumber === personalNum);
  type FieldType = {
    transferFrom?: string;
    transferTo?: string;
    personalNumber?: string;
    username?: string;
    amount?: number;
    destination?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (filtered?.personalNumber === isUser?.personalNumber) {
        return;
      }
      if (filtered?.personalNumber === isUser?.personalNumber) {
        form.setFields([
          {
            name: "transferedTo",
            errors: ["გთხოვთ შეიყვანოთ სწორი პირადი ნომერი!"],
          },
        ]);
        return;
      }
      const resp = await axios.post(`${url}/api/transaction/transaction`, {
        fromUserId: isUser?.id,
        toUserId: filtered?.id,
        amount: Number(values.amount),
        destination: values.destination,
      });
      setSuccess(true);
      setLoading(false);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      const timeout = setTimeout(() => {
        setSuccess(false);
        router.push("/");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  };

  return (
    <div className="pb-12">
      <div className="p-2 flex items-center gap-4">
        <FaAngleLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1 className="font-semibold">გადარიცხვები</h1>
      </div>
      <div className="flex p-2 items-center justify-center  gap-2 relative overflow-hidden">
        <div className="relative w-full flex items-center">
          <div className="h-20  w-full rounded-lg  z-0  bg-orange-500"></div>
          <div className="absolute z-20">
            <div className="relative ml-2 overflow-hiddentransition duration-300 overflow-hidden  gap-2  cursor-pointer rounded-md">
              <h1>{isUser?.personalNumber}...</h1>
              <h1>{isUser?.balance} ₾</h1>
            </div>
          </div>
          <div className="bg-gradient-to-br rounded-l-lg opacity-50  from-red-800 to-blue-500 rounded-r-lg absolute bottom-0 right-0 w-full h-full transform"></div>
        </div>
        <FaChevronRight className="size-54  absolute  z-10 flex right-24 items-center text-gray-900" />
        <div className="relative w-full flex items-center">
          <div className="h-20  w-full rounded-r-lg  z-0  bg-orange-500"></div>
          <div className="absolute z-20">
            <div className="relative ml-12 overflow-hiddentransition duration-300 overflow-hidden  gap-2  cursor-pointer rounded-md">
              {filtered ? (
                <>
                  <h1>{filtered?.personalNumber}...</h1>
                  <h1>{filtered?.name}</h1>
                </>
              ) : (
                <>
                  <h1>სად</h1>
                </>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br rounded-r-lg opacity-50  from-red-800 to-blue-500 rounded-r-lg absolute bottom-0 right-0 w-full h-full transform"></div>
        </div>
      </div>
      <div className="bg-gray-800 text-white p-2">
        <div className="border text-sm p-2 rounded-lg space-y-2">
          <h1>დარეგისტრირებული მომხმარებლები</h1>
          <Select defaultValue={users && users[0].personalNumber}>
            {users?.map((item) => (
              <Select.Option value={item.personalNumber}>
                {item.personalNumber}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Form
          name="basic"
          form={form}
          initialValues={{
            transferFrom: isUser?.personalNumber,
            username: isUser?.name,
            destination: "პირადი გადარიცხვა",
            personalNumber: isUser?.personalNumber,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="transferFrom"
            rules={[
              {
                required: true,
                message: "გთხოვთ შეიყვანოთ თქვენი პირადი ნომერი!",
              },
            ]}
          >
            <Input
              value={isUser?.personalNumber}
              name="transferFrom"
              type="number"
              label="საიდან"
            />
          </Form.Item>
          <hr />
          <Form.Item<FieldType>
            name="transferTo"
            rules={[
              {
                required: true,
                message: "გთხოვთ შეიყვანოთ სწორი პირადი ნომერი!",
              },
            ]}
          >
            <Input
              onChange={(e) => setPersonalNum(e.target.value)}
              placeholder="პირადი ნომრით"
              name="transferTo"
              maxLength={11}
              type="text"
            />
          </Form.Item>
          <hr />
          <Form.Item<FieldType>
            name="username"
            rules={[
              { required: true, message: "გთხოვთ შეიყვანოთ თქვენი სახელი!" },
            ]}
          >
            <Input name="username" type="text" label="გამგზავნის დასახელება" />
          </Form.Item>
          <hr />
          <Form.Item<FieldType>
            name="personalNumber"
            rules={[
              {
                required: true,
                message: "გთოვთ შეიყვანოთ სწორი პირადი ნომერი!",
              },
            ]}
          >
            <Input
              value={isUser?.personalNumber}
              name="personalNumber"
              type="number"
              label="გამგაზნის პირადი ნომერი"
            />
          </Form.Item>
          <hr />
          <Form.Item<FieldType>
            name="amount"
            rules={[{ required: true, message: "გთხოვთ შეიყვანოთ თანხა!" }]}
          >
            <Input name="amount" type="number" placeholder="თანხა" />
          </Form.Item>
          <hr />
          <Form.Item<FieldType>
            name="destination"
            rules={[
              { required: true, message: "გთხოვთ მიუთითოთ დანიშნულება!" },
            ]}
          >
            <Input name="destination" type="text" label="დანიშნულება" />
          </Form.Item>
          <Form.Item>
            <div className="relative flex items-center">
              <button
                disabled={loading}
                className="w-full rounded-lg bg-gray-800 border rounded-lg text-white font-semibold p-2"
                type="submit"
              >
                გადარიცხვა
              </button>
              {loading && (
                <Spin
                  style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    right: "12px",
                  }}
                />
              )}
            </div>
          </Form.Item>
        </Form>
        {success && (
          <div className="absolute bg-black/50 flex justify-center items-center inset-0 text-white  w-full h-full z-10 ">
            <div className="border flex flex-col items-center justify-center rounded-lg  bg-orange-500 w-5/6 h-2/12">
              <h1>გადარიცხვა წარმატებით განხორციელდა</h1>
              <IoMdCheckmarkCircle className="text-orange-100  size-6 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
