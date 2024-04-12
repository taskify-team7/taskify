import styles from "./styles.module.css";
import "./Global.css";

function App() {
  return (
    <div className="App">
      안녕하세요
      <div className={styles.test}>테스트입니다</div>
    </div>
  );
}

export default App;
