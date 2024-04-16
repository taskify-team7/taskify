import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./ColorSelector.module.css";

type apiBodyValueType = {
  title: string;
  color: string;
};

interface ColorSelectorProps {
  color: string;
  setApiBodyValue: Dispatch<SetStateAction<apiBodyValueType>>;
}

function ColorSelector({ color, setApiBodyValue }: ColorSelectorProps) {
  const [isCheck, setIsCheck] = useState(false);

  const setColor = () => {
    setIsCheck((prev) => !prev);

    setApiBodyValue((prev) => ({
      ...prev,
      color: color,
    }));
  };

  return (
    <div
      className={styles.content_color}
      style={{ backgroundColor: color }}
      onClick={setColor}
    >
      {isCheck && <img src="/Icons/modal_check.svg" alt="color"></img>}
    </div>
  );
}

export default ColorSelector;
