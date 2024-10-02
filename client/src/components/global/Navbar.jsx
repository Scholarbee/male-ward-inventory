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
// import {
//   SET_LOGIN,
//   SET_TOKEN,
//   SET_USER,
//   selectIsLoggedIn,
//   selectUser,
// } from "../../redux/auth/authSlice";
// import { logoutUser, registerAgent } from "../../redux/auth/authActions";
// import { Backdrop, Fade, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { logoutUser } from "../../redux/auth/authActions";

// Navbar component definition
function Navbar() {
  // Redux dispatch and navigation hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors called to get the user login status and user information
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const userInfo = useSelector(selectUser);
  const isLoggedIn = true;
  const userInfo = [];

  // State hooks for managing various UI interactions instialized with default values
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
    // dispatch(SET_LOGIN(false)); // Reset login state
    // dispatch(
    //   SET_USER({
    //     // Clear user information
    //     _id: "",
    //     name: "",
    //     email: "",
    //     phone: "",
    //     photo: "",
    //     city: "",
    //     role: "",
    //   })
    // );
    // dispatch(SET_BRAND({ brandName: "", brandLocation: "", brandContact: "" }));
    // dispatch(SET_TOKEN("")); // Clear token
    // navigate("/"); // Redirect to homepage
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
              // letterSpacing: ".2rem",
              color: "#f57eb6",
              textDecoration: "none",
            }}
          >
            Scholars-Tech
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    to={`/`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {"Home"}
                  </Link>
                </Typography>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={`/user/dashboard`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {"Dashboard"}
                    </Link>
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={`/login`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {"Login"}
                    </Link>
                  </Typography>
                </MenuItem>
              )}
              {/* Option to become an agent if the user is logged in */}
              {userInfo.role === "user" && (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    // setOpen(true);
                  }}
                >
                  <Typography textAlign="center">
                    <Link
                      // to={`/user/dashboard`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {"Become Agent"}
                    </Link>
                  </Typography>
                </MenuItem>
              )}
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
              // letterSpacing: ".3rem",
              color: "#f57eb6",
              textDecoration: "none",
            }}
          >
            Scholars-Tech
          </Typography>
          {/* Desktop view navigation buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/");
              }}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              Home
            </Button>
            {isLoggedIn ? (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/user/dashboard");
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/login");
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Login
              </Button>
            )}
            {/* Option to become an agent if the user is logged in */}
            {userInfo.role === "user" && (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  // setOpen(true);
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Become An Agent
              </Button>
            )}
          </Box>

          {/* User settings menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={userInfo.photo} />
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
                    <Link to="/login" style={{ textDecoration: "none" }}>
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

export default Navbar; // Exporting Navbar component

// Modal style object
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
