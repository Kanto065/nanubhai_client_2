import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./features/apiSlice";
import authSlice from "./features/auth/authSlice";
import { UserType } from "@/types/user";

export interface RootState {
  auth: {
    user: UserType | undefined;
  };
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
}

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
  //   devTools: false,
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
