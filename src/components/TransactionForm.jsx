
function TransactionForm({
  books,
  formData,
  onChange,
  onSubmit,
  onCancel
}) {
  return (
    <div className="form-container">
      <div className="form-header">
        <h2>New Transaction</h2>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Transaction Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={onChange}
            required
          >
            <option value="">Select transaction type</option>
            <option value="Borrow">Borrow Book</option>
            <option value="Return">Return Book</option>
            <option value="Add Stock">Add Stock</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Book</label>
          <select
            name="bookId"
            value={formData.bookId}
            onChange={onChange}
            required
          >
            <option value="">Select a book</option>

            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} (Available: {book.quantity})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Member / Staff Name</label>
          <input
            type="text"
            name="person"
            value={formData.person}
            onChange={onChange}
            placeholder="Enter member or staff name"
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={onChange}
            min="1"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className="primary-button">
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
