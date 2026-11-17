import { Search, Bell, Menu } from "lucide-react";

function Navbar({ setSidebarOpen }) {
  return (
    <header className="topbar">
      <button
        className="menu-button"
        onClick={() => setSidebarOpen((previous) => !previous)}
      >
        <Menu size={22} />
      </button>

      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search books, users..."
        />
      </div>

      <div className="profile">
        <Bell size={20} />

        <div className="avatar">A</div>

        <div>
          <strong>Admin</strong>
          <small>Administrator</small>
        </div>
      </div>
    </header>
  );
}

export default Navbar;