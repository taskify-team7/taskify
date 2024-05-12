import style from "./ProfileModify.module.css";
import CommonInput from "../Input/CommonInput";
import { useForm } from "react-hook-form";
import ProfileImgInput from "../Input/ProfileImgInput";
import { changeMyInfo } from "../../api/auth";
import Button from "../Button/BaseButton/BaseButton";

export default function ProfileModify() {
  const userString = localStorage.getItem("user") || "";
  const userObject = JSON.parse(userString);
  const userEmail = userObject.email;
  const userImg = userObject.profileImageUrl;
  console.log((userObject.nickname = "??"));

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      nickName: "",
      imageUrl: null,
    },
  });

  const imageValidation = register("imageUrl");

  const onSubmit = async (data: any) => {
    const profileData = {
      nickname: data.nickName,
      ...(data.imageUrl ? { profileImageUrl: data.imageUrl } : {}),
    };

    try {
      const res = await changeMyInfo(profileData);
      userObject.nickname = data.nickName;
      localStorage.setItem("user", JSON.stringify(userObject));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.mainText}>프로필</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.totalInputContainer}>
          <div className={style.imgInputContainer}>
            <ProfileImgInput
              initialImg={userImg}
              validation={imageValidation}
              setValue={setValue}
            />
          </div>
          <div className={style.commonInputContainer}>
            <CommonInput
              label={"이메일"}
              placeholder={userEmail}
              disabled={true}
            />
            <CommonInput
              label={"닉네임"}
              placeholder="닉네임 입력"
              validation={register("nickName")}
            />
          </div>
        </div>
        <div className={style.BtnContainer}>
          <Button.Accept type="submit">저장</Button.Accept>
        </div>
      </form>
    </div>
  );
}
