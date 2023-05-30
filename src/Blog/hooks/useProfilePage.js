import { useEffect } from "react";
import { useCommentContextDispatch } from "../store/commentContext";
import { useAppContextDispatch } from "../store/appContext";

// Custom hook for fetching all users and comments
const useProfilePage = () => {
  const { getAllUsers } = useAppContextDispatch();
  const { getAllCommentsUser } = useCommentContextDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      await getAllUsers();
      await getAllCommentsUser();
    };
    fetchAllData();
    // eslint-disable-next-line
  }, []);
};

export default useProfilePage;

// users
// blogCommentInfo
