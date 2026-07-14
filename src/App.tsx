import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ArchivePage from "./pages/ArchivePage";
import ArchiveFolderPage from "./pages/ArchiveFolderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ArchivePage />} />

          <Route
            path="/archive/folder"
            element={<ArchiveFolderPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;