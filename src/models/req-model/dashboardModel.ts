// Dashboard API Response Models

// Model for Total Employee, Total Buyers, etc.
export interface DashboardMetricResponse {
  statusCode: number;
  errors: string[];
  message: string;
  data: number; // The numeric value of the metric
}

// Dashboard State Model
export interface DashboardState {
  totalEmployee: number;
  totalBuyers: number;
  totalSuppliers: number;
  totalUsers: number;
  totalPurchase: number;
  totalSell: number;
}
