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
    budget: "",
  });
  const [loadingTripId, setLoadingTripId] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [openTripId, setOpenTripId] = useState(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const token = localStorage.getItem("token");

  // 🧭 Fetch all trips for logged-in user
  const fetchTrips = async () => {
    try {
      const res = await api.get("/trips", {
        headers: { Authorization: `Bearer ${token}` },
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
          {
            name: form.destination,
            startDate: form.startDate,
            endDate: form.endDate,
          },
        ],
        preferences: { pace: form.pace, type: form.type },
        budget: Number(form.budget),
      };

      await api.post("/trips", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        pace: "relaxed",
        type: "beach",
        budget: "",
      });

      setMessage("✅ Trip created successfully!");
      setTimeout(() => setMessage(""), 3000);
      fetchTrips();
    } catch (err) {
      console.error("Error creating trip:", err);
      setMessage("❌ Could not create trip.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // ✨ Open Custom Prompt Modal
  const openPromptModal = (id) => {
    setSelectedTrip(id);
    setShowPromptModal(true);
  };

  // 🤖 Generate AI with Custom Prompt
  const handleGenerateWithPrompt = async () => {
    if (!selectedTrip) return;

    try {
      setLoadingTripId(selectedTrip);
      await api.post(
        `/trips/${selectedTrip}/generate`,
        { prompt: customPrompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✨ Custom AI Trip Plan generated successfully!");
      setTimeout(() => setMessage(""), 3000);
      setShowPromptModal(false);
      setCustomPrompt("");
      fetchTrips();
    } catch (err) {
      console.error("AI generation failed:", err);
      setMessage("❌ AI generation failed.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoadingTripId(null);
    }
  };

  // 🚮 Confirm delete
  const confirmDelete = (id) => {
    setTripToDelete(id);
    setShowModal(true);
  };

  // ❌ Delete trip
  const deleteTrip = async () => {
    try {
      await api.delete(`/trips/${tripToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑 Trip deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
      setShowModal(false);
      setTripToDelete(null);
      fetchTrips();
    } catch (err) {
      console.error("Error deleting trip:", err);
      setMessage("❌ Failed to delete trip.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // 🧩 Toggle view plan
  const toggleTripPlan = (id) => {
    setOpenTripId(openTripId === id ? null : id);
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 relative">
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

      {/* Notifications */}
      {message && (
        <div className="mb-6 text-center">
          <p className="inline-block bg-indigo-700/20 border border-indigo-600 text-indigo-300 rounded-lg px-4 py-2">
            {message}
          </p>
        </div>
      )}

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
          <p className="text-gray-400 text-center py-8">
            No trips yet. Add one!
          </p>
        ) : (
          <div className="space-y-6">
            {trips.map((t) => (
              <div
                key={t._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md p-6 hover:shadow-indigo-900/40 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold">{t.title}</h4>
                    <p className="text-gray-400">
                      Destination:{" "}
                      <span className="text-gray-200">
                        {t.destinations[0]?.name}
                      </span>
                    </p>
                    <p className="text-gray-400">Budget: ₹{t.budget}</p>
                    <p className="text-gray-400">Pace: {t.preferences?.pace}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      disabled={loadingTripId === t._id}
                      onClick={() => openPromptModal(t._id)}
                      className={`px-3 py-2 rounded-lg font-medium transition ${
                        loadingTripId === t._id
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-500"
                      }`}
                    >
                      {loadingTripId === t._id
                        ? "Generating..."
                        : "✨ Customize AI"}
                    </button>

                    <button
                      onClick={() => confirmDelete(t._id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition"
                    >
                      🗑 Delete
                    </button>

                    {t.ai_plan && (
                      <button
                        onClick={() => toggleTripPlan(t._id)}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition"
                      >
                        {openTripId === t._id ? "Hide Plan" : "View Plan"}
                      </button>
                    )}
                  </div>
                </div>

                {openTripId === t._id && t.ai_plan && (
                  <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-300 ease-in-out">
                    <h5 className="text-2xl font-semibold text-indigo-400 mb-3">
                      ✨ {t.title} - AI Trip Plan
                    </h5>

                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
                      <p className="text-gray-300 leading-relaxed">
                        {t.ai_plan.summary}
                      </p>
                    </div>

                    {t.ai_plan.itinerary?.length > 0 && (
                      <div>
                        <h6 className="text-lg font-semibold text-indigo-300 mb-3">
                          🗓️ Itinerary
                        </h6>
                        <ul className="space-y-3">
                          {t.ai_plan.itinerary.map((day, i) => (
                            <li
                              key={i}
                              className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:bg-gray-850 transition"
                            >
                              <p className="text-gray-200 font-semibold mb-1">
                                Day {day.day}
                              </p>
                              <p className="text-gray-400 leading-relaxed">
                                {day.plan}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {t.ai_plan.packing?.length > 0 && (
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

      {/* 🧊 Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 text-center max-w-sm w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to permanently delete this trip? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-5 py-2 transition"
              >
                Cancel
              </button>
              <button
                onClick={deleteTrip}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-5 py-2 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💬 Custom AI Prompt Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-lg w-full text-center">
            <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
              Customize AI Trip Plan
            </h3>
            <p className="text-gray-400 mb-4">
              Add your preferences (e.g., “make it adventurous and affordable”)
            </p>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Type your custom travel preferences here..."
              rows="4"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPromptModal(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-5 py-2 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateWithPrompt}
                disabled={loadingTripId === selectedTrip}
                className={`px-5 py-2 rounded-lg font-medium text-white transition ${
                  loadingTripId === selectedTrip
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {loadingTripId === selectedTrip ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
