import styles from "./NewDashboard.module.css";
import ColorElement from "./ColorElement";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const colors = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

type apiBodyValueType = {
  title: string;
  color: string;
};

interface NewDashboardProps {
  setApiBodyValue: Dispatch<SetStateAction<apiBodyValueType>>;
}

function NewDashboard({ setApiBodyValue }: NewDashboardProps) {
  // 선택된 색상을 상태로 관리
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const selectColor = (color: string) => {
    setSelectedColor(color);

    // API body의 색상 값 업데이트
    setApiBodyValue((prev: any) => ({
      ...prev,
      color: color,
    }));
  };

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setApiBodyValue((prev) => ({
      ...prev,
      title: value,
    }));
  };

  return (
    <div className={styles.content}>
      <div className={styles.content_form}>
        <label htmlFor="dashbord" className={styles.content_label}>
          대시보드 이름
        </label>
        <input
          id="dashbord"
          type="text"
          placeholder="뉴프로젝트"
          className={styles.content_input}
          onChange={inputOnChange}
        />
      </div>
      <div className={styles.content_colorList}>
        {colors.map((color) => (
          <ColorElement
            color={color}
            selectColor={selectColor}
            isColorChecked={color === selectedColor}
          />
        ))}
      </div>
    </div>
  );
}

export default NewDashboard;
