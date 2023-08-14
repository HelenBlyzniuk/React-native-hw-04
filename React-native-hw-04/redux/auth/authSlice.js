import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  email: null,
  login: null,
  avatar: null,
  userId: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    createUserProfile: (state, { payload }) => ({
      ...state,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
      userId: payload.id,
    }),
    authLogOut: () => authInitialState,
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
  },
});

export const { createUserProfile, authLogOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
