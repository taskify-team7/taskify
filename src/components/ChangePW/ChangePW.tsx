import CommonInput from "../Input/CommonInput";
import style from "./ChangePW.module.css";
import { useForm } from "react-hook-form";
import { changePassword, logIn } from "../../api/auth";
import Button from "../Button/BaseButton/BaseButton";
import { toast } from "react-toastify";

interface FormValues {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export default function ChangePW() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
  });
  const newPassword = watch("newPassword");
  const newPasswordConfirmation = watch("newPasswordConfirmation");

  let userEmail = "";
  const userString = localStorage.getItem("user");
  if (userString) {
    const userObject = JSON.parse(userString);
    userEmail = userObject.email;
  }

  const onSubmit = async (data: FormValues) => {
    const LoginData = {
      email: userEmail,
      password: data.password,
    };

    if (newPassword !== newPasswordConfirmation) {
      setError("newPasswordConfirmation", {
        type: "manual",
        message: "새 비밀번호가 일치하지 않습니다.",
      });
      return;
    }
    clearErrors("newPasswordConfirmation");
    const submissionData = {
      password: data.password,
      newPassword: data.newPassword,
    };

    const loginRes = await logIn(LoginData);

    if (typeof loginRes === "string") {
      toast.error("현재 비밀번호가 일치하지 않습니다.");
      return 0;
    }

    await changePassword(submissionData);
    toast.success("비밀번호가 변경되었습니다.");
    setValue("password", "");
    setValue("newPassword", "");
    setValue("newPasswordConfirmation", "");
  };

  return (
    <>
      <div className={style.container}>
        <h2 className={style.mainText}>비밀번호 변경</h2>
        <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            label="비밀번호"
            placeholder="현재 비밀번호 입력"
            type="password"
            name="password"
            validation={register("password", {
              required: "비밀번호는 필수 입력 사항입니다.",
            })}
            errors={errors}
          />
          <CommonInput
            label="새 비밀번호"
            placeholder="새 비밀번호 입력"
            type="password"
            name="newPassword"
            validation={register("newPassword", {
              required: "비밀번호는 필수 입력 사항입니다.",
            })}
            errors={errors}
          />
          <CommonInput
            label="새 비밀번호 확인"
            placeholder="새 비밀번호 입력"
            type="password"
            name="newPasswordConfirmation"
            validation={register("newPasswordConfirmation", {
              required: "비밀번호는 필수 입력 사항입니다.",
            })}
            errors={errors}
          />
          <div className={style.buttonContainer}>
            <Button.Accept type="submit">변경</Button.Accept>
          </div>
        </form>
      </div>
    </>
  );
}
