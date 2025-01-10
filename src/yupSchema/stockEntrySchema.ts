// validationSchema.ts

import * as Yup from "yup";

/**
 * Inward Stock Schema
 */

export const inwardStockSchemaGold = Yup.object({

  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),

goldType: Yup.string()
    .required("Gold type is required.")
    .nullable(),
  
    formOfGold: Yup.string()
    .required("Form of gold is required.")
    .nullable(),

  purity: Yup.string()
    .required("Purity is required.")
    .nullable(),

  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

  quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

description: Yup.string()
  .required("Description is required.")
  .matches(
    /^(?!\d+$)[a-zA-Z0-9\s]*$/,
    "Description must not contain only numbers."
  )
  .min(1, "Description must be greater than 0 words."),


  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),


amountPaid: Yup.number()
  .typeError("Amount Paid must be a numeric value.")
  .required("Amount is required.")
  .test(
    "is-less-than-total",
    "Amount Paid cannot be greater than Total Price.",
    function (value) {
      const { totalPrice } = this.parent; // Access the totalPrice field from the current form values
      return value <= totalPrice; // Ensure amountPaid is less than or equal to totalPrice
    }
  )
  .min(0, "Amount Paid cannot be negative."),


  
   paymentStatus: Yup.string()
    .required("Payment status is required.")
    .oneOf(["Partial", "Completed", "Remaining"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

     paymentMethod: Yup.string()
    .required("Payment method is required.")
    .oneOf(["UPI", "Cash", "NEFT"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),


  // notes: Yup.string()
  //   .required("Notes is required.")
  //   .max(500, "Notes cannot exceed 500 characters.")
  //   .nullable(),

  commissionRate: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

  });




export const inwardStockSchemaDiamond = Yup.object({
  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),
  
  diamondType: Yup.string()
    .required("Diamond type is required.")
    .nullable(),

  clarity: Yup.string()
    .required("Clarity is required.")
    .nullable(),

  colorGrade: Yup.string()
    .required("Color grade is required.")
    .nullable(),

  cutGrade: Yup.string()
    .required("Cut grade is required.")
    .nullable(),

  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

    

    description: Yup.string()
  .required("Description is required.")
  .matches(
    /^(?!\d+$)[a-zA-Z0-9\s]*$/,
    "Description must not contain only numbers."
  )
  .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),


    quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

    amountPaid: Yup.number()
  .typeError("Amount Paid must be a numeric value.")
  .required("Amount is required.")
  .test(
    "is-less-than-total",
    "Amount Paid cannot be greater than Total Price.",
    function (value) {
      const { totalPrice } = this.parent; // Access the totalPrice field from the current form values
      return value <= totalPrice; // Ensure amountPaid is less than or equal to totalPrice
    }
  )
  .min(0, "Amount Paid cannot be negative."),
  
   paymentStatus: Yup.string()
    .required("Payment status is required.")
    .oneOf(["Partial", "Completed", "Remaining"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),

    

    paymentMethod: Yup.string()
    .required("Payment method is required.")
    .oneOf(["UPI", "Cash", "NEFT"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),




  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  // notes: Yup.string()
  //   .required("Notes is required.")
  //   .max(500, "Notes cannot exceed 500 characters.")
  //   .nullable(),

  commissionRate: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

});







    export const inwardStockSchemaSilver = Yup.object({

      stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),

  silverType: Yup.string()
    .required("Silver type is required.")
    .nullable(),

  sclarity: Yup.string()
    .required("Clarity is required.")
    .nullable(),

  formOfSilver: Yup.string()
    .required("form of silver is Required")
    .nullable(),
      
  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

  quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

description: Yup.string()
  .required("Description is required.")
  .matches(
    /^(?!\d+$)[a-zA-Z0-9\s]*$/,
    "Description must not contain only numbers."
  )
  .min(1, "Description must be greater than 0 words."),


  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  // totalPrice: Yup.number()
  //   .typeError("Total Value must be a numeric value.")
  //   .required("Total value is required.")
  //   .min(1, "Total value must be greater than 0."),

  amountPaid: Yup.number()
  .typeError("Amount Paid must be a numeric value.")
  .required("Amount is required.")
  .test(
    "is-less-than-total",
    "Amount Paid cannot be greater than Total Price.",
    function (value) {
      const { totalPrice } = this.parent; // Access the totalPrice field from the current form values
      return value <= totalPrice; // Ensure amountPaid is less than or equal to totalPrice
    }
  )
  .min(0, "Amount Paid cannot be negative."),
  
   paymentStatus: Yup.string()
    .required("Payment status is required.")
    .oneOf(["Partial", "Completed", "Remaining"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),

     paymentMethod: Yup.string()
    .required("Payment method is required.")
    .oneOf(["UPI", "Cash", "NEFT"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),


  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  // notes: Yup.string()
  //   .required("Notes is required.")
  //   .max(500, "Notes cannot exceed 500 characters.")
  //   .nullable(),

  commissionRate: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

    });


/**
 * Outward Stock Schema
 */

export const outwardStockSchemaDiamond = Yup.object({
  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),
  
  diamondType: Yup.string()
    .required("Diamond type is required.")
    .nullable(),

  clarity: Yup.string()
    .required("Clarity is required.")
    .nullable(),

  colorGrade: Yup.string()
    .required("Color grade is required.")
    .nullable(),

  cutGrade: Yup.string()
    .required("Cut grade is required.")
    .nullable(),

  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),
 
description: Yup.string()
  .required("Description is required.")
  .matches(
    /^(?!\d+$)[a-zA-Z0-9\s]*$/,
    "Description must not contain only numbers."
  )
  .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  // totalPrice: Yup.number()
  //   .typeError("Total Value must be a numeric value.")
  //   .required("Total value is required.")
  //   .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),


amountPaid: Yup.number()
  .typeError("Amount Paid must be a numeric value.")
  .required("Amount is required.")
  .test(
    "is-less-than-total",
    "Amount Paid cannot be greater than Total Price.",
    function (value) {
      const { totalPrice } = this.parent; // Access the totalPrice field from the current form values
      return value <= totalPrice; // Ensure amountPaid is less than or equal to totalPrice
    }
  )
  .min(0, "Amount Paid cannot be negative."),
       paymentStatus: Yup.string()
    .required("Payment status is required.")
    .oneOf(["Partial", "Completed", "Remaining"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),

    quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),


     paymentMethod: Yup.string()
    .required("Payment method is required.")
    .oneOf(["UPI", "Cash", "NEFT"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),

  commissionRate: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

});


export const outwardStockSchemaGold = Yup.object({

  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),

goldType: Yup.string()
    .required("Gold type is required.")
    .nullable(),
  formOfGold: Yup.string()
    .required("Form of gold is required.")
    .nullable(),

  purity: Yup.string()
    .required("Purity is required.")
    .nullable(),

  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

  quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

description: Yup.string()
  .required("Description is required.")
  .matches(
    /^(?!\d+$)[a-zA-Z0-9\s]*$/,
    "Description must not contain only numbers."
  )
  .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  // totalPrice: Yup.number()
  //   .typeError("Total Value must be a numeric value.")
  //   .required("Total value is required.")
  //   .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  amountPaid: Yup.number()
  .typeError("Amount Paid must be a numeric value.")
  .required("Amount is required.")
  .test(
    "is-less-than-total",
    "Amount Paid cannot be greater than Total Price.",
    function (value) {
      const { totalPrice } = this.parent; // Access the totalPrice field from the current form values
      return value <= totalPrice; // Ensure amountPaid is less than or equal to totalPrice
    }
  )
  .min(0, "Amount Paid cannot be negative."),

      paymentStatus: Yup.string()
    .required("Payment status is required.")
    .oneOf(["Partial", "Completed", "Remaining"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),

     paymentMethod: Yup.string()
    .required("Payment method is required.")
    .oneOf(["UPI", "Cash", "NEFT"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),



  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),

  commissionRate: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

    });



  export const outwardStockSchemaSilver = Yup.object({

  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),

  silverType: Yup.string()
    .required("Silver type is required.")
    .nullable(),

  sclarity: Yup.string()
    .required("Clarity is required.")
    .nullable(),

  formOfSilver: Yup.string()
    .required("form of silver is Required")
    .nullable(),
      
  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

     amountPaid: Yup.number()
  .typeError("Amount Paid must be a numeric value.")
  .required("Amount is required.")
  .test(
    "is-less-than-total",
    "Amount Paid cannot be greater than Total Price.",
    function (value) {
      const { totalPrice } = this.parent; // Access the totalPrice field from the current form values
      return value <= totalPrice; // Ensure amountPaid is less than or equal to totalPrice
    }
  )
  .min(0, "Amount Paid cannot be negative."),
      paymentStatus: Yup.string()
    .required("Payment status is required.")
    .oneOf(["Partial", "Completed", "Remaining"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),

     paymentMethod: Yup.string()
    .required("Payment method is required.")
    .oneOf(["UPI", "Cash", "NEFT"], "Invalid payment status.") // Restrict to valid dropdown options
    .nullable(),


  quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

description: Yup.string()
  .required("Description is required.")
  .matches(
    /^(?!\d+$)[a-zA-Z0-9\s]*$/,
    "Description must not contain only numbers."
  )
  .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  // totalPrice: Yup.number()
  //   .typeError("Total Value must be a numeric value.")
  //   .required("Total value is required.")
  //   .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),

  commissionRate: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

    });









