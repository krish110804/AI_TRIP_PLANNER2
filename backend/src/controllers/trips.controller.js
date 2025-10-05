import dotenv from "dotenv";
dotenv.config();
import Trip from "../models/trip.model.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🟢 Create a new trip
export const createTrip = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user.id,
      ai_plan: null, // will be generated later
    };

    const trip = await Trip.create(payload);
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🟡 Get all trips for a user
export const getTrips = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sort = "-createdAt" } = req.query;
    const query = { userId: req.user.id };

    if (search) query.title = { $regex: search, $options: "i" };

    const trips = await Trip.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(trips);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🟣 Get a single trip
export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
    if (!trip) return res.status(404).json({ msg: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🟠 Update trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!trip) return res.status(404).json({ msg: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔴 Delete trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!trip) return res.status(404).json({ msg: "Trip not found" });
    res.json({ msg: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🤖 Generate AI Trip Plan (OpenAI Integration)
export const generateAIForTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!trip) return res.status(404).json({ msg: "Trip not found" });

    // 🧠 Build the AI prompt
    const prompt = `
You are an AI travel planner.
Create a personalized travel itinerary for this trip:
- Title: ${trip.title}
- Destination: ${trip.destinations[0]?.name}
- Dates: ${trip.destinations[0]?.startDate} to ${trip.destinations[0]?.endDate}
- Budget: $${trip.budget}
- Travel style: ${trip.preferences.pace}, ${trip.preferences.type}

Return your response in **valid JSON format** like this:
{
  "summary": "Short summary of the trip",
  "itinerary": [
    { "day": 1, "plan": "..." },
    { "day": 2, "plan": "..." }
  ],
  "packing": ["item1", "item2"]
}
`;

    // ✨ Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    let aiResponse = completion.choices[0].message.content;

    // Try to parse JSON safely
    let parsedPlan;
    try {
      parsedPlan = JSON.parse(aiResponse);
    } catch {
      parsedPlan = { summary: aiResponse, itinerary: [], packing: [] };
    }

    // 💾 Save the generated plan
    trip.ai_plan = parsedPlan;
    await trip.save();

    res.json({
      msg: "AI trip plan generated successfully",
      ai_plan: parsedPlan,
      trip,
    });
  } catch (err) {
    console.error("AI generation failed:", err);
    res.status(500).json({ msg: "AI generation failed", error: err.message });
  }
};
