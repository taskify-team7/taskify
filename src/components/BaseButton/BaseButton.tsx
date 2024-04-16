import style from './BaseButton.module.css';

interface BaseButtonProps {
  onClick: () => void;
  text: string;
  image?: string;
}

function BaseButton({ onClick, text, image }: BaseButtonProps) {
  return (
    <button className={style.baseButton} onClick={onClick}>
      {image && <img className={style.baseButtonImg} src={image} alt="button-img" />} {text}
    </button>
  );
}

export default BaseButton;
