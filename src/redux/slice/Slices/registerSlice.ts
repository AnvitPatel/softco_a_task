import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
// import { AdminLoginAPI } from "../../services/api";
import { AppDispatch } from "../../storeConfig/store";
import axios from "axios";
import { message } from "antd";

export interface UserData {
  email: string;
  password: string;
  errors?: Record<string, unknown>;
}

export interface sendData {
  email: string;
  password: string;
  username?: string;
  id?: string;
}

export interface RegisterState {
  isLoading: boolean;
  isError: boolean;
  userData: UserData | null;
  token: string | null;
  errors: Record<string, unknown> | null;
  successMessage: string | null;
  isRegister: boolean;
}

const initialState: RegisterState = {
  isLoading: false,
  isError: false,
  userData: null,
  token: null,
  errors: null,
  successMessage: null,
  isRegister: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.isRegister = false;
    },
    handleSuccessRegister: (state) => {
      state.isLoading = false;
      state.isRegister = true;
    },
    handleErrorRegister: (
      state,
      action: PayloadAction<Record<string, unknown>>
    ) => {
      state.isLoading = false;
      state.errors = action.payload;
      state.isError = true;
    },
    handleResetRegister: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errors = null;
      state.successMessage = null;
      state.isRegister = false;
    },
  },
});

export const { setLoading, handleSuccessRegister, handleErrorRegister } =
  registerSlice.actions;

export default registerSlice.reducer;

export const RegisterRequest =
  (senddata: sendData) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data: users } = await axios.get("http://localhost:3031/users");
      const userExists = users.some(
        (user: sendData) =>
          user.email.toLowerCase() === senddata.email.toLowerCase()
      );
      if (userExists) {
        message.error("User with this email already exists");
        return;
      }
      const { data } = await axios.post(
        "http://localhost:3031/users",
        senddata
      );
      if (data) {
        message.success("Registration successful!");
        dispatch(handleSuccessRegister());
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };
