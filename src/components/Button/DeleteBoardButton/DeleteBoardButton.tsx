import React, { ButtonHTMLAttributes } from "react";
import styles from "./DeleteBoardButton.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function DeleteBoardButton({ ...rest }: ButtonProps) {
  return (
    <button className={styles.deleteBtn} {...rest}>
      대시보드 삭제하기
    </button>
  );
}

export default DeleteBoardButton;
