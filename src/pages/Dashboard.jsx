
import {
  BookOpen,
  TrendingUp,
  UserRound,
  BookMarked,
  AlertTriangle
} from "lucide-react";

import StatCard from "../components/StatCard";

function Dashboard({ books = [], users = [], transactions = [], onAddBook }) {

  // Calculate total available copies
  const availableBooks = books.reduce(
    (total, book) => total + Number(book.quantity),
    0
  );

  // Calculate currently borrowed copies
  const borrowedBooks = transactions.reduce((total, transaction) => {
    if (transaction.type === "Borrow") {
      return total + Number(transaction.quantity);
    }

    if (transaction.type === "Return") {
      return total - Number(transaction.quantity);
    }

    return total;
  }, 0);

  const stats = [
    {
      title: "Total Books",
      value: books.length,
      icon: BookMarked
    },
    {
      title: "Available Books",
      value: availableBooks,
      icon: BookOpen
    },
    {
      title: "Borrowed Books",
      value: Math.max(0, borrowedBooks),
      icon: TrendingUp
    },
    {
      title: "Registered Users",
      value: users.length,
      icon: UserRound
    }
  ];

  // Identify book stock status
  const getBookStatus = (quantity) => {
    if (Number(quantity) === 0) return "Out of Stock";
    if (Number(quantity) < 2) return "Low Stock";
    return "Available";
  };

  // Find books with fewer than 2 copies
  const lowStockBooks = books.filter(
    (book) => Number(book.quantity) < 2
  );

  return (
    <section className="page-content">

      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening in your library.</p>
        </div>

        <button className="primary-button" onClick={onAddBook}>
          + Add New Book
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value.toLocaleString()}
            icon={stat.icon}
            color="#198754"
          />
        ))}
      </div>

      <div className="section-heading">
        <div>
          <h2>Book Availability</h2>
          <p>Overview of books currently in your library</p>
        </div>
      </div>

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
            </tr>
          </thead>

          <tbody>
            {books.length > 0 ? (
              books.map((book) => {
                const status = getBookStatus(book.quantity);

                return (
                  <tr key={book.id}>
                    <td><strong>{book.title}</strong></td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <span
                        className={`status ${
                          status === "Available"
                            ? "available"
                            : status === "Low Stock"
                            ? "low-stock"
                            : "out-stock"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">No books found. Add your first book!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="low-stock-notice">
        <AlertTriangle size={21} />

        <div>
          <strong>Low Stock Alert</strong>

          {lowStockBooks.length > 0 ? (
            lowStockBooks.map((book) => (
              <p key={book.id}>
                {book.title} has only {book.quantity} copies remaining.
              </p>
            ))
          ) : (
            <p>There are currently no low-stock books.</p>
          )}
        </div>
      </div>

    </section>
  );
}

export default Dashboard;
