import { BrowserRouter, Route, Routes } from "react-router-dom";

import AnalysisLayout from "./layouts/AnalysisLayout";
import HomeLayout from "./layouts/HomeLayout";
import MainLayout from "./layouts/MainLayout";
import NotificationLayout from "./layouts/NotificationLayout";

import AnalysisCompletePage from "./pages/AnalysisCompletePage";
import ArchiveDataPage from "./pages/ArchiveDataPage";
import ArchiveFolderPage from "./pages/ArchiveFolderPage";
import ArchivePage from "./pages/ArchivePage";
import ChatbotPage from "./pages/ChatbotPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import SignupCompletePage from "./pages/SignupCompletePage";
import SignupPage from "./pages/SignupPage";
import SubscriptionCompletePage from "./pages/SubscriptionCompletePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import TeachingMapContentPage from "./pages/TeachingMapContentPage";
import TeachingMapCreatePage from "./pages/TeachingMapCreatePage";
import TeachingMapDetailPage from "./pages/TeachingMapDetailPage";
import TeachingMapPage from "./pages/TeachingMapPage";
import TrashPage from "./pages/TrashPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/complete" element={<SignupCompletePage />} />
        <Route path="/subscription/complete" element={<SubscriptionCompletePage />} />

        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<AnalysisLayout />}>
          <Route path="/analysis/complete" element={<AnalysisCompletePage />} />
        </Route>

        <Route element={<NotificationLayout />}>
          <Route path="/notifications" element={<NotificationPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/folder" element={<ArchiveFolderPage />} />
          <Route path="/archive/folder/data/:dataId" element={<ArchiveDataPage />} />
          <Route path="/teaching-map" element={<TeachingMapPage />} />
          <Route path="/teaching-map/create" element={<TeachingMapCreatePage />} />
          <Route path="/teaching-map/:teachingMapId" element={<TeachingMapDetailPage />} />
          <Route path="/teaching-map/:teachingMapId/content" element={<TeachingMapContentPage />} />
          <Route path="/trash" element={<TrashPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Route>

        <Route element={<MainLayout insetMenu />}>
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Route>

        <Route element={<MainLayout showRightIcons={false} showMenuIcon={false} />}>
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
