import React, { ChangeEvent } from "react";
import styles from "./CommonInput.module.css";

interface CommonInputProps {
  label: string;
  placeholder: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CommonInput({ label, inputOnChange, placeholder }: CommonInputProps) {
  return (
    <div className={styles.content}>
      <label htmlFor="name" className={styles.content_label}>
        {label}
      </label>
      <input
        id="name"
        type="text"
        placeholder={placeholder}
        className={styles.content_input}
        onChange={inputOnChange}
      />
    </div>
  );
}

export default CommonInput;
