
function StockTable({ books }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Available Copies</th>
            <th>Stock Status</th>
          </tr>
        </thead>

        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.quantity}</td>
                <td>
                  <span
                    className={`status ${
                      book.quantity === 0
                        ? "out-stock"
                        : book.quantity < 2
                        ? "low-stock"
                        : "available"
                    }`}
                  >
                    {book.quantity === 0
                      ? "Out of Stock"
                      : book.quantity < 2
                      ? "Low Stock"
                      : "Available"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No books available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
