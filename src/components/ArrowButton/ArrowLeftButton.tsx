import styles from "./ArrowLeftButton.module.css";

interface arrowButtonProps {
  onClick?: () => void;
}

const ArrowLeftButton = ({ onClick }: arrowButtonProps) => {
  return (
    <button className={styles.arrowButton} onClick={onClick}>
      <img
        className={styles.arrowButtonImg}
        src="/Icons/leftArrow.svg"
        alt="arrowButtonImg"
      />
    </button>
  );
};

export default ArrowLeftButton;
