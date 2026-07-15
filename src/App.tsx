import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ArchivePage from "./pages/ArchivePage";
import ArchiveFolderPage from "./pages/ArchiveFolderPage";
import ArchiveDataPage from "./pages/ArchiveDataPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;