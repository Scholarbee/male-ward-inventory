import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  message: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    SET_USERS(state, action) {
      state.users = action.payload;
    },
    SET_LOADING(state, action) {
      state.isLoading = action.payload;
    },
    SET_ERROR(state, action) {
      state.isError = action.payload;
    },
    SET_MESSAGE(state, action) {
      state.message = action.payload;
    },
  },
});

export const { SET_USERS, SET_LOADING, SET_ERROR, SET_MESSAGE } = adminSlice.actions;

export const selectUsers = (state) => state.admin?.users || [];
export const selectIsLoading = (state) => state.admin?.isLoading || false;
export const selectIsError = (state) => state.admin?.isError || false;
export const selectMessage = (state) => state.admin?.message || "";

export default adminSlice.reducer;
