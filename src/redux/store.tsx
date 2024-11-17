import { configureStore } from "@reduxjs/toolkit";
import buyerReducer from "./slices/buyerSlice"; // Import the buyer slice
import { TypedUseSelectorHook, useSelector } from "react-redux";

import authReducer from "./slices/authSlice";
import VendorManagementReducer from "./vendor_management/vendor_management.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buyer: buyerReducer, // Buyer-related state
    VendorManagementReducer,
  },

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
