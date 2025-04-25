import React from "react";

function Footer() {
  const SignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="bg-gray-200 p-2 pb-3 w-full flex justify-center items-center">
      this is footer
    </div>
  );
}

export default Footer;
