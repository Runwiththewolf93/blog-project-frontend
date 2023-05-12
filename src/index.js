import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { AppProvider } from "./Blog/components/store/appContext";
import { CommentProvider } from "./Blog/components/store/commentContext";
import { VoteProvider } from "./Blog/components/store/voteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <CommentProvider>
        <VoteProvider>
          <App />
        </VoteProvider>
      </CommentProvider>
    </AppProvider>
  </React.StrictMode>
);
