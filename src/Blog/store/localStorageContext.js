import React, { useContext } from "react";
import useLocalStorage from "./useLocalStorage";

const LocalStorageContext = React.createContext();

/**
 * Creates a LocalStorageProvider component that wraps the given children components.
 *
 * @param {Object} children - The children components to be wrapped by the LocalStorageProvider.
 * @return {JSX.Element} The LocalStorageProvider component.
 */
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
