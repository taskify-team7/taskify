import styles from "./CreateColumnButton.module.css";

interface ButtonProps {
  handleModalOpen: () => void;
}

function CreateColumnButton({ handleModalOpen, ...rest }: ButtonProps) {
  return (
    <div className={styles.newColumnButton} onClick={handleModalOpen}>
      <p>새로운 컬럼 추가하기</p>
      <img src="/Icons/large.svg" alt="add Column" />
    </div>
  );
}

export default CreateColumnButton;
