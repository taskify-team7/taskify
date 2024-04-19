import styles from "./CommonInput.module.css";
import { CommonInputType } from "../../interface/Input";

function CommonInput({
  label,
  inputOnChange,
  placeholder,
  value,
  type = 'text',
  required,
}: CommonInputType) {
  return (
    <div className={styles.content}>
      <label htmlFor="name" className={styles.content_label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id="name"
        type={type}
        placeholder={placeholder}
        className={styles.content_input}
        value={value}
        onChange={inputOnChange}
      />
    </div>
  );
}

export default CommonInput;
