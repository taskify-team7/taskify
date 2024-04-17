import React from "react";
import styles from "./DateInput.module.css";
import { CommonInputType } from "../../interface/Input";

function DateInput({ label, inputOnChange, placeholder }: CommonInputType) {
  return (
    <div className={styles.content}>
      <label htmlFor="name" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_date}>
        <img src="/Icons/calendar.svg" alt="date" />
        <input
          id="name"
          type="text"
          placeholder={placeholder}
          className={styles.content_date_input}
          onChange={inputOnChange}
        />
      </div>
    </div>
  );
}

export default DateInput;
