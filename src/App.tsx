import { BrowserRouter, Route, Routes } from "react-router-dom";

import RequireAuth from "./components/auth/RequireAuth";
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
import MyPage from "./pages/myPage/MyPage";
import MyPageAuthRequiredPage from "./pages/myPage/MyPageAuthRequiredPage";
import MyPageEditPage from "./pages/myPage/MyPageEditPage";
import MyPageInquiryPage from "./pages/myPage/MyPageInquiryPage";
import MyPageNotificationPage from "./pages/myPage/MyPageNotificationPage";
import MyPageTeachingStylePage from "./pages/myPage/MyPageTeachingStylePage";
import MyPageWithdrawalCompletePage from "./pages/myPage/MyPageWithdrawalCompletePage";
import MyPageWithdrawalConfirmPage from "./pages/myPage/MyPageWithdrawalConfirmPage";
import MyPageWithdrawalReasonPage from "./pages/myPage/MyPageWithdrawalReasonPage";
import NotificationPage from "./pages/NotificationPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import SignupCompletePage from "./pages/SignupCompletePage";
import SignupPage from "./pages/SignupPage";
import SubscriptionCompletePage from "./pages/SubscriptionCompletePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import TeachingMapContentPage from "./pages/TeachingMapContentPage";
import TeachingMapCreatePage from "./pages/TeachingMapCreatePage";
import TeachingMapDetailPage from "./pages/TeachingMapDetailPage";
import TeachingMapPage from "./pages/TeachingMapPage";
import TermsEventPage from "./pages/TermsEventPage";
import TermsMarketingPage from "./pages/TermsMarketingPage";
import TermsServicePage from "./pages/TermsServicePage";
import TemporaryTeachingMapPage from "./pages/TemporaryTeachingMapPage";
import TrashPage from "./pages/TrashPage";
import TrashFolderPage from "./pages/TrashFolderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/oauth/callback" element={<OAuthCallbackPage />} />

        <Route path="/oauth2/redirect" element={<OAuthCallbackPage />} />

        <Route path="/oauth/success" element={<OAuthCallbackPage />} />

        <Route
          path="/login/oauth2/code/:provider"
          element={<OAuthCallbackPage />}
        />

        <Route element={<RequireAuth />}>
          {/* 회원가입 완료 */}
          <Route path="/signup/complete" element={<SignupCompletePage />} />

          {/* 구독 완료 */}
          <Route
            path="/subscription/complete"
            element={<SubscriptionCompletePage />}
          />
          <Route
            path="/subscribe/complete"
            element={<SubscriptionCompletePage />}
          />

          {/* 홈 전용 레이아웃 */}
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* 분석 전용 레이아웃 */}
          <Route element={<AnalysisLayout />}>
            <Route
              path="/analysis/complete"
              element={<AnalysisCompletePage />}
            />
          </Route>

          {/* 알림 전용 레이아웃 */}
          <Route element={<NotificationLayout />}>
            <Route path="/notifications" element={<NotificationPage />} />
          </Route>

          {/* 기본 레이아웃 */}
          <Route element={<MainLayout />}>
            {/* 보관함 */}
            <Route path="/archive" element={<ArchivePage />} />

            {/* 보관함 폴더 상세 */}
            <Route
              path="/archive/folder/:folderId"
              element={<ArchiveFolderPage />}
            />

            {/* 자료 상세 */}
            <Route
              path="/archive/folder/:folderId/materials/:materialId"
              element={<ArchiveDataPage />}
            />

            {/* 휴지통 */}
            <Route path="/trash" element={<TrashPage />} />

            <Route
              path="/trash/folders/:folderId"
              element={<TrashFolderPage />}
            />

            {/* 구독 */}

            {/* 마이페이지 */}
            <Route path="/mypage" element={<MyPage />} />

            {/* 비로그인 마이페이지 */}
            <Route
              path="/mypage/auth-required"
              element={<MyPageAuthRequiredPage />}
            />

            {/* 회원 정보 수정 */}
            <Route path="/mypage/edit" element={<MyPageEditPage />} />

            {/* 알림 설정 */}
            <Route
              path="/mypage/notification"
              element={<MyPageNotificationPage />}
            />

            {/* 티칭맵 설정 */}
            <Route
              path="/mypage/teaching-style"
              element={<MyPageTeachingStylePage />}
            />

            {/* 1:1 문의 */}
            <Route path="/mypage/inquiry" element={<MyPageInquiryPage />} />

            {/* 티칭맵: 콘텐츠 상세를 제외하면 모바일 하단 내비게이션 노출 */}
            <Route path="/teaching-map" element={<TeachingMapPage />} />
            <Route path="/teaching-map/create" element={<TeachingMapCreatePage />} />
            <Route path="/teaching-map/drafts" element={<TemporaryTeachingMapPage />} />
            <Route path="/teaching-map/drafts/:draftId/edit" element={<TeachingMapCreatePage />} />
            <Route path="/teaching-map/:teachingMapId" element={<TeachingMapDetailPage />} />
          </Route>


          {/* 탈퇴 절차에서는 모바일 하단 내비게이션 미노출 */}
          <Route element={<MainLayout hideMobileNav />}>
            <Route
              path="/mypage/withdrawal-reason"
              element={<MyPageWithdrawalReasonPage />}
            />
            <Route
              path="/mypage/withdrawal-confirm"
              element={<MyPageWithdrawalConfirmPage />}
            />
            <Route
              path="/mypage/withdrawal-complete"
              element={<MyPageWithdrawalCompletePage />}
            />
          </Route>

          {/* 티칭맵 콘텐츠 상세에서만 모바일 하단 내비게이션 미노출 */}
          <Route element={<MainLayout hideMobileNav />}>
            <Route
              path="/teaching-map/:teachingMapId/:contentId"
              element={<TeachingMapContentPage />}
            />
          </Route>

          {/* 챗봇 전용 레이아웃 */}
          <Route element={<MainLayout insetMenu />}>
            <Route path="/chatbot" element={<ChatbotPage />} />

            <Route path="/chatbot/:chatRoomId" element={<ChatbotPage />} />
          </Route>

          {/* 구독 */}
          <Route element={<MainLayout hideMobileNav />}>
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/subscribe" element={<SubscriptionPage />} />
          </Route>
        </Route>

        {/* 회원가입 전용 레이아웃 */}
        <Route
          element={
            <MainLayout
              showRightIcons={false}
              showMenuIcon={false}
              hideHeaderOnMobile
              hideMobileNav
            />
          }
        >
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/terms/service" element={<TermsServicePage />} />
          <Route
            path="/signup/terms/marketing"
            element={<TermsMarketingPage />}
          />
          <Route path="/signup/terms/event" element={<TermsEventPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
