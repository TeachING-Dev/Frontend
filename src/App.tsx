import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ArchivePage from "./pages/ArchivePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ArchivePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;