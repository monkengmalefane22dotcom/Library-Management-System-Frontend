
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import UsersPage from "./pages/Users";
import Login from "./pages/Login";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import "./App.css";

const API_URL = "http://localhost:5000/api";

function AppContent() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openBookForm, setOpenBookForm] = useState(false);

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [booksResponse, usersResponse, transactionsResponse] =
          await Promise.all([
            fetch(`${API_URL}/books`),
            fetch(`${API_URL}/users`),
            fetch(`${API_URL}/transactions`)
          ]);

        if (
          !booksResponse.ok ||
          !usersResponse.ok ||
          !transactionsResponse.ok
        ) {
          throw new Error("Could not load data from the server.");
        }

        const booksData = await booksResponse.json();
        const usersData = await usersResponse.json();
        const transactionsData = await transactionsResponse.json();

        setBooks(booksData);
        setUsers(usersData);
        setTransactions(transactionsData);

        console.log("Data loaded successfully from MySQL!");
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };

    loadData();
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);

    const paths = {
      Dashboard: "/dashboard",
      Books: "/books",
      Transactions: "/transactions",
      Users: "/users"
    };

    navigate(paths[page]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage("Dashboard");
    setOpenBookForm(false);
    navigate("/");
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }} />;
  }

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        sidebarOpen={sidebarOpen}
        handleLogout={handleLogout}
      />

      <div className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="page-content">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  books={books}
                  users={users}
                  transactions={transactions}
                  onAddBook={() => {
                    setOpenBookForm(true);
                    setActivePage("Books");
                    navigate("/books");
                  }}
                />
              }
            />

            <Route
              path="/books"
              element={
                <Books
                  books={books}
                  setBooks={setBooks}
                  openForm={openBookForm}
                  onFormOpened={() => setOpenBookForm(false)}
                />
              }
            />

            <Route
              path="/transactions"
              element={
                <Transactions
                  books={books}
                  setBooks={setBooks}
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              }
            />

            <Route
              path="/users"
              element={
                <UsersPage
                  users={users}
                  setUsers={setUsers}
                />
              }
            />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
