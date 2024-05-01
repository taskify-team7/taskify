import styles from "./ArrowRightButton.module.css";

interface arrowButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ArrowRightButton = ({ onClick, disabled }: arrowButtonProps) => {
  return (
    <button
      className={`${styles.arrowButton} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        className={styles.arrowButtonImg}
        src="/Icons/rightArrow.svg"
        alt="arrowButtonImg"
      />
    </button>
  );
};

export default ArrowRightButton;
