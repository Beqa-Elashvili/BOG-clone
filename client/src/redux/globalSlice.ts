import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/app/types/globaltypes";
export interface InitialValues {
  isUser: UserType | null;
  isRegisterForm: boolean;
}

const initialState: InitialValues = {
  isUser: null,
  isRegisterForm: true,
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
  },
});

export const { setIsUser, setIsRegisterForm } = globalSlice.actions;

export default globalSlice.reducer;
