import React, { ChangeEvent, useRef, useState } from "react";
import style from "./ProfileImgInput.module.css";
import { ProfileImgInputType } from "../../interface/Input";
import { changeImageURL } from "../../api/auth";

function ProfileImgInput({
  value,
  validation,
  setValue,
  initialImg,
}: ProfileImgInputType) {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [pickedImage, setPickedImage] = useState<any>(initialImg || null);

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
    const image = await changeImageURL(file);
    setValue("profileImageUrl", image);
  };

  const delteImage = () => {
    setPickedImage(undefined);
    setValue("profileImageUrl", undefined);
  };

  return (
    <div className={style.content}>
      <div className={style.profileDiv}>
        <input
          id="imageUrl"
          type="file"
          accept="image/png, image/jpeg"
          className={style.content_image_input}
          value={value}
          onChange={handleImageChange}
          ref={(e) => {
            validation?.ref(e);
            imageInput.current = e;
          }}
        />
        {pickedImage ? (
          <>
            <img
              className={style.profilePickImg}
              src={pickedImage}
              alt="add_Image"
              onClick={handleImageInput}
            />
            <button
              onClick={delteImage}
              className={style.content_delete_button}
            >
              <img src="/Icons/modal_close.svg" alt="delete_Image" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={style.profileImgBtn}
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

export default ProfileImgInput;
