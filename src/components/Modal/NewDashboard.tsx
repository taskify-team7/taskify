import styles from "./NewDashboard.module.css";
import ColorSelector from "./ColorSelector";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const colors = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

type apiBodyValueType = {
  title: string;
  color: string;
};

interface NewDashboardProps {
  setApiBodyValue: Dispatch<SetStateAction<apiBodyValueType>>;
}

function NewDashboard({ setApiBodyValue }: NewDashboardProps) {
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
          <ColorSelector color={color} setApiBodyValue={setApiBodyValue} />
        ))}
      </div>
    </div>
  );
}

export default NewDashboard;
