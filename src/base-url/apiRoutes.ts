const BASE_URL = `${process?.env?.NEXT_PUBLIC_BACKEND_API_URL}/api/v1`;

// Login Route
export const SIGN_IN = `${BASE_URL}/identity/signIn`;

// Vendor Management
export const CREATE_VENDOR = `${BASE_URL}/vendorManagement/createVendor`;
export const GET_ALL_VENDOR = `${BASE_URL}/vendorManagement/getVendor`;
