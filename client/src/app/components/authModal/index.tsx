import { useAppDispatch, useAppSelector } from "@/app/redux";
import React from "react";
import { useRef, useEffect } from "react";
import { setIsAuthModalOpen } from "@/redux/globalSlice";
import Register from "@/app/(auth)/authentification";

export function useAuthModal() {
  const isAuthModalOpen = useAppSelector(
    (state) => state.global.isAuthModalOpen
  );
  function AuthModal() {
    const dispatch = useAppDispatch();
    const authRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (isAuthModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      const handleClickOutside = (event: MouseEvent) => {
        if (authRef.current) {
          if (!authRef.current.contains(event.target as Node)) {
            dispatch(setIsAuthModalOpen(false));
          }
        }
      };

      if (isAuthModalOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "auto";
      };
    }, [isAuthModalOpen, dispatch]);

    if (!isAuthModalOpen) return null;

    return (
      <div className="fixed bg-black/30 backdrop-blur-sm w-full h-full inset-0 z-50 flex justify-center items-center">
        <div
          ref={authRef}
          className="relative bg-white rounded-xl p-6 shadow-xl w-full max-w-md"
        >
          <Register />
        </div>
      </div>
    );
  }
  return { AuthModal, setIsAuthModalOpen, isAuthModalOpen };
}
