import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Blog/pages/HomePage";
import ProfilePage from "./Blog/pages/ProfilePage";
import InterestsPage from "./Blog/pages/InterestsPage";
import InformationPage from "./Blog/pages/InformationPage";
import LoginPage from "./Blog/pages/LoginPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/interests-page" element={<InterestsPage />} />
        <Route path="/information-page" element={<InformationPage />} />
        <Route path="/login-page" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
