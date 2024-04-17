import { ChangeEvent } from "react";

export interface CommonInputType {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
