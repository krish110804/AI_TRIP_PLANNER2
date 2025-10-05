export const generateTripPlan = async (input) => {
  // For now return deterministic mock — replace later with Gemini/OpenAI call
  return {
    summary: "3-day city trip with highlights and travel tips.",
    itinerary: [
      { day: 1, plan: "Arrive, museum, dinner" },
      { day: 2, plan: "City tour, local market" },
      { day: 3, plan: "Relax, departure" }
    ],
    packing: ["passport", "charger", "comfortable shoes"]
  };
};
