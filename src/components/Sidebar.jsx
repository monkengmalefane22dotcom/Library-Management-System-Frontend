
import {
  LayoutDashboard,
  BookOpen,
  ArrowLeftRight,
  Users,
  LogOut,
  Library
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, handleLogout }) {
  const navigation = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Books", path: "/books", icon: BookOpen },
    { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    { name: "Users", path: "/users", icon: Users }
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>

      <div className="logo">
        <Library size={30} />
        {sidebarOpen && <span>LibraTrack</span>}
      </div>

      <p className="nav-heading">MAIN MENU</p>

      <nav>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-link" onClick={handleLogout}>
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
