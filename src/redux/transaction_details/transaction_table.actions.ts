import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/base-url/apiClient";
import {
  TransactionFilterModel,
  TransactionResponseModel,
} from "@/models/req-model/TransactionModel";
import { GET_TRANSACTIONS } from "@/base-url/apiRoutes";

export const fetchTransactions = createAsyncThunk<
  TransactionResponseModel,
  TransactionFilterModel
>("transactions/fetch", async (filters, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(GET_TRANSACTIONS, { params: filters });
    if (!response.data || !response.data.data) {
      return rejectWithValue("No transactions found");
    }
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "An unexpected error occurred";

    // console.error("API Error:", errorMessage);
    return rejectWithValue(errorMessage);
  }
});




  