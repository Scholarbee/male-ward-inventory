import { Routes, Route, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import WardFund from "./pages/WardFund";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./services/AdminRoute";
import UserRoute from "./services/UserRoute";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <UserRoute>
                <Home />
              </UserRoute>
            }
          />
          <Route
            path="/ward-fund"
            element={
              <UserRoute>
                <WardFund />
              </UserRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
