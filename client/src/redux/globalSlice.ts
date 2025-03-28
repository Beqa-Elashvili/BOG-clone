import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialValues {
  isUser: boolean;
}

const initialState: InitialValues = {
  isUser: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsUser: (state, action: PayloadAction<boolean>) => {
      state.isUser = action.payload;
    },
  },
});

export const { setIsUser } = globalSlice.actions;

export default globalSlice.reducer;
