import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType, offerTypes } from "@/app/types/globaltypes";
export interface InitialValues {
  isUser: UserType | null;
  isRegisterForm: boolean;
  activatorOffers: offerTypes[] | null;
}

const initialState: InitialValues = {
  isUser: null,
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
    setIsRegisterForm: (state, action: PayloadAction<boolean>) => {
      state.isRegisterForm = action.payload;
    },
    setActivateOffers: (state, action: PayloadAction<offerTypes[] | null>) => {
      state.activatorOffers = action.payload;
    }
  },
});

export const { setIsUser, setIsRegisterForm,setActivateOffers } = globalSlice.actions;

export default globalSlice.reducer;
