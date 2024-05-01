import styles from "./ArrowLeftButton.module.css";

interface arrowButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ArrowLeftButton = ({ onClick, disabled }: arrowButtonProps) => {
  return (
    <button
      className={`${styles.arrowButton} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        className={styles.arrowButtonImg}
        src="/Icons/leftArrow.svg"
        alt="arrowButtonImg"
      />
    </button>
  );
};

export default ArrowLeftButton;
