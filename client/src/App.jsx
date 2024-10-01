import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import { Home } from "@mui/icons-material";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <>
      <HashRouter>
        {/* <ToastContainer /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/profile" element={<MyProfileHOC />} />
          <Route path="/report-bug" element={<ReportBugHOC />} />
          <Route path="/report-bug" element={<ReportBugHOC />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:tk" element={<ResetPassword />} /> */}
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
