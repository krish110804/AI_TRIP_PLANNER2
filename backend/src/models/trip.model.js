import mongoose from "mongoose";

const destSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  notes: String
}, { _id: false });

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  destinations: [destSchema],
  preferences: { type: Object, default: {} }, // e.g., { pace: 'relaxed', budget: 'moderate' }
  budget: Number,
  days: Number,
  ai_plan: { type: Object, default: null }, // store AI-generated plan (summary, itinerary, packing)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Trip", tripSchema);
