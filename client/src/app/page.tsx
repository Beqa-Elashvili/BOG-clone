"use client";
import Authentification from "./(auth)/authentification";
import { useAppSelector } from "./redux";
import Main from "./main/Main";

export default function Home() {
  const { isUser } = useAppSelector((state) => state.global);
  if (isUser) return <Main />;
  return <Authentification />;
}
