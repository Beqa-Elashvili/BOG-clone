import React from "react";

interface InputProps {
  name?: string;
  type?: string;
  label?: string;
  value?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, type, name, value, onChange, maxLength }: InputProps) {
  return (
    <div className="w-full relative bg-gray-800 rounded-lg pt-4 px-2">
      <input
        maxLength={maxLength}
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        className="w-full pt-1 pb-1 text-sm inset-0 bg-gray-800 rounded-lg focus:outline-none"
      />
      <label
        className="absolute text-gray-300 text-[12px] flex top-1"
        htmlFor="text"
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
