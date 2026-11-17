
import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import UserForm from "../components/UserForm";

const API_URL = "http://localhost:5000/api/users";

function Users({ users, setUsers }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    name: "",
    membershipId: "",
    role: "Member"
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({ ...emptyForm });
    setEditingId(null);
    setShowForm(false);
  };

  async function refreshUsers() {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Could not load users from the database.");
    }

    const data = await response.json();
    setUsers(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = formData.name.trim();
    const membershipId = formData.membershipId.trim();

    if (!name || !membershipId) {
      alert("Please complete all required fields.");
      return;
    }

    const validRoles = ["Member", "Librarian", "Admin"];

    if (!validRoles.includes(formData.role)) {
      alert("Please select a valid user role.");
      return;
    }

    const duplicate = users.some(
      (user) =>
        user.membershipId.toLowerCase() === membershipId.toLowerCase() &&
        user.id !== editingId
    );

    if (duplicate) {
      alert("This membership ID already exists. Please use another one.");
      return;
    }

    try {
      setLoading(true);

      const url =
        editingId !== null
          ? `${API_URL}/${editingId}`
          : API_URL;

      const response = await fetch(url, {
        method: editingId !== null ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          membershipId,
          role: formData.role
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not save user.");
      }

      await refreshUsers();

      alert(result.message || "User saved successfully!");
      resetForm();

    } catch (error) {
      alert(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      membershipId: user.membershipId,
      role: user.role
    });

    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not delete user.");
      }

      await refreshUsers();

      alert(result.message || "User deleted successfully!");

    } catch (error) {
      alert(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : error.message
      );
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.membershipId} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-content">

      <div className="page-heading">
        <div>
          <h1>User Management</h1>
          <p>Register and manage library members and staff.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          disabled={loading}
        >
          <Plus size={18} />
          Add New User
        </button>
      </div>

      {showForm && (
        <UserForm
          formData={formData}
          editingId={editingId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          loading={loading}
        />
      )}

      <div className="books-toolbar">
        <div className="search-box">
          <Search size={18} />

          <input
            placeholder="Search users by name, ID or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Membership ID</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.membershipId}</td>
                  <td>{user.role}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(user)}
                        title="Edit user"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(user.id)}
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Users;
