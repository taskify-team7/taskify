import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./ImageInput.module.css";
import { ImageInputType } from "../../interface/Input";
import { changeColumnImageURL } from "../../api/dashboard";

function ImageInput({
  label,
  value,
  validation,
  setValue,
  columnId,
}: ImageInputType) {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [pickedImage, setPickedImage] = useState<any>(value);
  const handleImageInput = () => {
    imageInput.current?.click();
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPickedImage(fileReader.result);
    };
    const image = await changeColumnImageURL(file, columnId);
    setValue("imageUrl", image);
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
