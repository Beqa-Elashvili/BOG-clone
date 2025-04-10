import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType, offerTypes } from "@/app/types/globaltypes";

export interface InitialValues {
  isUser: UserType | null;
  users: UserType[] | null;
  isRegisterForm: boolean;
  activatorOffers: offerTypes[] | null;
}

const initialState: InitialValues = {
  isUser: null,
  users: null,
  isRegisterForm: true,
  activatorOffers: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsUser: (state, action: PayloadAction<UserType | null>) => {
      state.isUser = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<UserType[] | null>) => {
      state.users = action.payload;
    },
    setIsRegisterForm: (state, action: PayloadAction<boolean>) => {
      state.isRegisterForm = action.payload;
    },
    setActivateOffers: (state, action: PayloadAction<offerTypes[] | null>) => {
      state.activatorOffers = action.payload;
    },
  },
});

export const { setIsUser, setAllUsers, setIsRegisterForm, setActivateOffers } =
  globalSlice.actions;

export default globalSlice.reducer;
