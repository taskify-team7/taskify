import "./Global.css";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./contexts/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga";

function App() {
  const queryClient = new QueryClient();

  const gaTrackingId: string | undefined = process.env.REACT_APP_GA_TRACKING_ID;
  if (gaTrackingId) {
    ReactGA.initialize(gaTrackingId, { debug: true });
    ReactGA.pageview(window.location.pathname);
  } else {
    console.error(
      "Google Analytics tracking ID is undefined. Make sure it is set in your environment variables."
    );
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer />
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
