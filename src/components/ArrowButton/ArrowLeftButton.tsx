import styles from "./ArrowLeftButton.module.css";

interface arrowButtonProps {
  onClick?: () => void;
  image?: string;
}

const ArrowLeftButton = ({ onClick, image }: arrowButtonProps) => {
  return (
    <button className={styles.arrowButton} onClick={onClick}>
      {image && (
        <img
          className={styles.arrowButtonImg}
          src={image}
          alt="arrowButtonImg"
        />
      )}
    </button>
  );
};

export default ArrowLeftButton;
