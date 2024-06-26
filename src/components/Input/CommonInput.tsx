import styles from "./CommonInput.module.css";
import { CommonInputType } from "../../interface/Input";

function CommonInput({
  label,
  placeholder,
  value,
  type = "text",
  validation,
  errors,
  name = "",
  required,
  disabled = false,
  inputOnChange,
}: CommonInputType) {
  const error = errors?.[validation?.name || ""];

  return (
    <div className={styles.content}>
      <label htmlFor={label} className={styles.content_label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        className={`${styles.content_input} ${error ? styles.error : ""}`}
        value={value}
        onChange={inputOnChange}
        disabled={disabled}
        {...validation}
      />
      {errors && (
        <p className={styles.errorMesage}>{error?.message?.toString()}</p>
      )}
    </div>
  );
}

export default CommonInput;
