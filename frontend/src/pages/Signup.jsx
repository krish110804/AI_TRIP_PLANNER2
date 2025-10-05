// import { useState } from "react";
// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/auth/signup", form);
//       alert("Signup successful! Please log in.");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Signup failed");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-80">
//         <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//         <form onSubmit={handleSubmit} className="flex flex-col">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             className="mb-3 p-2 border rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="mb-3 p-2 border rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Signup
//           </button>
//         </form>
//         <p className="text-sm mt-4 text-center">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
