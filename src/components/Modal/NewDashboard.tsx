import styles from "./NewDashboard.module.css";
import ColorElement from "./ColorElement";

const colors = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

function NewDashboard() {
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
        />
      </div>
      <div className={styles.content_colorList}>
        {colors.map((color) => (
          <ColorElement color={color} />
        ))}
      </div>
    </div>
  );
}

export default NewDashboard;
