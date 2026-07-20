import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ArchiveDataPage from "./pages/ArchiveDataPage";
import ArchiveFolderPage from "./pages/ArchiveFolderPage";
import ArchivePage from "./pages/ArchivePage";
import ChatbotPage from "./pages/ChatbotPage";
import LoginPage from "./pages/LoginPage";
import SignupCompletePage from "./pages/SignupCompletePage";
import SignupPage from "./pages/SignupPage";
import TeachingMapCreatePage from "./pages/TeachingMapCreatePage";
import TeachingMapPage from "./pages/TeachingMapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/signup/complete"
          element={<SignupCompletePage />}
        />

        <Route element={<MainLayout />}>
          {/* 기본 주소 → /archive로 이동 */}
          <Route
            path="/"
            element={<Navigate to="/archive" replace />}
          />

          {/* 보관함 */}
          <Route
            path="/archive"
            element={<ArchivePage />}
          />

          {/* 폴더 상세 */}
          <Route
            path="/archive/folder"
            element={<ArchiveFolderPage />}
          />

          {/* 자료 상세 */}
          <Route
            path="/archive/folder/data/:dataId"
            element={<ArchiveDataPage />}
          />

          {/* 티칭맵 */}
          <Route
            path="/teaching-map"
            element={<TeachingMapPage />}
          />

          {/* 티칭맵 생성 */}
          <Route
            path="/teaching-map/create"
            element={<TeachingMapCreatePage />}
          />
        </Route>

        <Route element={<MainLayout insetMenu />}>
          <Route
            path="/chatbot"
            element={<ChatbotPage />}
          />
        </Route>

        <Route element={<MainLayout showRightIcons={false} />}>
          <Route
            path="/signup"
            element={<SignupPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;