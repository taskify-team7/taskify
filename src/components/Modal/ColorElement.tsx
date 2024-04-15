import React, { useState } from "react";
import styles from "./ColorElement.module.css";

interface ColorElementProps {
  color: string;
}

function ColorElement({ color }: ColorElementProps) {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <div
      className={styles.content_color}
      style={{ backgroundColor: color }}
      onClick={() => setIsCheck((prev) => !prev)}
    >
      {isCheck && <img src="/Icons/modal_check.svg" alt="color"></img>}
    </div>
  );
}

export default ColorElement;
