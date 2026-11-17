
import { Pencil, Trash2 } from "lucide-react";

function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td><strong>{book.title}</strong></td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.isbn}</td>
              <td>{book.quantity}</td>
              <td>
                <span className={`status ${
                  book.quantity === 0
                    ? "out-stock"
                    : book.quantity < 2
                    ? "low-stock"
                    : "available"
                }`}>
                  {book.quantity === 0
                    ? "Out of Stock"
                    : book.quantity < 2
                    ? "Low Stock"
                    : "Available"}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => onEdit(book)}
                    title="Edit book"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => onDelete(book.id)}
                    title="Delete book"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {books.length === 0 && (
            <tr>
              <td colSpan="7">No books found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
