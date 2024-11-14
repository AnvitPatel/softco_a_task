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
  id?: string | null;
  userID?: string | null;
  customer: string | null;
  referenceNumber: string;
  projectName: string;
  projectNumber: string;
  areaLocation: string;
  address: string;
  dueDate: string;
  contact: string | null;
  manager: string;
  staff: string;
  status: string;
  email: string;
}

export interface ProjectState {
  isLoading: boolean;
  isError: boolean;
  errors: Record<string, unknown> | null;
  successMessage: string | null;
  isCreated: boolean;
  isDeleted: boolean;
  projects: sendData[] | null;
}

const initialState: ProjectState = {
  isLoading: false,
  isError: false,
  errors: null,
  successMessage: null,
  isCreated: false,
  isDeleted: false,
  projects: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.isCreated = false;
      state.isDeleted = false;
    },
    handleSuccessProject: (state) => {
      state.isLoading = false;
      state.isCreated = true;
    },
    handleRemoveProject: (state) => {
      state.isLoading = false;
      state.isDeleted = true;
    },
    handleGetProjects: (state, action: PayloadAction<sendData[]>) => {
      state.isLoading = false;
      state.projects = action.payload;
    },
  },
});

export const {
  setLoading,
  handleSuccessProject,
  handleGetProjects,
  handleRemoveProject,
} = projectSlice.actions;

export default projectSlice.reducer;

export const projectRequest =
  (senddata: sendData) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data: users } = await axios.get("http://localhost:3031/projects");
      const userExists = users.some(
        (user: sendData) =>
          user.email.toLowerCase() === senddata.email.toLowerCase()
      );
      const userExists1 = users.some(
        (user: sendData) => user.projectName === senddata.projectName
      );
      if (userExists) {
        message.error("Project with this email already exists");
        return;
      }
      if (userExists1) {
        message.error("Project name already exists");
        return;
      }
      const { data } = await axios.post(
        "http://localhost:3031/projects",
        senddata
      );
      if (data) {
        message.success("Project add successful!");
        dispatch(handleSuccessProject());
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };
export const projectGet =
  (id: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data: projects } = await axios.get(
        "http://localhost:3031/projects"
      );
      const collect = projects.filter((x: sendData) => x.userID === id);
      if (projects && collect) {
        dispatch(handleGetProjects(collect));
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };

export const projectUpdate =
  (senddata: sendData) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data } = await axios.put(
        "http://localhost:3031/projects/" + senddata?.id,
        senddata
      );
      if (data) {
        message.success("Project Update successful!");
        dispatch(handleSuccessProject());
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };
export const projectDelete =
  (id: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
    try {
      const { data } = await axios.delete(
        "http://localhost:3031/projects/" + id
      );
      if (data) {
        message.success("Project remove successful!");
        dispatch(handleRemoveProject());
      }
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError && error?.message === "Network Error") {
        message.error(error?.message);
      }
    }
  };
