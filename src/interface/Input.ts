import { ChangeEvent, InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export interface CommonInputType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  validation?: UseFormRegisterReturn;
  errors?: FieldErrors;
}
