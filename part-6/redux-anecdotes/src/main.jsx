import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./NotificationContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </QueryClientProvider>
  </Provider>
);
