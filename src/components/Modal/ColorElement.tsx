import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./ColorElement.module.css";

interface ColorElementProps {
  color: string;
  selectColor: (color: string) => void;
  isColorChecked: boolean;
}

function ColorElement({
  color,
  selectColor,
  isColorChecked,
}: ColorElementProps) {
  const setColor = () => {
    if (!isColorChecked) {
      selectColor(color);
    }
  };

  return (
    <div
      className={styles.content_color}
      style={{ backgroundColor: color }}
      onClick={setColor}
    >
      {isColorChecked && <img src="/Icons/modal_check.svg" alt="color"></img>}
    </div>
  );
}

export default ColorElement;
