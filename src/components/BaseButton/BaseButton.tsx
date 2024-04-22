import style from './BaseButton.module.css';
import add from '../../assets/addButton.svg';

interface BaseButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
  text?: string;
  leftImage?: string;
  rightImage?: string;
  styleType?:
    | 'baseButton'
    | 'login'
    | 'loginBlock'
    | 'accept'
    | 'refuse'
    | 'delete'
    | 'dashboardDelete'
    | 'newDashboard'
    | 'addColumn'
    | 'addColumnButton';
}

function BaseButton({
  onClick,
  type,
  text,
  leftImage,
  styleType = 'baseButton',
  rightImage,
}: BaseButtonProps) {
  const buttonClassName = `${style[styleType]}`;
  const addButton = rightImage === 'addButton' ? add : undefined;

  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {leftImage && (
        <img className={style.baseButtonImg} src={leftImage} alt="button-img" />
      )}{' '}
      {text}{' '}
      {rightImage && (
        <img
          className={style.baseButtonImg}
          src={addButton}
          alt="addButton-img"
        />
      )}
    </button>
  );
}

export default BaseButton;
