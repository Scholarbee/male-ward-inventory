import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  name: "",
  token: "",
  user: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    photo: "",
    role: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_TOKEN(state, action) {
      state.token = action.payload;
    },
    SET_NAME(state, action) {
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user._id = profile._id;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.photo = profile.photo;
      state.user.role = profile.role;
    },
  },
});

export const {
  SET_LOGIN,
  SET_TOKEN,
  SET_NAME,
  SET_USER,
  SET_BRAND,
} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.isLoggedIn;
export const selectToken = (state) => state.token;
export const selectName = (state) => state.name;
export const selectUser = (state) => state.user;

export default authSlice.reducer;
