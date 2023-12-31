import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  email: null,
  login: null,
  avatar: null,
  userId: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "users",
  initialState: authInitialState,
  reducers: {
    createUserProfile: (state, { payload }) => ({
      ...state,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
      userId: payload.userId,
    }),
    authLogOut: () => authInitialState,
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
  },
});

export const { createUserProfile, authLogOut, authStateChange } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
