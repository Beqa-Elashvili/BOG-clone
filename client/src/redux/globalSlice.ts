import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialValues {
  isUser: boolean;
  isRegisterForm: boolean;
}

const initialState: InitialValues = {
  isUser: false,
  isRegisterForm: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsUser: (state, action: PayloadAction<boolean>) => {
      state.isUser = action.payload;
    },
    setIsRegisterForm: (state, action: PayloadAction<boolean>) => {
      state.isRegisterForm = action.payload;
    },
  },
});

export const { setIsUser, setIsRegisterForm } = globalSlice.actions;

export default globalSlice.reducer;
