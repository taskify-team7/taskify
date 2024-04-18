import styles from "./CommonInput.module.css";
import { CommonInputType } from "../../interface/Input";

function CommonInput({
  label,
  inputOnChange,
  placeholder,
  value,
  required,
  type = "text",
  validation,
  errors,
  name = "",
}: CommonInputType) {
  const error = errors?.[name];
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
        className={styles.content_input}
        value={value}
        onChange={inputOnChange}
        {...validation}
      />
      {errors && (
        <p className={styles.errorMesage}>{error?.message?.toString()}</p>
      )}
    </div>
  );
}

export default CommonInput;
