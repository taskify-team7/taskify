import styles from "./ArrowRightButton.module.css";

interface arrowButtonProps {
  onClick?: () => void;
}

const ArrowRightButton = ({ onClick }: arrowButtonProps) => {
  return (
    <button className={styles.arrowButton} onClick={onClick}>
      <img
        className={styles.arrowButtonImg}
        src="/Icons/rightArrow.svg"
        alt="arrowButtonImg"
      />
    </button>
  );
};

export default ArrowRightButton;
