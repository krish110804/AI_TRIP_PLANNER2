import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  generateAIForTrip  // 👈 make sure this matches the controller export name
} from "../controllers/trips.controller.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// CRUD routes
router.post("/", createTrip);
router.get("/", getTrips);
router.get("/:id", getTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

// AI route (POST /api/trips/:id/generate)
router.post("/:id/generate", generateAIForTrip);

export default router;
