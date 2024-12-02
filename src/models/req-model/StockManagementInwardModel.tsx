import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementInwardModel {
  id: string;
  date : string;
  transId: string;
  stockType: string;
  itemType: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  batchNumber: string;
  commission : number;
  receivedBy: string;
  supplierName: string;
  location: string;
  notes: string;
  createdBy: string;
  createdDate: Date;
  updatedDate: Date;
  vendorId : string;
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
  stockType: string;
  transId: string;
  description: string;
  itemType: string;
  quantity: number;
  unitPrice: number;
  commission: number;
  totalValue: number;
  batchNumber: string;
  receivedBy: string;
  location: string;
  notes: string;
  vendorId: string;
}
