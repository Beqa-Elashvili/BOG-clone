import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

type ModalProps = {
  setState: (value: boolean) => void;
};

function Modal({ setState }: ModalProps) {
  return (
    <div className="border bg-white border-gray-200 w-1/2 rounded-lg p-4">
      <div className="flex justify-between">
        <h1 className="text-cyan-800 text-bold text-3xl">Maid Connect</h1>
        <IoMdCloseCircle
          className="text-cyan-800 size-8 cursor-pointer"
          onClick={() => setState(false)}
        />
      </div>
    </div>
  );
}

export default Modal;
