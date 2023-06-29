import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Blog/pages/HomePage";
import ProfilePage from "./Blog/pages/ProfilePage";
import InterestsPage from "./Blog/pages/InterestsPage";
import InformationPage from "./Blog/pages/InformationPage";
import ResetPasswordPage from "./Blog/pages/ResetPasswordPage";
import ConfirmationPage from "./Blog/components/resetPageComponents/ConfirmationPage";
import ProtectedRoute from "./Blog/pages/ProtectedRoute";
import "./App.css";
import { useAppContextState } from "./Blog/store/appContext";
import { useBlogContextDispatch } from "./Blog/store/blogContext";
import { useCommentContextDispatch } from "./Blog/store/commentContext";
import { useVoteContextDispatch } from "./Blog/store/voteContext";

function App() {
  const { userInfo } = useAppContextState();
  const { getAllBlogPosts } = useBlogContextDispatch();
  const { getAllComments } = useCommentContextDispatch();
  const { getAllVotes } = useVoteContextDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      if (userInfo) {
        await Promise.all([getAllBlogPosts(), getAllComments(), getAllVotes()]);
      }
    };
    fetchAllData();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile-page"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interests-page"
          element={
            <ProtectedRoute>
              <InterestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/information-page"
          element={
            <ProtectedRoute>
              <InformationPage />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password/:token?" element={<ResetPasswordPage />} />
        <Route
          path="/confirmation"
          element={
            <ConfirmationPage
              heading="Check your email!"
              paragraph="We've sent you an email with a link to reset your password. If you
            don't see it, check your spam folder."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
