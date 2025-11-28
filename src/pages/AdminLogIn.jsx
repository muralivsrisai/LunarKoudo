import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://lunarkoudobackend.onrender.com/api/admin/login", {
        username,
        password
      });

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
