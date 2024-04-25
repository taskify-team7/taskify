import React, { useState } from "react";
import styles from "./Tag.module.css";
import { TagProps } from "../../interface/DashboardType";

function Tag({ TagName }: TagProps) {
  const colorList = ["F9EEE3", "E7F7DB", "F7DBF0", "DBE6F7"];
  // 랜덤 색상을 한 번 생성하고 상태로 관리
  const [randomColorIndex] = useState(
    Math.floor(Math.random() * colorList.length)
  );

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
