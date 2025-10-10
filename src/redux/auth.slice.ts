import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: number;
  mobile: string;
  name: string;
} | null;

export type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user: AuthUser;
};

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; user: NonNullable<AuthUser> }>
    ) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isLoggedIn = Boolean(action.payload);
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, setToken, setUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice;