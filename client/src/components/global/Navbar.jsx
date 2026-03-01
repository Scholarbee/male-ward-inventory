// Importing necessary dependencies from React, React Router, and Redux
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_USER } from "../../redux/auth/authSlice";
import { logoutUser } from "../../redux/auth/authActions";

// Navbar component definition
function Navbar() {
  // Redux dispatch and navigation hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const userInfo = useSelector((state) => state.auth?.user);

  // State hooks for managing various UI interactions
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Function to log out the user
  const logOutUser = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    dispatch(
      SET_USER({
        _id: "",
        name: "",
        email: "",
        phone: "",
        photo: "",
        role: "",
      })
    );
    navigate("/");
    setUserMenuOpen(false);
  };

  return (
    <nav className="bg-[rgb(38,38,38)] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and brand */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <img
                src="/logo.png"
                alt="logo"
                className="h-16 w-16 rounded-full hidden lg:block"
              />
              <span className="text-secondary font-mono font-bold text-xl md:text-2xl">
                Male Ward Inventory
              </span>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && userInfo?.role === "admin" && (
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="text-white hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin Dashboard
              </button>
            )}
            <button
              onClick={() => navigate("/home")}
              className="text-white hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/ward-fund")}
              className="text-white hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Ward Fund
            </button>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* User avatar dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={userInfo?.photo || "/default-avatar.png"}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border-2 border-secondary"
                />
              </button>

              {/* Dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/change-password"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Change Password
                  </Link>
                  {isLoggedIn ? (
                    <button
                      onClick={logOutUser}
                      className="block w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  ) : (
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn && userInfo?.role === "admin" && (
              <button
                onClick={() => {
                  navigate("/admin-dashboard");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              >
                Admin Dashboard
              </button>
            )}
            <button
              onClick={() => {
                navigate("/home");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/ward-fund");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md"
            >
              Ward Fund
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
