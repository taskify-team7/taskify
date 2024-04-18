import { ChangeEvent, InputHTMLAttributes } from "react";

export interface CommonInputType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
