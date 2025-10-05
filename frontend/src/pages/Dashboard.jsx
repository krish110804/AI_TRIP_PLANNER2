import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    pace: "relaxed",
    type: "beach",
    budget: ""
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // 🧭 Fetch all trips for logged-in user
  const fetchTrips = async () => {
    try {
      const res = await api.get("/trips", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(res.data);
    } catch (err) {
      console.error("Error fetching trips:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // 📝 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧳 Create new trip
  const createTrip = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        destinations: [
          { name: form.destination, startDate: form.startDate, endDate: form.endDate }
        ],
        preferences: { pace: form.pace, type: form.type },
        budget: Number(form.budget)
      };

      await api.post("/trips", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setForm({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        pace: "relaxed",
        type: "beach",
        budget: ""
      });

      fetchTrips();
    } catch (err) {
      console.error("Error creating trip:", err);
      alert("❌ Could not create trip. Check console for details.");
    }
  };

  // 🤖 Generate AI plan
  const generateAI = async (id) => {
    try {
      setLoading(true);
      const res = await api.post(`/trips/${id}/generate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ AI Trip Plan generated successfully!");
      fetchTrips();
    } catch (err) {
      console.error("AI generation failed:", err);
      alert("❌ AI generation failed.");
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">
          🌍 AI Trip Planner Dashboard
        </h2>
        <button
          onClick={handleLogout}
          className="bg-black hover:bg-gray-800 text-white font-medium rounded-lg px-4 py-2 transition"
        >
          Logout
        </button>
      </div>

      {/* Trip Form */}
      <form
        onSubmit={createTrip}
        className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-4"
      >
        <h3 className="text-xl font-semibold mb-2">Create a New Trip</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Trip Title"
            value={form.title}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            name="budget"
            placeholder="Budget"
            type="number"
            value={form.budget}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <select
            name="pace"
            value={form.pace}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="relaxed">Relaxed</option>
            <option value="fast">Fast</option>
          </select>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="city">City</option>
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold rounded-lg px-6 py-2"
          >
            Add Trip
          </button>
        </div>
      </form>

      {/* Trip List */}
      <div className="max-w-3xl mx-auto mt-12">
        <h3 className="text-2xl font-semibold mb-4">My Trips</h3>
      
        {trips.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No trips yet. Add one!</p>
        ) : (
          <div className="space-y-6">
            {trips.map((t) => (
              <div
                key={t._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md p-6"
              >
                <h4 className="text-lg font-semibold">{t.title}</h4>
                <p className="text-gray-400">
                  Destination: <span className="text-gray-200">{t.destinations[0]?.name}</span>
                </p>
                <p className="text-gray-400">Budget: ₹{t.budget}</p>
                <p className="text-gray-400">Pace: {t.preferences?.pace}</p>

                <button
                  disabled={loading}
                  onClick={() => generateAI(t._id)}
                  className={`mt-4 px-4 py-2 rounded-lg font-medium transition ${
                    loading
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  {loading ? "Generating..." : "✨ Generate AI Plan"}
                </button>
                
                {t.ai_plan && (
  <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-inner">
    <h5 className="text-2xl font-semibold text-indigo-400 mb-4">
      ✨ AI Trip Plan Summary
    </h5>
    {/* Summary */}
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
      <p className="text-gray-300 leading-relaxed">
        {t.ai_plan.summary}
      </p>
    </div>

    {/* Itinerary */}
    <div>
      <h6 className="text-lg font-semibold text-indigo-300 mb-3">
        🗓️ Itinerary
      </h6>
      <ul className="space-y-3">
        {t.ai_plan.itinerary?.map((day, i) => (
          <li
            key={i}
            className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:bg-gray-850 transition"
          >
            <p className="text-gray-200 font-semibold mb-1">
              Day {day.day}
            </p>
            <p className="text-gray-400 leading-relaxed">{day.plan}</p>
          </li>
        ))}
      </ul>
    </div>

    {/* Packing List */}
    {t.ai_plan.packing && (
      <div className="mt-8">
        <h6 className="text-lg font-semibold text-indigo-300 mb-3">
          🎒 Packing List
        </h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {t.ai_plan.packing.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
