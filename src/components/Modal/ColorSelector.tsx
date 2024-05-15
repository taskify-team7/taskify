import styles from "./ColorSelector.module.css";

const colors = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

interface ColorSelectorProps {
  selectedColor: string | undefined;
  selectColor: (color: string) => void;
}

function ColorSelector({ selectColor, selectedColor }: ColorSelectorProps) {
  return (
    <div className={styles.content_colorList}>
      {colors.map((color, i) => (
        <div
          key={i}
          className={styles.content_color}
          style={{ backgroundColor: color }}
          onClick={() => selectColor(color)}
        >
          {color === selectedColor && (
            <img src="/Icons/modal_check.svg" alt="check" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ColorSelector;
