import { ChangeEvent, InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export interface CommonInputType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  validation?: UseFormRegisterReturn;
  errors?: FieldErrors;
}

export interface TagInputType extends CommonInputType {
  setValue: any;
  getValues: any;
}

export interface DateInputType extends CommonInputType {
  control: any;
}

export interface ImageInputType extends CommonInputType {
  setValue: any;
}
