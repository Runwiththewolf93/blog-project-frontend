import React, { useContext } from "react";
import useLocalStorage from "./useLocalStorage";

const LocalStorageContext = React.createContext();

export const LocalStorageProvider = ({ children }) => {
  const [blogFilterLocalStorage, setBlogFilterLocalStorage] = useLocalStorage(
    "blogFilter",
    []
  );
  const [commentFilterLocalStorage, setCommentFilterLocalStorage] =
    useLocalStorage("commentFilter", []);
  const [voteFilterLocalStorage, setVoteFilterLocalStorage] = useLocalStorage(
    "voteFilter",
    []
  );

  return (
    <LocalStorageContext.Provider
      value={{
        blogFilterLocalStorage,
        setBlogFilterLocalStorage,
        commentFilterLocalStorage,
        setCommentFilterLocalStorage,
        voteFilterLocalStorage,
        setVoteFilterLocalStorage,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageContext = () => {
  return useContext(LocalStorageContext);
};
