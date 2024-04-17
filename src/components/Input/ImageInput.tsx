import React, { useRef } from "react";
import styles from "./ImageInput.module.css";
import { CommonInputType } from "../../interface/Input";

function ImageInput({ label, inputOnChange, value }: CommonInputType) {
  const imageInput = useRef<any>();

  const handleImageInput = () => {
    imageInput.current.click();
  };

  return (
    <div className={styles.content}>
      <label htmlFor="iamge" className={styles.content_label}>
        {label}
      </label>
      <input
        id="iamge"
        type="file"
        accept="image/png, image/jpeg"
        className={styles.content_input}
        value={value}
        onChange={inputOnChange}
        ref={imageInput}
      />
      <button
        type="button"
        className={styles.content_image}
        onClick={handleImageInput}
      >
        <img src="/Icons/add_icon.svg" alt="add_Image" />
      </button>
    </div>
  );
}

export default ImageInput;
