
import { useState } from "react";
import { Library, Lock, User, Eye, EyeOff } from "lucide-react";

function Login({ onLogin }) {
  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!membershipId.trim() || !password.trim()) {
      alert("Please enter your membership ID and password.");
      return;
    }

    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <Library size={38} />
        </div>

        <h1>Welcome Back</h1>
        <p>Sign in to access the Library Management System.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Membership ID</label>
            <div className="login-input">
              <User size={18} />
              <input
                type="text"
                placeholder="Enter your membership ID"
                value={membershipId}
                onChange={(e) => setMembershipId(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="login-input">
              <Lock size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          Library Management System
        </div>
      </div>
    </div>
  );
}

export default Login;
