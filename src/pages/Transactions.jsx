
import { useState } from "react";
import { Plus, Search } from "lucide-react";

import TransactionForm from "../components/TransactionForm";
import TransactionHistory from "../components/TransactionHistory";
import StockTable from "../components/StockTable";

const API_URL = "http://localhost:5000/api";

function Transactions({ books, setBooks, transactions, setTransactions }) {
  const [form, setForm] = useState({
    bookId: "",
    type: "Borrow",
    quantity: 1,
    person: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const resetForm = () => {
    setForm({
      bookId: "",
      type: "Borrow",
      quantity: 1,
      person: ""
    });

    setShowForm(false);
  };

  // Refresh books and transactions from MySQL
  const refreshData = async () => {
    const [booksResponse, transactionsResponse] = await Promise.all([
      fetch(`${API_URL}/books`),
      fetch(`${API_URL}/transactions`)
    ]);

    if (!booksResponse.ok || !transactionsResponse.ok) {
      throw new Error("Could not refresh data from the database.");
    }

    const booksData = await booksResponse.json();
    const transactionsData = await transactionsResponse.json();

    setBooks(booksData);
    setTransactions(transactionsData);
  };

  // Save a transaction in MySQL
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const selectedBook = books.find(
      (book) => book.id === Number(form.bookId)
    );

    const quantity = Number(form.quantity);
    const memberName = form.person.trim();

    if (!selectedBook) {
      alert("Please select a book.");
      return;
    }

    if (!memberName) {
      alert("Please enter the member or staff name.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      alert("Quantity must be a whole number greater than zero.");
      return;
    }

    const validTypes = ["Borrow", "Return", "Add Stock"];

    if (!validTypes.includes(form.type)) {
      alert("Please select a valid transaction type.");
      return;
    }

    // Check available stock before borrowing
    if (
      form.type === "Borrow" &&
      quantity > Number(selectedBook.quantity)
    ) {
      alert(
        `Only ${selectedBook.quantity} copies are available.`
      );
      return;
    }

    // Check how many copies this member has borrowed
    if (form.type === "Return") {
      const borrowedCopies = transactions
        .filter(
          (transaction) =>
            Number(transaction.bookId) === Number(selectedBook.id) &&
            transaction.memberName.toLowerCase() === memberName.toLowerCase() &&
            transaction.type === "Borrow"
        )
        .reduce(
          (total, transaction) => total + Number(transaction.quantity),
          0
        );

      const returnedCopies = transactions
        .filter(
          (transaction) =>
            Number(transaction.bookId) === Number(selectedBook.id) &&
            transaction.memberName.toLowerCase() === memberName.toLowerCase() &&
            transaction.type === "Return"
        )
        .reduce(
          (total, transaction) => total + Number(transaction.quantity),
          0
        );

      const outstandingCopies = borrowedCopies - returnedCopies;

      if (quantity > outstandingCopies) {
        alert(
          `This member only has ${outstandingCopies} borrowed copies to return.`
        );
        return;
      }
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookId: selectedBook.id,
          memberName,
          type: form.type,
          quantity
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not save transaction.");
      }

      await refreshData();

      alert(result.message || "Transaction saved successfully!");
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

  const filteredTransactions = transactions.filter((transaction) =>
    `${transaction.bookTitle} ${transaction.memberName} ${transaction.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-content">

      <div className="page-heading">
        <div>
          <h1>Transactions</h1>
          <p>Manage book borrowing, returns and stock.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <Plus size={18} /> New Transaction
        </button>
      </div>

      {showForm && (
        <TransactionForm
          books={books}
          formData={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      <div className="books-toolbar">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <TransactionHistory transactions={filteredTransactions} />

      <h2 className="section-title">Current Book Stock</h2>

      <StockTable books={books} />

    </div>
  );
}

export default Transactions;
