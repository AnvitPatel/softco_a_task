import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../slice/Slices/authSlice";
import registerSlice from "../slice/Slices/registerSlice";
import projectSlice from "../slice/Slices/projectSlice";
import estimateSlice from "../slice/Slices/estimateSlice";

const persistConfig = {
  key: "auth-anvit-task",
  version: 1.1,
  // blacklist: ["ui"],
  whitelist: ["auth"],
  storage,
};

export const rootReducer = combineReducers({
  auth: authSlice,
  register: registerSlice,
  project: projectSlice,
  estimate: estimateSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
