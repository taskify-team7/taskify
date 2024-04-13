import styles from "./styles.module.css";
import "./Global.css";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router></Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
