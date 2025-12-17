import React, { useState, useRef } from "react";
import { FaGoogle, FaFacebookF, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { errorHandler } from "../../utils/errorHandler";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { ForgotPasswordLink } from "../../component/ForgotPasswordLink/ForgotPasswordLink";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

 

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const response = await api.post("/api/v1/auth/login", data);
      dispatch(setUser(response.data.user));
      // Save token to localStorage
      localStorage.setItem("token", response.data.token);


      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  }


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3 bg-light">
      <div
        className="bg-white shadow rounded p-5"
        style={{ maxWidth: "620px", width: "100%", borderRadius: "16px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary" style={{ fontSize: "2rem" }}>
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold fs-5">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your email"
              required
              autoComplete="email"
              ref={emailRef}
              style={{ fontSize: "1rem" }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold fs-5">
              Password
            </label>
            <div className="input-group rounded-3 shadow-sm overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control form-control-lg border-end-0"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                ref={passwordRef}
                style={{ fontSize: "1rem" }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary border-start-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{ width: "56px" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-3 fw-semibold fs-5 shadow"
            style={{ letterSpacing: "0.05em" }}
          >
            LOGIN
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4 mb-3" style={{ fontSize: "0.9rem" }}>
          <Link to="/forgot-password" className="text-decoration-none text-primary fw-semibold">
            Forgot Password?
          </Link>
        </div>

        <p className="text-center text-muted mb-3 fw-semibold fs-6">Or login with</p>

        {/* Social Login */}
        <div className="d-flex justify-content-center gap-4 fs-4 text-muted">
          {[{ icon: <FaGoogle />, label: "Google" }, { icon: <FaFacebookF />, label: "Facebook" }, { icon: <FaTwitter />, label: "Twitter" }].map(({ icon, label }) => (
            <div
              key={label}
              className="social-icon"
              title={label}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer", color: "#777", userSelect: "none", transition: "color 0.3s" }}
              onClick={() => alert(`Login with ${label} coming soon!`)}
              onKeyDown={(e) => { if (e.key === 'Enter') alert(`Login with ${label} coming soon!`) }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0d6efd")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Signup Link */}
        <p className="text-center mt-4 fs-5">
          Don't have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/register")}
            style={{ textDecoration: "underline" }}
            // aria-label="Sign up"
          >
            Sign Up
          </button>
        </p>

        {/* Inline CSS for hover */}
        <style>{`
          .social-icon:hover {
            color: #0d6efd !important;
          }
        `}</style>
      </div>
    </div>
  );
}
