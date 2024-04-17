import React from "react";
import styles from "./UserInput.module.css";
import { CommonInputType } from "../../interface/Input";

function UserInput({
  label,
  inputOnChange,
  placeholder,
  value,
  required,
}: CommonInputType) {
  return (
    <div className={styles.content}>
      <label htmlFor="user" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_user}>
        <input
          id="user"
          type="text"
          placeholder={placeholder}
          className={styles.content_user_input}
          onChange={inputOnChange}
        />
        <img src="/Icons/arrow_drop.svg" alt="drop" />
      </div>
    </div>
  );
}

export default UserInput;
