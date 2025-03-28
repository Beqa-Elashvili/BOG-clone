"use client";

import "./globals.css";
import { useEffect } from "react";
import useGetProtectedData from "./hooks/useGetPotectedData/useGetProtectedData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getProtectedData } = useGetProtectedData();

  useEffect(() => {
    getProtectedData();
  }, []);

  return (
    <html lang="en">
      <body className="bg-black flex justify-center h-screen w-full">
        <div className="max-w-[915px]">{children}</div>
      </body>
    </html>
  );
}
