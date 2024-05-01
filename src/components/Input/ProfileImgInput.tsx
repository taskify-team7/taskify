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
  const [pickedImage, setPickedImage] = useState<any>(null);

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
    setValue("imageUrl", image);
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
            <div className={style.profileImgCover} onClick={handleImageInput}>
              <img
                className={style.penImg}
                src="/Icons/edit_pen.svg"
                alt="edit"
              />
            </div>
            <img
              className={style.profilePickImg}
              src={pickedImage}
              alt="add_Image"
            />
          </>
        ) : (
          <>
            <button
              type="button"
              className={style.profileImgBtn}
              onClick={handleImageInput}
            >
              <img
                className={initialImg ? style.profilePickImg : ""}
                src={initialImg ? initialImg : "/Icons/add_icon.svg"}
                alt="add_Image"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
// "/Icons/add_icon.svg"

export default ProfileImgInput;
