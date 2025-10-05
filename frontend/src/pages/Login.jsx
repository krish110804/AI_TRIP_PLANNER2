import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Login Function
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send Google user info to backend
      const res = await API.post("/auth/google", {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="px-2 text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded text-white font-semibold flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        {/* <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
        </p> */}
      </div>
    </div>
  );
}
