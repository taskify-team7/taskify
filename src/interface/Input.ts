import { ChangeEvent, InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export interface CommonInputType extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  validation?: UseFormRegisterReturn;
  errors?: FieldErrors;
  disabled?: boolean;
  setValue?: any;
}

export interface TagInputType extends CommonInputType {
  setValue: any;
  getValues: any;
  value: string[];
}

export interface DateInputType extends CommonInputType {
  control: any;
  setValue: any;
}

export interface ImageInputType extends CommonInputType {
  setValue: any;
  columnId: number;
}

export interface ProfileImgInputType extends CommonInputType {
  setValue: any;
}
