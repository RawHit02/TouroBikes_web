"use client";
import { store } from "./store";
import { Provider } from "react-redux";
import React from "react";
// import { SnackbarProvider } from "notistack";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      {/* <SnackbarProvider
        autoHideDuration={2000}
      /> */}
    </Provider>
  );
}
