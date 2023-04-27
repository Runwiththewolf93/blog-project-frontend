import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { AppProvider } from "./Blog/components/store/appContext";
import { CommentProvider } from "./Blog/components/store/commentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <CommentProvider>
        <App />
      </CommentProvider>
    </AppProvider>
  </React.StrictMode>
);
