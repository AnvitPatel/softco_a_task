import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../storeConfig/store";
import axios, { AxiosError } from "axios";
import { message } from "antd";

export interface UserData {
  email: string;
  id: string;
  username: boolean;
}

export interface sendData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthState {
  isLoading: boolean;
  isError: boolean;
  userData: UserData | null;
  errors: Record<string, unknown> | null;
  login: boolean;
  successMessage: string | null;
  rememberMe: sendData | null;
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  userData: null,
  rememberMe: null,
  login: false,
  errors: null,
  successMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    handleSuccessLogin: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false;
      state.login = true;
      state.userData = action.payload;
      message.success("Welcome " + action.payload.username);
    },
    handleIsRemember: (state, action: PayloadAction<sendData | null>) => {
      state.rememberMe = action.payload;
    },
    handleErrorLogin: (
      state,
      action: PayloadAction<Record<string, unknown>>
    ) => {
      state.isLoading = false;
      state.errors = action.payload;
      state.isError = true;
    },
    handleLogout: (state) => {
      state.userData = null;
      state.login = false;
      state.isLoading = false;
      state.isError = false;
      state.errors = null;
      state.successMessage = null;
    },
    handleUserDetails: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.login = true;
    },
    handleResetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errors = null;
      state.successMessage = null;
    },
  },
});

export const {
  setLoading,
  handleSuccessLogin,
  handleIsRemember,
  handleErrorLogin,
  handleResetState,
  handleLogout,
  handleUserDetails,
} = authSlice.actions;

export default authSlice.reducer;

export const LoginRequest =
  (userData: sendData) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data: users } = await axios.get("http://localhost:3031/users");
      const userExists = users.find(
        (user: sendData) =>
          user.email === userData.email && user.password === userData.password
      );
      if (userExists) {
        let saveData = {
          email: userExists.email,
          username: userExists.username,
          id: userExists.id,
        };
        dispatch(handleSuccessLogin(saveData));
        dispatch(handleIsRemember(userData?.rememberMe ? userData : null));
      } else {
        message.error("Invalid credentials!");
      }
      // const { data } = await AdminLoginAPI(userData);
      // const { statusCode } = data;
      // if (statusCode === 200) {
      //     dispatch(handleSuccessLogin(data));
      // }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
      //   if (error.response?.data?.errors) {
      //     dispatch(handleErrorLogin(error.response.data.errors));
      //   } else {
      //     dispatch(handleErrorLogin({ general: "Login failed" }));
      //   }
      // } else {
      //   console.error("Unexpected error:", error);
      //   dispatch(handleErrorLogin({ general: "An unexpected error occurred" }));
      // }
    }
  };
