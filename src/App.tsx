import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 페이지 */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup/complete"
          element={<SignupCompletePage />}
        />

        <Route
          path="/subscription/complete"
          element={<SubscriptionCompletePage />}
        />

        {/* 홈 전용 레이아웃 */}
        <Route element={<HomeLayout />}>
          <Route
            path="/"
            element={<HomePage />}
          />
        </Route>

        {/* 분석 페이지 전용 레이아웃 */}
        <Route element={<AnalysisLayout />}>
          <Route
            path="/analysis/complete"
            element={<AnalysisCompletePage />}
          />
        </Route>

        {/* 알림 페이지 전용 레이아웃 */}
        <Route element={<NotificationLayout />}>
          <Route
            path="/notifications"
            element={<NotificationPage />}
          />
        </Route>

        {/* 기본 레이아웃 페이지 */}
        <Route element={<MainLayout />}>
          {/* 보관함 */}
          <Route
            path="/archive"
            element={<ArchivePage />}
          />

          {/* 보관함 폴더 상세 */}
          <Route
            path="/archive/folder"
            element={<ArchiveFolderPage />}
          />

          {/* 보관함 자료 상세 */}
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

          {/* 티칭맵 상세 */}
          <Route
            path="/teaching-map/:teachingMapId"
            element={<TeachingMapDetailPage />}
          />

          {/* 티칭맵 내용 상세 */}
          <Route
            path="/teaching-map/:teachingMapId/content"
            element={<TeachingMapContentPage />}
          />

          {/* 구독 */}
          <Route
            path="/subscription"
            element={<SubscriptionPage />}
          />
        </Route>

        {/* 챗봇 페이지 */}
        <Route element={<MainLayout insetMenu />}>
          <Route
            path="/chatbot"
            element={<ChatbotPage />}
          />
        </Route>

        {/* 회원가입 페이지 */}
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