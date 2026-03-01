import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  adminBlockUser,
  adminUnblockUser,
  adminDeleteUser,
} from "../redux/admin/adminActions";
import { SET_USERS } from "../redux/admin/adminSlice";
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
    dispatch(
      SET_USER({ _id: "", name: "", email: "", phone: "", photo: "", role: "" })
    );
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white fixed h-full">
        <div className="p-6">
          <h3 className="text-2xl font-bold">Admin Panel</h3>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-3 bg-gray-700">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>Users Management</span>
            </div>
          </div>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Top Bar */}
        <header className="bg-white shadow-md">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Ward Inventory - Admin
            </h2>
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
              {userRole}
            </span>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Management
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-700">No users found</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.isActive ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center gap-2">
                          {user.isActive ? (
                            <button
                              onClick={() => handleOpenDialog(user, "block")}
                              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors"
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => handleOpenDialog(user, "unblock")}
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                            >
                              Unblock
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenDialog(user, "delete")}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Action
            </h3>
            <p className="text-gray-600 mb-6">
              {dialogType === "block"
                ? `Are you sure you want to block ${selectedUser?.name}?`
                : dialogType === "unblock"
                ? `Are you sure you want to unblock ${selectedUser?.name}?`
                : `Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-white rounded-md transition-colors ${
                  dialogType === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {dialogType === "block"
                  ? "Block"
                  : dialogType === "unblock"
                  ? "Unblock"
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
