import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 濡쒓렇??*/}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/oauth/callback"
          element={<OAuthCallbackPage />}
        />
        <Route
          path="/oauth2/redirect"
          element={<OAuthCallbackPage />}
        />
        <Route
          path="/oauth/success"
          element={<OAuthCallbackPage />}
        />
        <Route
          path="/login/oauth2/code/:provider"
          element={<OAuthCallbackPage />}
        />

        <Route
          path="/signup/terms/service"
          element={<TermsServicePage />}
        />
        <Route
          path="/signup/terms/marketing"
          element={<TermsMarketingPage />}
        />
        <Route
          path="/signup/terms/event"
          element={<TermsEventPage />}
        />

        <Route element={<RequireAuth />}>
        {/* ?뚯썝媛???꾨즺 */}
        <Route
          path="/signup/complete"
          element={<SignupCompletePage />}
        />

        {/* 援щ룆 ?꾨즺 */}
        <Route
          path="/subscription/complete"
          element={
            <SubscriptionCompletePage />
          }
        />

        {/* ???꾩슜 ?덉씠?꾩썐 */}
        <Route element={<HomeLayout />}>
          <Route
            path="/"
            element={<HomePage />}
          />
        </Route>

        {/* 遺꾩꽍 ?꾩슜 ?덉씠?꾩썐 */}
        <Route element={<AnalysisLayout />}>
          <Route
            path="/analysis/complete"
            element={
              <AnalysisCompletePage />
            }
          />
        </Route>

        {/* ?뚮┝ ?꾩슜 ?덉씠?꾩썐 */}
        <Route
          element={<NotificationLayout />}
        >
          <Route
            path="/notifications"
            element={<NotificationPage />}
          />
        </Route>

        {/* 湲곕낯 ?덉씠?꾩썐 */}
        <Route element={<MainLayout />}>
          {/* 蹂닿???*/}
          <Route
            path="/archive"
            element={<ArchivePage />}
          />

          {/* 蹂닿????대뜑 ?곸꽭 */}
          <Route
            path="/archive/folder/:folderId"
            element={<ArchiveFolderPage />}
          />

          {/* 蹂닿????먮즺 ?곸꽭 */}
          <Route
            path="/archive/folder/:folderId/materials/:materialId"
            element={<ArchiveDataPage />}
          />

          {/* ?곗묶留?紐⑸줉 */}
          <Route
            path="/teaching-map"
            element={<TeachingMapPage />}
          />

          {/* ?곗묶留??앹꽦 */}
          <Route
            path="/teaching-map/create"
            element={
              <TeachingMapCreatePage />
            }
          />

          {/* ?꾩떆 ?곗묶留?蹂닿???*/}
          <Route
            path="/teaching-map/drafts"
            element={
              <TemporaryTeachingMapPage />
            }
          />

          {/* ?꾩떆 ?곗묶留??섏젙 */}
          <Route
            path="/teaching-map/drafts/:draftId/edit"
            element={
              <TeachingMapCreatePage />
            }
          />

          {/* ?곗묶留?肄섑뀗痢??곸꽭 */}
          <Route
            path="/teaching-map/:teachingMapId/:contentId"
            element={
              <TeachingMapContentPage />
            }
          />

          {/* ?곗묶留??곸꽭 */}
          <Route
            path="/teaching-map/:teachingMapId"
            element={
              <TeachingMapDetailPage />
            }
          />

          {/* ?댁???*/}
          <Route
            path="/trash"
            element={<TrashPage />}
          />

          {/* 援щ룆 */}

          {/* 留덉씠?섏씠吏 */}
          <Route
            path="/subscription"
            element={<SubscriptionPage />}
          />

          <Route
            path="/mypage"
            element={<MyPage />}
          />

          {/* 鍮꾨줈洹몄씤 留덉씠?섏씠吏 */}
          <Route
            path="/mypage/auth-required"
            element={
              <MyPageAuthRequiredPage />
            }
          />

          {/* ?뚯썝 ?뺣낫 ?섏젙 */}
          <Route
            path="/mypage/edit"
            element={<MyPageEditPage />}
          />

          {/* ?뚮┝ ?ㅼ젙 */}
          <Route
            path="/mypage/notification"
            element={
              <MyPageNotificationPage />
            }
          />

          {/* ?곗묶留??ㅼ젙 */}
          <Route
            path="/mypage/teaching-style"
            element={
              <MyPageTeachingStylePage />
            }
          />

          {/* 1:1 臾몄쓽 */}
          <Route
            path="/mypage/inquiry"
            element={
              <MyPageInquiryPage />
            }
          />

          {/* ?덊눜 ?ъ쑀 */}
          <Route
            path="/mypage/withdrawal-reason"
            element={
              <MyPageWithdrawalReasonPage />
            }
          />

          {/* ?덊눜 ?뺤씤 */}
          <Route
            path="/mypage/withdrawal-confirm"
            element={
              <MyPageWithdrawalConfirmPage />
            }
          />

          {/* ?덊눜 ?꾨즺 */}
          <Route
            path="/mypage/withdrawal-complete"
            element={
              <MyPageWithdrawalCompletePage />
            }
          />
        </Route>


        {/* 梨쀫큸 ?꾩슜 ?덉씠?꾩썐 */}
        <Route
          element={<MainLayout insetMenu />}
        >
          <Route
            path="/chatbot"
            element={<ChatbotPage />}
          />
          <Route
            path="/chatbot/:chatRoomId"
            element={<ChatbotPage />}
          />
        </Route>
        </Route>

        {/* ?뚯썝媛???꾩슜 ?덉씠?꾩썐 */}
        <Route
          element={
            <MainLayout
              showRightIcons={false}
              showMenuIcon={false}
            />
          }
        >
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
