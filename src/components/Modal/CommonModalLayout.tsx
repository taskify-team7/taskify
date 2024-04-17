import React, { ReactNode } from "react";
import styles from "./CommonModalLayout.module.css";

interface CommonModalLayoutProps {
  children: ReactNode;
  title: string;
}

function CommonModalLayout({ children, title }: CommonModalLayoutProps) {
  return (
    <div className={styles.modal_container}>
      <h2 className={styles.modal_title}>{title}</h2>
      {children}
    </div>
  );
}

export default CommonModalLayout;
