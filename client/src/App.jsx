import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import WardFund from "./pages/WardFund";

function App() {
  return (
    <>
      <HashRouter>
        {/* <ToastContainer /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ward-fund" element={<WardFund />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
