"use client";
import { useAppSelector } from "../redux";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Form, FormProps } from "antd";
import Input from "../(Components)/Input";
import axios from "axios";

function page() {
  const router = useRouter();
  const { users, isUser } = useAppSelector((state) => state.global);

  type FieldType = {
    transferFrom?: string;
    transferTo?: string;
    personalNumber?: string;
    username?: string;
    amount?: number;
    destination?: string;
  };
  console.log(users);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL;
      const filtered = users?.find(
        (item) => item.personalNumber === values.transferTo
      );
      if (filtered?.personalNumber === isUser?.personalNumber) {
        return;
      }
      const resp = await axios.post(`${url}/api/transaction/transaction`, {
        fromUserId: isUser?.id,
        toUserId: filtered?.id,
        amount: Number(values.amount),
        destination: values.destination,
      });
      console.log(resp.data);
    } catch (error) {}
  };

  return (
    <div>
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
              <h1>{isUser?.personalNumber}...</h1>
              <h1>{isUser?.balance} ₾</h1>
            </div>
          </div>
          <div className="bg-gradient-to-br rounded-r-lg opacity-50  from-red-800 to-blue-500 rounded-r-lg absolute bottom-0 right-0 w-full h-full transform"></div>
        </div>
      </div>
      <div className="bg-gray-800 text-white p-2">
        <Form
          name="basic"
          initialValues={{
            transferFrom: isUser?.personalNumber,
            username: isUser?.name,
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
            <Input placeholder="პირადი ნომრით" name="transferTo" type="text" />
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
            <button
              className="w-full rounded-lg bg-gray-800 border rounded-lg text-white font-semibold p-2"
              type="submit"
            >
              გადარიცხვა
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default page;
