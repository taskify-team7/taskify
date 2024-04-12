import styles from "./styles.module.css";
import "./Global.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Router></Router>
    </div>
  );
}

export default App;
