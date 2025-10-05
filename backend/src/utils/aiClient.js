import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateTripPlan({ title, destinations, preferences, budget }) {
  const prompt = `
You are a friendly AI travel planner.

Create a JSON response with this structure:
{
  "summary": "short summary of trip",
  "itinerary": [
    {"day": 1, "plan": "Day 1 plan"},
    {"day": 2, "plan": "Day 2 plan"}
  ],
  "packing": ["item1", "item2", "item3"]
}

Trip details:
- Title: ${title}
- Destinations: ${JSON.stringify(destinations)}
- Preferences: ${JSON.stringify(preferences)}
- Budget: $${budget}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Try to parse JSON safely
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ AI response not in JSON:", text);
    return { summary: text, itinerary: [], packing: [] };
  }
}
