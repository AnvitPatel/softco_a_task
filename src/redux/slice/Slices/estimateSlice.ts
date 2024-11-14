import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
// import { AdminLoginAPI } from "../../services/api";
import { AppDispatch } from "../../storeConfig/store";
import axios from "axios";
import { message } from "antd";

// export interface UserData {
//   email: string;
//   password: string;
//   errors?: Record<string, unknown>;
// }

export interface sendData {
  id: string | null;
  userID?: string | null;
  client: string;
  project: string | null;
  status: string | null;
  createdDate: string;
  updatedDate: string;
  mainItemsDetail: {
    id: string;
    mainItemName: string;
    mainTotalPrice: number | null;
    items: [
      {
        itemsId: string;
        item: string;
        desc: string;
        unit: string;
        quantity: number | null;
        price: number | null;
        margin: number | null;
        mainPrice: number | null;
      }
    ];
  }[];
}

export interface EstimateState {
  isLoading: boolean;
  isError: boolean;
  errors: Record<string, unknown> | null;
  successMessage: string | null;
  isCreated: boolean;
  isDeleted: boolean;
  estimateList: sendData[] | null;
}

const initialState: EstimateState = {
  isLoading: false,
  isError: false,
  errors: null,
  successMessage: null,
  isCreated: false,
  isDeleted: false,
  estimateList: null,
};

export const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.isCreated = false;
      state.isDeleted = false;
    },
    handleSuccessEstimate: (state) => {
      state.isLoading = false;
      state.isCreated = true;
    },
    handleRemoveEstimates: (state) => {
      state.isLoading = false;
      state.isDeleted = true;
    },
    handleGetEstimates: (state, action: PayloadAction<sendData[]>) => {
      state.isLoading = false;
      state.estimateList = action.payload;
    },
  },
});

export const {
  setLoading,
  handleSuccessEstimate,
  handleGetEstimates,
  handleRemoveEstimates,
} = estimateSlice.actions;

export default estimateSlice.reducer;

export const estimateRequest =
  (senddata: sendData) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data } = await axios.post(
        "http://localhost:3031/estimates",
        senddata
      );
      if (data) {
        message.success("Estimate add successful!");
        dispatch(handleSuccessEstimate());
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };
export const estimateGet =
  (id: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data: projects } = await axios.get(
        "http://localhost:3031/estimates"
      );
      const collect = projects.filter((x: sendData) => x.userID === id);
      if (projects && collect) {
        dispatch(handleGetEstimates(collect));
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };

export const estimateUpdate =
  (senddata: sendData) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data } = await axios.put(
        "http://localhost:3031/estimates/" + senddata?.id,
        senddata
      );
      if (data) {
        message.success("Estimates Update successful!");
        dispatch(handleSuccessEstimate());
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };
export const estimatesDelete =
  (id: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data } = await axios.delete(
        "http://localhost:3031/estimates/" + id
      );
      if (data) {
        message.success("Estimates remove successful!");
        dispatch(handleRemoveEstimates());
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };
