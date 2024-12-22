import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementInwardModel {
  id: string;
  transId: string;
  itemType: string; // Links to ornament type
  description: string;
  quantity: string;
  unitPrice: string;
  totalValue: string;
  batchNumber: string;
  commission: string;
  receivedBy: string;
  supplierName: string;
  location: string;
  notes: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  goldType: string;
  diamondType: string;
  silverType: string;
  colorGrade: string;
  issuedBy: string;
  clarity: string;
  vendor?: string; // Links to buyer/supplier dropdown
  ornament: string; // Required for ornament selection
  color: string; // Required for color selection
  purity: string; // Required for purity selection
  form: string; // Required for form selection
  type: string; // Required for ornament type selection
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

export interface GetAllInwardsRequest extends ApiParamModel {
  TransId?: string;
}

export interface CreateStockInwardPayload {
  transId: string; // Required
  description: string; // Required
  itemType: string; // Required
  quantity: string; // Required
  unitPrice: string; // Required
  commission: string; // Required
  totalValue: string; // Required
  batchNumber: string; // Required
  receivedBy: string; // Required
  location: string; // Required
  notes: string; // Optional
  vendor: string; // Required
  ornament: string; // Required
  color: string; // Required
  purity: string; // Required
  form: string; // Required
  type: string; // Required
}
