import { Navigate } from "react-router-dom";
import { useAppContext } from "../components/store/appContext";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useAppContext();
  if (!userInfo) {
    alert("You need to log in to access this page.");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
