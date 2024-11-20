import { ApiParamModel } from "../common/ApiParamModel";

export interface VendorManagementBuyerModel {
  profileImage: any;
  id: string;
  vendorType: string;
  name: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
}

export interface InitialBuyersModelState {
  getAllBuyers: VendorManagementBuyerModel[];
  message: string;
  createBuyerRes: string;
  createBuyerLoading: boolean;
  getAllBuyerLoading: boolean;
  itemCount: number;
  userError: string | undefined;
}

export interface GetAllBuyersRequest extends ApiParamModel {
  userId?: string;
}

export interface CreateBuyerPayload {
  vendorType: string;
  name: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
}
