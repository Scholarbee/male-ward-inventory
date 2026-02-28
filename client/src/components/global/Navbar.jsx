// Importing necessary dependencies from React, Material UI, React Router, and Redux
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_USER } from "../../redux/auth/authSlice";
import { logoutUser } from "../../redux/auth/authActions";
import { useState } from "react";

// Navbar component definition
function Navbar() {
  // Redux dispatch and navigation hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const userInfo = useSelector((state) => state.auth?.user);

  // State hooks for managing various UI interactions
  const [anchorElNav, setAnchorElNav] = useState(null); // For navigation menu
  const [anchorElUser, setAnchorElUser] = useState(null); // For user menu

  // Handlers for opening and closing menus
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

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
  };

  // Navbar component JSX structure
  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(38, 38, 38)" }}>
      <Container>
        <Toolbar disableGutters>
          {/* Logo Button - Redirects to home */}
          <Button
            onClick={() => navigate("/")}
            sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
          >
            <Avatar alt="logo" src="/logo.png" sx={{ width: 70, height: 70 }} />
          </Button>
          {/* Brand name - Visible on medium and larger screens */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#f57eb6",
              textDecoration: "none",
            }}
          >
            Male Ward Inventory
          </Typography>

          {/* Navigation menu - Visible on small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* Navigation links */}
              {isLoggedIn && userInfo?.role === "admin" && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={`/admin-dashboard`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Admin Dashboard
                    </Link>
                  </Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    to={`/home`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    to={`/ward-fund`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Ward Fund
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Brand name - Visible on mobile screens */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#f57eb6",
              textDecoration: "none",
            }}
          >
            Male Ward
          </Typography>

          {/* Desktop view navigation buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isLoggedIn && userInfo?.role === "admin" && (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/admin-dashboard");
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Admin Dashboard
              </Button>
            )}
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/home");
              }}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/ward-fund");
              }}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              Ward Fund
            </Button>
          </Box>

          {/* User settings menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={userInfo?.photo} />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: "45px" }}
            >
              {/* User account options */}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    Profile
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    to="/change-password"
                    style={{ textDecoration: "none" }}
                  >
                    Change Password
                  </Link>
                </Typography>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={logOutUser}>
                  <Typography textAlign="center" color="#8e67b2">
                    Log Out
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Login
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
