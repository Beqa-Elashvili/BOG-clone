import React from "react";

interface ButtonProps {
  onClick?: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  type?: string;
}

function Button({ onClick, type, onSubmit, children }: ButtonProps) {
  return (
    <div className="w-full">
      <button
        className="w-full cursor-pointer focus:bg-orange-700 p-2 bg-orange-600 rounded-lg font-semibold"
        onSubmit={onSubmit}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
