import styles from "./CreateColumnButton.module.css";

function CreateColumnButton({ ...rest }) {
  return (
    <div className={styles.newColumnButton} {...rest}>
      <p>새로운 컬럼 추가하기</p>
      <img src="/Icons/large.svg" alt="add Column" />
    </div>
  );
}

export default CreateColumnButton;
