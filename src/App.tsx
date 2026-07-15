import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ArchivePage from "./pages/ArchivePage";
import ChatbotPage from "./pages/ChatbotPage";
import LoginPage from "./pages/LoginPage";
import SignupCompletePage from "./pages/SignupCompletePage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/complete" element={<SignupCompletePage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<ArchivePage />} />
        </Route>
        <Route element={<MainLayout insetMenu />}>
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Route>
        <Route element={<MainLayout showRightIcons={false} />}>
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


