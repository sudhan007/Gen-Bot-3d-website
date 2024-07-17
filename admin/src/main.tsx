import { Icon } from "@iconify/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        icons={{
          success: (
            <Icon className="text-button text-xl" icon={"ph:check-bold"} />
          ),
          error: (
            <Icon className="text-red-600 text-xl" icon={"ph:warning-bold"} />
          ),
          loading: <Icon className="text-button text-xl" icon={"ph:loader"} />,
        }}
        duration={3000}
        toastOptions={{
          closeButton: true,
        }}
        theme="light"
      />
    </QueryClientProvider>
  </React.StrictMode>
);
