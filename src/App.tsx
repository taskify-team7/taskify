import "./Global.css";
import Router from "./Router";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
