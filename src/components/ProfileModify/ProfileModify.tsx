import style from "./ProfileModify.module.css";
import CommonInput from "../Input/CommonInput";
import { useForm } from "react-hook-form";
import ProfileImgInput from "../Input/ProfileImgInput";
import { changeMyInfo } from "../../api/auth";
import Button from "../Button/BaseButton/BaseButton";
import { toast } from "react-toastify";
import { ChangeMyInfoRequestbody } from "../../api/schema/requestType";

interface BodyType {
  nickname: string;
  profileImageUrl?: string | undefined;
}

export default function ProfileModify() {
  const userString = localStorage.getItem("user") || "";
  const userObject = JSON.parse(userString);
  const userEmail = userObject.email;
  const userImg = userObject.profileImageUrl;
  const userName = userObject.nickname;

  const { register, handleSubmit, setValue } = useForm({
    mode: "onBlur",
    defaultValues: {
      nickname: userName,
      profileImageUrl: undefined,
    },
  });

  const imageValidation = register("profileImageUrl");

  const onSubmit = async (data: BodyType) => {
    const profileData: ChangeMyInfoRequestbody = { nickname: data.nickname };

    if (userImg) {
      if (!data.profileImageUrl) {
        userObject.profileImageUrl = undefined;
      } else {
        profileData.profileImageUrl = userImg;
      }
    } else if (data.profileImageUrl) {
      profileData.profileImageUrl = data.profileImageUrl;
    }

    const res = await changeMyInfo(profileData);
    if (typeof res === "string") {
      toast.error(res);
    } else {
      localStorage.setItem("user", JSON.stringify(res));
      toast.success("회원정보가 변경되었습니다.");
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
              validation={register("nickname")}
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
