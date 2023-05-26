import { Navigate } from "react-router-dom";
import { useAppContextState } from "../store/appContext";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useAppContextState();
  if (!userInfo) {
    alert("You need to log in to access this page.");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
