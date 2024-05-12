import { useForm } from "react-hook-form";
import styles from "./Forms.module.css";
import RevealSvg from "../../assets/reveal.svg";
import HideSvg from "../../assets/hide.svg";
import { useState } from "react";
import { LoginFormValue } from "../../interface/auth";
import Button from "../Button/BaseButton/BaseButton";

export default function LoginForm({
  handleLogin,
}: {
  handleLogin: (obj1: { email: string; password: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValue>({ mode: "onBlur" });
  const [revealPw, setRevealPw] = useState(false);

  return (
    <form
      className={styles.container}
      autoComplete="off"
      onSubmit={handleSubmit((data) => handleLogin(data))}
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          type="email"
          className={`${styles.input} + ${errors.email ? styles.isError : ""}`}
          placeholder="이메일을 입력해 주세요"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
        />
        {errors.email && (
          <span className={styles.error}>
            {errors.email.message?.toString()}
          </span>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          type={revealPw ? "text" : "password"}
          placeholder="비밀번호를 입력해 주세요"
          className={`${styles.input} + ${
            errors.password ? styles.isError : ""
          }`}
          {...register("password", {
            required: true,
          })}
        />
        <img
          onClick={() => setRevealPw((prev) => !prev)}
          src={revealPw ? HideSvg : RevealSvg}
          alt="reveal"
          className={styles.reveal}
        />
        {errors.password && (
          <span className={styles.error}>
            {errors.password.message?.toString()}
          </span>
        )}
      </div>
      <Button.Login
        type="submit"
        disabled={isSubmitting || !!errors.email || !!errors.password}
      >
        로그인
      </Button.Login>
    </form>
  );
}
