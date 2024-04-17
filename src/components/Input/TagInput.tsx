import React from "react";
import styles from "./TagInput.module.css";
import { CommonInputType } from "../../interface/Input";

function TagInput({ label, inputOnChange, placeholder }: CommonInputType) {
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

export default TagInput;
