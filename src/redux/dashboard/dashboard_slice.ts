import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTableData } from "@/redux/dashboard/dashboard_actions"; // Update the path if needed

interface DashboardState {
  totalRevenue : number;
  totalAmountDue : number;
  totalEmployee: number;
  totalBuyer: number;
  totalSupplier: number;
  totalUser: number;
  totalPurchase: number;
  totalSell: number;

   todaysDue: Array<{
    profileImage: any;
    vendor: any;
    id: string;
    transId: string;
    name: string;
    email: string;
    contactNumber: string;
    whatsappNumber: string;
    address: string;
    balanceDue: number;
  }>;
  loading: boolean;
  error: string | null;
}




const initialState: DashboardState = {
  totalRevenue : 0,
  totalAmountDue : 0,
  totalEmployee: 0,
  totalBuyer: 0,
  totalSupplier: 0,
  totalUser: 0,
  totalPurchase: 0,
  totalSell: 0,
  todaysDue: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData(state, action: PayloadAction<Omit<DashboardState, "todaysDue" | "loading" | "error">>) {
      // console.log("Reducer - Dashboard Data Payload:", action.payload); // Debug log
      state.totalRevenue = action.payload.totalRevenue;
      state.totalAmountDue = action.payload.totalAmountDue;
      state.totalEmployee = action.payload.totalEmployee;
      state.totalBuyer = action.payload.totalBuyer;
      state.totalSupplier = action.payload.totalSupplier;
      state.totalUser = action.payload.totalUser;
      state.totalPurchase = action.payload.totalPurchase;
      state.totalSell = action.payload.totalSell;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action: PayloadAction<DashboardState["todaysDue"]>) => {
        state.loading = false;
        state.todaysDue = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch today's due data";
      });
  },

});

export const { setDashboardData } = dashboardSlice.actions; // Export the single reducer action
export default dashboardSlice.reducer;