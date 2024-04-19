import { ChangeEvent } from "react";

export interface CommonInputType {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  type?: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
