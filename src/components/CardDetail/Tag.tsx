import React from "react";
import styles from "./Tag.module.css";

interface TagProps {
  TagName: string;
}

function Tag({ TagName }: TagProps) {
  const colorList = ["F9EEE3", "E7F7DB", "F7DBF0", "DBE6F7"];
  const randomColorIndex = Math.floor(Math.random() * colorList.length);
  return (
    <div
      className={`${styles.cardDetail_tag} ${
        styles[colorList[randomColorIndex]]
      }`}
    >
      {TagName}
    </div>
  );
}

export default Tag;
