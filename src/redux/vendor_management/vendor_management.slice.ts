import { createSlice } from "@reduxjs/toolkit";
import { InitialBuyersModelState } from "@/models/req-model/VendorManagementBuyerModel";
import { createBuyer, getAllBuyersAction, fetchBuyersAction , deleteBuyerAction, editBuyerAction} from "./vendor_management.actions";

const initialState: InitialBuyersModelState = {
  message: "",
  itemCount: 0,
  userError: undefined,
  getAllBuyers: [],
  createBuyerRes: "",
  createBuyerLoading: false,
  getAllBuyerLoading: false,
};

export const manageVendorManagementSlice = createSlice({
  name: "manage_vendor_management_slice",
  initialState,
  reducers: {
    clearAllManageVehicles: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Create Buyer
    builder.addCase(createBuyer.pending, (state) => {
      state.createBuyerLoading = true;
      state.userError = "";
    });
    builder.addCase(createBuyer.fulfilled, (state, action) => {
      console.log("Buyer created successfully:", action.payload.data); 
      state.createBuyerLoading = false;
        state.userError = "";
      state.createBuyerRes = action.payload.data.name;
      state.getAllBuyers = [action.payload.data, ...state.getAllBuyers];

    });
    builder.addCase(createBuyer.rejected, (state, action) => {
      state.createBuyerLoading = false;
      state.userError = action.error.message;
    });

    // Get All Buyers
    builder.addCase(getAllBuyersAction.pending, (state) => {
      state.getAllBuyerLoading = true;
      state.userError = "";
      state.createBuyerRes = "";
    });
    builder.addCase(getAllBuyersAction.fulfilled, (state, action) => {
      console.log("Fetched buyers:", action.payload.data); 
      state.getAllBuyerLoading = false;
        state.userError = "";
      state.getAllBuyers = action.payload.data;
      state.itemCount = action.payload.itemCount;
      state.createBuyerRes = "";
    });
    builder.addCase(getAllBuyersAction.rejected, (state, action) => {
      state.getAllBuyerLoading = false;
      state.userError = action.error.message;
      state.createBuyerRes = "";
    });

    // Fetch Buyers (New Action)
    builder.addCase(fetchBuyersAction.pending, (state) => {
      state.getAllBuyerLoading = true;
      state.userError = "";
    });
    builder.addCase(fetchBuyersAction.fulfilled, (state, action) => {
      console.log("Fetched buyers:", action.payload.data); 
      state.getAllBuyerLoading = false;
      state.userError = "";
      state.getAllBuyers = action.payload.data;
      state.itemCount = action.payload.meta.itemCount;
    });
    builder.addCase(fetchBuyersAction.rejected, (state, action) => {
      state.getAllBuyerLoading = false;
      state.userError = action.payload?.message || "Failed to fetch buyers.";
    });

    builder.addCase(editBuyerAction.fulfilled, (state, action) => {
    const updatedBuyer = action.payload.data;
    const index = state.getAllBuyers.findIndex((buyer) => buyer.id === updatedBuyer.id);
    if (index !== -1) {
    state.getAllBuyers[index] = updatedBuyer;
      }
    });
    builder.addCase(deleteBuyerAction.fulfilled, (state, action) => {
    const deletedBuyerId = action.meta.arg; // buyerId
    state.getAllBuyers = state.getAllBuyers.filter(
    (buyer) => buyer.id !== deletedBuyerId
    );
  });
  },
});

export const { clearAllManageVehicles } = manageVendorManagementSlice.actions;
export default manageVendorManagementSlice.reducer;