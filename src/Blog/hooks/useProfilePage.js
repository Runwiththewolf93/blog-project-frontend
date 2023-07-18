import { useEffect } from "react";
import { useCommentContextDispatch } from "../store/commentContext";
import { useAppContextDispatch } from "../store/appContext";

/**
 * Initializes the profile page by fetching all users and comments for the user.
 *
 * @return {void}
 */
// Custom hook for fetching all users and comments
const useProfilePage = () => {
  const { getAllUsers } = useAppContextDispatch();
  const { getAllCommentsUser } = useCommentContextDispatch();

  useEffect(() => {
    /**
     * Fetches all data asynchronously.
     *
     * @return {Promise<void>} A Promise that resolves when all data is fetched.
     */
    const fetchAllData = async () => {
      await getAllUsers();
      await getAllCommentsUser();
    };
    fetchAllData();
    // eslint-disable-next-line
  }, []);
};

export default useProfilePage;
