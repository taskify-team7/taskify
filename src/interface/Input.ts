import { ChangeEvent, InputHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

export interface CommonInputType extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  validation?: UseFormRegisterReturn;
  errors?: FieldErrors;
  disabled?: boolean;
}

export interface TagInputType extends CommonInputType {
  setValue: any;
  getValues: any;
}

export interface DateInputType extends CommonInputType {
  control: any;
  setValue: any;
}

export interface ImageInputType extends CommonInputType {
  setValue: any;
  columnId: number;
  divStyleType?: 'content_image' | 'profileDiv';
  coverStyleType?: 'imageCover' | 'profileImgCover';
  pickStyleType?: 'pickedImage' | 'profilePickImg'
  imgBtnStyleType?: 'content_image_button' | 'profileImgBtn'
}
