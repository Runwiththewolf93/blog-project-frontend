import { Navigate } from "react-router-dom";
import { useAppContextState } from "../store/appContext";

/**
 * Check if the user is authenticated before rendering the children components.
 *
 * @param {Object} children - The components to be rendered if the user is authenticated.
 * @return {Object} The children components if the user is authenticated.
 */
// ProtectedRoute wrapper component
const ProtectedRoute = ({ children }) => {
  const { userInfo } = useAppContextState();
  if (!userInfo) {
    alert("You need to log in to access this page.");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
