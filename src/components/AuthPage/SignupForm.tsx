import { useForm } from "react-hook-form";
import styles from "./Forms.module.css";
import RevealSvg from "../../assets/reveal.svg";
import HideSvg from "../../assets/hide.svg";
import { useState } from "react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm({ mode: "onBlur" });
  const [revealPw, setRevealPw] = useState(false);
  const [revealConfirmPw, setRevealConfirmPw] = useState(false);

  return (
    <form
      className={styles.container}
      autoComplete="off"
      onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
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
        <label className={styles.label} htmlFor="nickname">
          닉네임
        </label>
        <input
          id="nickname"
          type="nickname"
          className={`${styles.input} + ${
            errors.nickname ? styles.isError : ""
          }`}
          placeholder="닉네임을 입력해 주세요"
          {...register("nickname", {
            required: true,
            minLength: {
              value: 2,
              message: "2자 이상 입력해 주세요.",
            },
          })}
        />
        {errors.nickname && (
          <span className={styles.error}>
            {errors.nickname.message?.toString()}
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
          placeholder="8자 이상 입력해 주세요"
          className={`${styles.input} + ${
            errors.password ? styles.isError : ""
          }`}
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },
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
      <div className={styles.field}>
        <label className={styles.label} htmlFor="confirmPassword">
          비밀번호
        </label>
        <input
          id="confirmPassword"
          type={revealPw ? "text" : "confirmPassword"}
          placeholder="비밀번호를 한번 더 입력해 주세요"
          className={`${styles.input} + ${
            errors.confirmPassword ? styles.isError : ""
          }`}
          {...register("confirmPassword", {
            required: true,
            validate: (v) =>
              v === getValues("password") || "비밀번호가 일치하지 않습니다.",
          })}
        />
        <img
          onClick={() => setRevealConfirmPw((prev) => !prev)}
          src={revealConfirmPw ? HideSvg : RevealSvg}
          alt="reveal"
          className={styles.reveal}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>
            {errors.confirmPassword.message?.toString()}
          </span>
        )}
      </div>
      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
}
