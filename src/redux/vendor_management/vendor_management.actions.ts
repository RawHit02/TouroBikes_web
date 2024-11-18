import CustomToast from "@/app/components/CustomToast";
import { apiClient } from "@/base-url/apiClient";
import { CREATE_VENDOR, GET_ALL_VENDOR, GET_ALL_BUYERS } from "@/base-url/apiRoutes";
import {
  CreateBuyerPayload,
  GetAllBuyersRequest,
  VendorManagementBuyerModel,
} from "@/models/req-model/VendorManagementBuyerModel";
import { createAsyncThunk } from "@reduxjs/toolkit";

// createBuyer function
export const createBuyer = createAsyncThunk<
  { data: VendorManagementBuyerModel; message: string },
  { createBuyerPayload: CreateBuyerPayload },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/createVehicle",
  async ({ createBuyerPayload }, { rejectWithValue }) => {
    try {
      const body = {
        vendorType: createBuyerPayload.vendorType,
        name: createBuyerPayload.name,
        contactNumber: createBuyerPayload.contactNumber,
        whatsappNumber: createBuyerPayload.whatsappNumber,
        email: createBuyerPayload.email,
        address: createBuyerPayload.address,
      };
      const res = await apiClient.post(CREATE_VENDOR, body);
      return { data: res.data.data, message: res.data.message };
    }
     catch (error: any) {
    console.error("Error occurred while creating buyer:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    CustomToast.ErrorToast(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create buyer",
        status,
      });
    }
  }
);

export const getAllBuyersAction = createAsyncThunk<
  { data: VendorManagementBuyerModel[]; itemCount: number },
  {
    commonApiParamModel: GetAllBuyersRequest;
  },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/getVendor",
  async ({ commonApiParamModel }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page: commonApiParamModel.page,
          take: commonApiParamModel.take,
          order: commonApiParamModel.order?.toUpperCase(),
          orderBy: commonApiParamModel.orderBy,
          search: commonApiParamModel.search,
          ...(commonApiParamModel?.userId !== "" && {
            userId: commonApiParamModel?.userId,
          }),
        },
      };
      const res = await apiClient.get(GET_ALL_VENDOR, options);
      let data: VendorManagementBuyerModel[] = [];
      if (res?.data?.data.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred:", error);
      const status = error.response.status;
      CustomToast.ErrorToast(
        error?.response?.data?.message
          ? error.response.data.message
          : error?.message
      );
      return rejectWithValue({
        message: "An error occurred while fetching categories.",
        status,
      });
    }
  }
);

// Action for Fetching Buyers (GET_ALL_BUYERS)
export const fetchBuyersAction = createAsyncThunk<
  { data: VendorManagementBuyerModel[]; meta: { itemCount: number } },
  { page: number; take: number },
  { rejectValue: { message: string } }
>(
  "vendorManagement/fetchBuyers",
  async ({ page, take }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page,
          take,
        },
      };

      console.log("API URL:", GET_ALL_BUYERS, "Params:", options);


      const response = await apiClient.get(GET_ALL_BUYERS, options);
      return {
        data: response.data.data.data, // Fetched buyers
        meta: response.data.data.meta, // Metadata (e.g., pagination)
      };
    } catch (error: any) {
      console.error("Error occurred while fetching buyers:", error);
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Failed to fetch buyers."
      );
      return rejectWithValue({
        message: error.response?.data?.message || "An error occurred.",
      });
    }
  }
);
