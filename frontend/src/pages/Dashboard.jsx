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
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>🌍 AI Trip Planner Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{ float: "right", background: "black", color: "white", borderRadius: "6px", padding: "6px 12px" }}
      >
        Logout
      </button>

      {/* Trip Form */}
      <form onSubmit={createTrip} style={{ marginTop: "50px" }}>
        <input
          name="title"
          placeholder="Trip Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <input
          name="budget"
          placeholder="Budget"
          type="number"
          value={form.budget}
          onChange={handleChange}
          required
        />
        <select name="pace" value={form.pace} onChange={handleChange}>
          <option value="relaxed">Relaxed</option>
          <option value="fast">Fast</option>
        </select>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="beach">Beach</option>
          <option value="mountain">Mountain</option>
          <option value="city">City</option>
        </select>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Add Trip
        </button>
      </form>

      {/* Trip List */}
      <h3 style={{ marginTop: "40px" }}>My Trips</h3>
      {trips.length === 0 ? (
        <p>No trips yet. Add one!</p>
      ) : (
        trips.map((t) => (
          <div
            key={t._id}
            style={{
              border: "1px solid gray",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              background: "#111",
              color: "#eee"
            }}
          >
            <h4>{t.title}</h4>
            <p>Destination: {t.destinations[0]?.name}</p>
            <p>Budget: ${t.budget}</p>
            <p>Pace: {t.preferences?.pace}</p>
            <button
              disabled={loading}
              onClick={() => generateAI(t._id)}
              style={{
                marginTop: "5px",
                background: "#333",
                color: "#fff",
                borderRadius: "6px",
                padding: "5px 10px"
              }}
            >
              {loading ? "Generating..." : "✨ Generate AI Plan"}
            </button>

            {t.ai_plan && (
              <div
                style={{
                  marginTop: "10px",
                  background: "#222",
                  color: "#eee",
                  padding: "10px",
                  borderRadius: "6px"
                }}
              >
                <h5>AI Plan Summary:</h5>
                <p>{t.ai_plan.summary}</p>
                <ul>
                  {t.ai_plan.itinerary?.map((day, i) => (
                    <li key={i}>
                      Day {day.day}: {day.plan}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
