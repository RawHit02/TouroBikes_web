import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementInwardModel {
  id: any;
  transId: string; // Transaction ID
  stockType: string; // Specifies the type, always "inward"
  description: string; // Description of the stock
  quantity: string; // Quantity of stock
  unitPrice: string; // Price per unit
  totalPrice: any; // Total value of the stock
  commissionRate: string; // Commission applicable
  batchNumber: string; // Batch number
  location: string; // Location of stock
  notes: string; // Additional notes
  vendor: any; // Supplier ID
  ornament: any; // Ornament ID
  type: any; // Ornament type ID
  form: any; // Ornament form ID
  purity: any; // Ornament purity ID
  color: any; // Ornament color ID (optional for Gold/Silver)
  formOfGold: any; // Specific to Gold
  diamondType: any; // Specific to Diamond
  silverType: any; // Specific to Silver
  cutGrade: any; // Specific to Diamond
  clarity: any; // Specific to Diamond
  sclarity: any; // Specific to Silver clarity
  colorGrade: any; // Specific to Diamond
  createdBy: string; // Created by user
  createdDate: string; // Creation date
  updatedDate: string; // Last updated date
  formOfSilver: any;
  goldType: any;
  grade: any;
  commissionValue: string;
  // New Fields
  paymentStatus: string;
  paymentMethod : string;
  amountPaid: string; // Amount paid by the supplier
  baseTotal: string; // Calculated base total (quantity * unit price)
  balanceDue: string; // Calculated balance due (totalValue - amountPaid)
}


export interface InitialInwardsModelState {
  message: string;
  itemCount: number;
  userError: string | undefined;
  getAllInwards: StockManagementInwardModel[];
  createInwardRes: string;
  createInwardLoading: boolean;
  getAllInwardLoading: boolean;
}

export interface GetAllInwardsRequest extends ApiParamModel{
  TransId?: string;
}

export interface CreateStockInwardPayload {
  stockType: string; // Must be "inward"
  transId: string; // Transaction ID
  description: string; // Stock description
  quantity: string; // Quantity of stock
  unitPrice: string; // Price per unit
  totalPrice: any; // Total stock value
  commissionRate: string; // Commission amount
  batchNumber: string; // Batch number
  location: string; // Stock location
  notes: string; // Optional notes
  vendor: any; // Supplier ID
  ornament: any; // Ornament ID
  type: string; // Ornament type ID
  form: string; // Ornament form ID
  purity: string; // Ornament purity ID
  color: string; // Optional for Gold/Silver
  grade: string; // Optional for Diamond

  // New Fields
  paymentStatus : string;
  paymentMethod : string ;
  amountPaid: string; // Amount paid by the supplier
  baseTotal: string; // Calculated base total (quantity * unit price)
  commissionValue: string; // Calculated commission value
  balanceDue: string; // Calculated balance due (totalValue - amountPaid)
}

