import { ValidationError } from "@/constants/ValidationError";
import * as Yup from "yup";

// Validation schema using Yup
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(ValidationError.EMAIL)
    .required(ValidationError.REQUIRED),
  password: Yup.string()
    .min(8, ValidationError.PASSWORD_REGEX)
    .required(ValidationError.PASSWORD),
});
