import * as Yup from "yup";

// Inward stock validation schema
export const inwardStockSchema = Yup.object({
  stockType: Yup.string().required("Stock type is required"),
  transId: Yup.string().required("Transaction ID is required for inward stock"),
  description: Yup.string().required("Description is required"),
  goldType: Yup.string().required("Gold type is required"),
  formOfGold: Yup.string().required("Form of gold is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0"),
  purity: Yup.string().required("Purity is required"),
  weight: Yup.number()
    .required("Weight is required")
    .min(1, "Weight must be greater than 0"),
  unitPrice: Yup.number()
    .required("Unit price is required")
    .min(1, "Unit price must be greater than 0"),
  totalValue: Yup.number()
    .required("Total value is required")
    .min(1, "Total value must be greater than 0"),
  buyerName: Yup.string().required("Buyer name is required"),
  commission: Yup.number()
    .required("Commission is required")
    .min(0, "Commission cannot be negative"),
  paymentStatus: Yup.string().required("Payment status is required"),
  amountReceived: Yup.number()
    .required("Amount received is required")
    .min(0, "Amount received cannot be negative"),
  notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
});

// Outward stock validation schema
export const outwardStockSchema = Yup.object({
  stockType: Yup.string().required("Stock type is required"),
  transId: Yup.string(),  // Optional for outward stock
  description: Yup.string().required("Description is required"),
  goldType: Yup.string().required("Gold type is required"),
  formOfGold: Yup.string().required("Form of gold is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0"),
  purity: Yup.string().required("Purity is required"),
  weight: Yup.number()
    .required("Weight is required")
    .min(1, "Weight must be greater than 0"),
  unitPrice: Yup.number()
    .required("Unit price is required")
    .min(1, "Unit price must be greater than 0"),
  totalValue: Yup.number()
    .required("Total value is required")
    .min(1, "Total value must be greater than 0"),
  buyerName: Yup.string().required("Buyer name is required"),
  commission: Yup.number()
    .required("Commission is required")
    .min(0, "Commission cannot be negative"),
  paymentStatus: Yup.string().required("Payment status is required"),
  amountReceived: Yup.number()
    .required("Amount received is required")
    .min(0, "Amount received cannot be negative"),
  notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
});
