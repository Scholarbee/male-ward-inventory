import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  CircularProgress,
  Alert,
  Toolbar,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  getUsers,
  adminBlockUser,
  adminUnblockUser,
  adminDeleteUser,
} from "../redux/admin/adminActions";
import { SET_USERS } from "../redux/admin/adminSlice";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/auth/authActions";
import { SET_LOGIN, SET_USER } from "../redux/auth/authSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.admin?.users || []);
  const isLoading = useSelector((state) => state.admin?.isLoading);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const userRole = useSelector((state) => state.auth?.user?.role);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    if (data && data.users) {
      dispatch(SET_USERS(data.users));
    }
  };

  const handleOpenDialog = (user, type) => {
    setSelectedUser(user);
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setDialogType("");
  };

  const handleConfirmAction = async () => {
    if (!selectedUser) return;

    try {
      if (dialogType === "block") {
        await adminBlockUser(selectedUser._id);
      } else if (dialogType === "unblock") {
        await adminUnblockUser(selectedUser._id);
      } else if (dialogType === "delete") {
        await adminDeleteUser(selectedUser._id);
      }
      handleCloseDialog();
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    dispatch(SET_USER({ _id: "", name: "", email: "", phone: "", photo: "", role: "" }));
    navigate("/");
  };

  const getActionButtons = (user) => {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        {user.isActive ? (
          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={() => handleOpenDialog(user, "block")}
          >
            Block
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => handleOpenDialog(user, "unblock")}
          >
            Unblock
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => handleOpenDialog(user, "delete")}
        >
          Delete
        </Button>
      </Box>
    );
  };

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Toolbar>
        <h3>Admin Panel</h3>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users Management" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <h2 style={{ margin: 0, flex: 1 }}>Ward Inventory - Admin</h2>
          <span>{userRole}</span>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            marginTop: 8,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: 8,
          marginLeft: { xs: 0, sm: 250 },
        }}
      >
        <Container maxWidth="lg">
          <h1>User Management</h1>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : users.length === 0 ? (
            <Alert severity="info">No users found</Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Phone</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Role</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{
                        "&:hover": { backgroundColor: "#fafafa" },
                      }}
                    >
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || "N/A"}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={user.role === "admin" ? "primary" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? "Active" : "Blocked"}
                          color={user.isActive ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {getActionButtons(user)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogType === "block"
              ? `Are you sure you want to block ${selectedUser?.name}?`
              : dialogType === "unblock"
              ? `Are you sure you want to unblock ${selectedUser?.name}?`
              : `Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmAction}
            autoFocus
            variant="contained"
            color={dialogType === "delete" ? "error" : "primary"}
          >
            {dialogType === "block"
              ? "Block"
              : dialogType === "unblock"
              ? "Unblock"
              : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboard;
