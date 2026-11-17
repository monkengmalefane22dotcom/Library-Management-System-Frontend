
import { X } from "lucide-react";

function UserForm({
  formData,
  editingId,
  onChange,
  onSubmit,
  onCancel
}) {
  return (
    <div className="book-form-container">
      <div className="form-heading">
        <h2>{editingId !== null ? "Update User" : "Add New User"}</h2>

        <button
          type="button"
          className="close-button"
          onClick={onCancel}
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-grid">

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Membership ID</label>
            <input
              type="text"
              name="membershipId"
              value={formData.membershipId}
              onChange={onChange}
              placeholder="Enter membership ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={onChange}
              required
            >
              <option value="">Select role</option>
              <option value="Member">Member</option>
              <option value="Librarian">Librarian</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button type="submit" className="primary-button">
            {editingId !== null ? "Update User" : "Save User"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
