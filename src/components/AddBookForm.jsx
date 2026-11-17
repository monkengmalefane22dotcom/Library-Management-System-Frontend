
import { X } from "lucide-react";

function AddBookForm({
  formData,
  editingId,
  onChange,
  onSubmit,
  onCancel
}) {
  return (
    <div className="book-form-container">
      <div className="form-heading">
        <h2>{editingId !== null ? "Update Book" : "Add New Book"}</h2>

        <button
          className="close-button"
          type="button"
          onClick={onCancel}
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-grid">

          <div className="form-group">
            <label>Book Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              name="author"
              value={formData.author}
              onChange={onChange}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="form-group">
            <label>Genre</label>
            <input
              name="genre"
              value={formData.genre}
              onChange={onChange}
              placeholder="Enter genre"
              required
            />
          </div>

          <div className="form-group">
            <label>ISBN</label>
            <input
              name="isbn"
              value={formData.isbn}
              onChange={onChange}
              placeholder="Enter ISBN"
              required
            />
          </div>

          <div className="form-group">
            <label>Initial Quantity</label>
            <input
              type="number"
              name="quantity"
              min="0"
              step="1"
              value={formData.quantity}
              onChange={onChange}
              placeholder="Enter quantity"
              required
            />
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
            {editingId !== null ? "Update Book" : "Save Book"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBookForm;
