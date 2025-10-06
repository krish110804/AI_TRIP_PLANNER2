import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./src/config/db.js";

// Import routes
import authRoutes from "./src/routes/auth.routes.js";
import tripsRoutes from "./src/routes/trips.routes.js";

// 🧩 Load environment variables
dotenv.config();

// 🧠 Connect to MongoDB
connectDB();

const app = express();

// 🛡️ Security & Middleware setup
app.use(helmet()); // Adds secure headers
app.use(cors());
app.use(cors());
app.options(/.*/, cors()); // regex version works universally
app.use(express.json({ limit: "10mb" })); // Support larger JSON payloads
app.use(morgan("dev")); // Logs HTTP requests in the console

// 🧭 Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);

// 🌍 Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "✅ Server is running",
    message: "Welcome to AI Trip Planner API",
    docs: "Visit /api/auth or /api/trips for endpoints",
  });
});

// 🧱 Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// 🧨 Global error handler
app.use((err, req, res, next) => {
  console.error("🚨 Server Error:", err.stack);
  res.status(500).json({ msg: "Something went wrong!", error: err.message });
});

// 🚀 Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on port ${PORT} — http://localhost:${PORT}`)
);
