
import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";

import BookList from "../components/BookList";
import AddBookForm from "../components/AddBookForm";

const API_URL = "http://localhost:5000/api/books";

function Books({ books, setBooks, openForm, onFormOpened }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    title: "",
    author: "",
    genre: "",
    isbn: "",
    quantity: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (openForm) {
      setFormData({ ...emptyForm });
      setEditingId(null);
      setShowForm(true);
      onFormOpened();
    }
  }, [openForm, onFormOpened]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function refreshBooks() {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Could not load books from the database.");
    }

    const data = await response.json();
    setBooks(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.genre.trim() ||
      !formData.isbn.trim() ||
      formData.quantity === ""
    ) {
      alert("Please complete all fields.");
      return;
    }

    const quantity = Number(formData.quantity);

    if (!Number.isInteger(quantity) || quantity < 0) {
      alert("Quantity must be a whole number and cannot be negative.");
      return;
    }

    const bookData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      isbn: formData.isbn.trim(),
      quantity
    };

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
        body: JSON.stringify(bookData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not save the book.");
      }

      await refreshBooks();

      alert(result.message || "Book saved successfully!");

      setFormData({ ...emptyForm });
      setEditingId(null);
      setShowForm(false);

    } catch (error) {
      alert(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(book) {
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      quantity: String(book.quantity)
    });

    setEditingId(book.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not delete the book.");
      }

      await refreshBooks();

      alert(result.message || "Book deleted successfully!");

    } catch (error) {
      alert(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : error.message
      );
    }
  }

  const filteredBooks = books.filter(book =>
    `${book.title} ${book.author} ${book.isbn}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="page-content">
      <div className="page-heading">
        <div>
          <h1>Book Management</h1>
          <p>Add, update, search and manage library books.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setFormData({ ...emptyForm });
            setEditingId(null);
            setShowForm(true);
          }}
        >
          <Plus size={18} />
          Add New Book
        </button>
      </div>

      {showForm && (
        <AddBookForm
          formData={formData}
          editingId={editingId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingId(null);
            setFormData({ ...emptyForm });
          }}
          loading={loading}
        />
      )}

      <div className="books-toolbar">
        <div className="search-box">
          <Search size={18} />

          <input
            placeholder="Search books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <span>{filteredBooks.length} books found</span>
      </div>

      <BookList
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
}

export default Books;
