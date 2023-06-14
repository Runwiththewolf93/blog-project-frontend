import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { AppProvider } from "./Blog/store/appContext";
import { BlogProvider } from "./Blog/store/blogContext";
import { CommentProvider } from "./Blog/store/commentContext";
import { VoteProvider } from "./Blog/store/voteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <BlogProvider>
        <CommentProvider>
          <VoteProvider>
            <App />
          </VoteProvider>
        </CommentProvider>
      </BlogProvider>
    </AppProvider>
  </React.StrictMode>
);
