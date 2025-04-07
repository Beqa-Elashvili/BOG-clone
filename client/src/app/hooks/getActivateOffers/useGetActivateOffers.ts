"use client";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "@/app/redux";
import { setActivateOffers } from "@/redux/globalSlice";

export default function useGetActivateOffers() {
  const dipatch = useAppDispatch();
  const isUser = useAppSelector((state) => state.global.isUser);
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  async function getActiveOffer() {
    const resp = await axios.get(
      `${url}/api/offers/getActiveOffer/${isUser?.id}`
    );
    dipatch(setActivateOffers(resp.data.activatedOffers));
  }

  return { getActiveOffer };
}
