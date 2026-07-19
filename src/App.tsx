import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ArchivePage from "./pages/ArchivePage";
import ChatbotPage from "./pages/ChatbotPage";
import LoginPage from "./pages/LoginPage";
import SignupCompletePage from "./pages/SignupCompletePage";
import SignupPage from "./pages/SignupPage";
import ArchiveFolderPage from "./pages/ArchiveFolderPage";
import ArchiveDataPage from "./pages/ArchiveDataPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SubscriptionCompletePage from "./pages/SubscriptionCompletePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/complete" element={<SignupCompletePage />} />
        <Route path="/subscription/complete" element={<SubscriptionCompletePage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/archive" replace />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/folder" element={<ArchiveFolderPage />} />
          <Route path="/archive/folder/data/:dataId" element={<ArchiveDataPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
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
