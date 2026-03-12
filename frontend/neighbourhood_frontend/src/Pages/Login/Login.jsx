import React, { useState } from "react";
import { loginUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(formData);
      console.log(result);

      if (result.data.success) {
        console.log("Login Success");
        const token = result.data.token;
        localStorage.setItem("token", token);

        login(result.data.user, result.data.token);

        if (result.data.user.roles === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }

        // navigate('/home');
      }
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Something went wrong";
      console.log(message);
      alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleOnChange}
          className="border w-full p-2 mb-4 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleOnChange}
          className="border w-full p-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
