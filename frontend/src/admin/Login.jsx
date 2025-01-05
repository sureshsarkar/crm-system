import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.post("/api/auth/login", inputs);

      if (data.success) {
          toast.success("Login Successful!");
          const now = new Date();
          const item = {
            value: data.token,
            expiry: now.getTime() + 15 * 24 * 60 * 60 * 1000,  // Expiry time in milliseconds
          };
          localStorage.setItem("user", JSON.stringify(item));
          navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <main className='main-container'>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto card p-4">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
