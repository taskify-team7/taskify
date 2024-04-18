import React, { useRef, useState } from "react";
import styles from "./ImageInput.module.css";
import { CommonInputType } from "../../interface/Input";

function ImageInput({ label, inputOnChange, value }: CommonInputType) {
  const imageInput = useRef<any>();
  const [pickedImage, setPickedImage] = useState<any>();

  const handleImageInput = () => {
    imageInput.current.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
  };

  return (
    <div className={styles.content}>
      <label htmlFor="iamge" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_image}>
        <input
          id="iamge"
          type="file"
          accept="image/png, image/jpeg"
          className={styles.content_image_input}
          value={value}
          onChange={handleImageChange}
          ref={imageInput}
        />
        {pickedImage ? (
          <>
            <div className={styles.imageCover} onClick={handleImageInput}>
              <img src="/Icons/edit_pen.svg" alt="edit" />
            </div>
            <img
              className={styles.pickedImage}
              src={pickedImage}
              alt="add_Image"
            />
          </>
        ) : (
          <>
            <button
              type="button"
              className={styles.content_image_button}
              onClick={handleImageInput}
            >
              <img src="/Icons/add_icon.svg" alt="add_Image" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageInput;
