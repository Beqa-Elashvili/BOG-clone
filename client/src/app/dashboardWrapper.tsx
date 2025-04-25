"use client";

import React, { useEffect } from "react";
import StoreProvider from "./redux";
import useGetProtectedData from "./hooks/useGetPotectedData/useGetProtectedData";
import Header from "./components/header";
import Footer from "./components/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { getProtectedData } = useGetProtectedData();

  useEffect(() => {
    getProtectedData();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="sticky top-0 z-20 bg-white max-w-[1080px] m-auto">
        <Header />
      </div>
      <main className="h-full  min-h-screen max-w-[1080px] m-auto">
        {children}
      </main>
      <Footer />
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
