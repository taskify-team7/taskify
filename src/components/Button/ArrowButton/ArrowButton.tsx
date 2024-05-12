import styles from "./ArrowButton.module.css";

interface arrowButtonProps {
  onClick?: () => void;
  direction: "left" | "right";
  disabled?: boolean;
}

const ArrowRightButton = ({
  onClick,
  disabled,
  direction,
}: arrowButtonProps) => {
  return (
    <button
      className={`${styles.arrowButton} ${styles[direction]} ${
        disabled ? styles.disabled : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        className={styles.arrowButtonImg}
        src={`/Icons/${direction}Arrow.svg`}
        alt={`${direction} arrow`}
      />
    </button>
  );
};

export default ArrowRightButton;
