import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./ImageInput.module.css";
import { ImageInputType } from "../../interface/Input";

function ImageInput({ label, value, validation, setValue }: ImageInputType) {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [pickedImage, setPickedImage] = useState<any>();
  const handleImageInput = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(file);
    // fileReader.onloadend = () => {
    //   setPickedImage(fileReader.result);
    // };
    const image = window.URL.createObjectURL(file);

    const blobId = image.slice(5); // "blob:" 다음의 문자열을 추출
    setPickedImage(image);
    setValue("imageUrl", blobId);
  };

  return (
    <div className={styles.content}>
      <label htmlFor="imageUrl" className={styles.content_label}>
        {label}
      </label>
      <div className={styles.content_image}>
        <input
          id="imageUrl"
          type="file"
          accept="image/png, image/jpeg"
          className={styles.content_image_input}
          value={value}
          onChange={handleImageChange}
          ref={(e) => {
            validation?.ref(e);
            imageInput.current = e;
          }}
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
