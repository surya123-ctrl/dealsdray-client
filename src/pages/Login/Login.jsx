import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
const Login = () => {
  const loggedInDetails = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      loggedInDetails.setIsLoggedIn(response.data.token);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/employee-details");
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log(formData);
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
