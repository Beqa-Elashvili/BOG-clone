"use client";

import React, { useEffect } from "react";
import StoreProvider from "./redux";
import useGetProtectedData from "./hooks/useGetPotectedData/useGetProtectedData";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { getProtectedData } = useGetProtectedData();

  useEffect(() => {
    getProtectedData();
  }, []);

  return (
    <div className="w-full">
      <main className="bg-black flex justify-center w-full h-screen min-h-screen">
        <div className="max-w-[430px]">{children}</div>
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};
export default DashboardWrapper;
