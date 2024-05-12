import React, { ButtonHTMLAttributes } from "react";
import style from "./BaseButton.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button className={style.baseButton} {...rest}>
      {children}
    </button>
  );
}

// 로그인 버튼
function LoginButton({ ...rest }: ButtonProps) {
  return (
    <Button
      className={rest.disabled ? `${style.loginBlock}` : `${style.login}`}
      {...rest}
    />
  );
}

//수락 버튼
function AcceptButton({ ...rest }: ButtonProps) {
  return <Button className={style.accept} {...rest} />;
}

//거절 버튼
function CancelButton({ ...rest }: ButtonProps) {
  return <Button className={style.cancel} {...rest} />;
}

//삭제 버튼
function DeleteButton({ ...rest }: ButtonProps) {
  return <Button className={style.delete} {...rest} />;
}

//모달에 들어갈 수락 버튼
function ModalColorButton({ ...rest }: ButtonProps) {
  return <Button className={style.modalColor} {...rest} />;
}

//모달에 들어갈 취소 버튼
function ModalCancelButton({ ...rest }: ButtonProps) {
  return <Button className={style.modalCancel} {...rest} />;
}

Button.Login = LoginButton;
Button.Accept = AcceptButton;
Button.Cancel = CancelButton;
Button.Delete = DeleteButton;
Button.ModalColor = ModalColorButton;
Button.ModalCancel = ModalCancelButton;

export default Button;
