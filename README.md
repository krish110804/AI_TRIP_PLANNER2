🌍 AI Trip Planner
🚀 Smart Travel Itinerary Generator using OpenAI, Firebase & MERN Stack
🧭 Overview

AI Trip Planner is a full-stack web application that helps users plan trips effortlessly using Artificial Intelligence.
Users can log in (via Email or Google), create trips, and automatically generate personalized itineraries, packing lists, and summaries — all powered by OpenAI GPT models.

✨ Features
Feature	Description
🔐 User Authentication	Login & Signup with JWT authentication
🌐 Google Sign-In	Seamless Firebase-based Google login
🧳 Trip Management	Create, view, and delete custom trips
🤖 AI Itinerary Generator	Automatically generates trip summary, day-wise plan, and packing list
🧠 OpenAI Integration	Uses GPT-4o-mini model for AI-based content
💾 MongoDB Database	Stores user data and trip information securely
🎨 Modern UI	Built with React + TailwindCSS
📱 Responsive Design	Works smoothly across devices
⚙️ Interactive Dashboard	Clean interface for managing all trips
🧱 Tech Stack
Layer	Technologies
Frontend	React.js, TailwindCSS, Axios
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ORM)
Authentication	JWT + Firebase Auth
AI Engine	OpenAI GPT-4o-mini
Deployment	Render (Backend), Netlify/Vercel (Frontend)
📂 Folder Structure
ai-trip-planner/
│
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── trips.controller.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── trip.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── trips.routes.js
│   │   └── middleware/auth.js
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── firebase.js
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
🔸 Prerequisites

Node.js (v18+)

MongoDB

OpenAI API key

Firebase Project (for Google login)

🔹 Backend Setup
cd backend
npm install


Create a .env file in the backend folder:

MONGO_URI=mongodb://localhost:27017/ai-trip-planner
PORT=8000
JWT_SECRET=mysecretkey123
OPENAI_API_KEY=your_openai_api_key_here


Run the backend:

npm run dev


Server will start at:
👉 http://localhost:8000

🔹 Frontend Setup
cd frontend
npm install
npm start


Create a .env file in frontend (if needed):

REACT_APP_BACKEND_URL=http://localhost:8000


Frontend runs at:
👉 http://localhost:3000

🔐 Firebase Configuration

Create a Firebase project from Firebase Console
.
Enable Google Authentication and replace your config in frontend/src/firebase.js.

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

🧠 AI Integration (OpenAI)

In trips.controller.js, AI plans are generated via OpenAI API:

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
});


The response is parsed and saved as:

{
  "summary": "Short summary",
  "itinerary": [
    { "day": 1, "plan": "Arrive and explore the local area" }
  ],
  "packing": ["Sunscreen", "Camera", "Hat"]
}

🌐 Website Pages <img width="1905" height="903" alt="Screenshot 2025-10-06 004851" src="https://github.com/user-attachments/assets/3a8553fa-3719-470d-81cb-73a18bb4eb38" />

Page	Description	Screenshot / Link
🏠 Login Page	User can login using email or Google	[Insert Image / Link Here]
🧾 Signup Page	Create a new account	[Insert Image / Link Here]
📊 Dashboard	View all trips, AI generation & delete feature	[Insert Image / Link Here]
✨ AI Trip Plan	Displays generated itinerary and packing list beautifully	[Insert Image / Link Here]
📸 Screenshots (To Add Later)

🖼 You can add screenshots like this:

### 🏠 Login Page
![Login Page](./screenshots/login.png)

### 📊 Dashboard
![Dashboard](./screenshots/dashboard.png)

🎥 Demo Video

🎬 [Insert video link here once recorded]

🚀 Deployment
Backend

Hosted on Render
Example: https://ai-trip-planner-backend.onrender.com

Frontend

Hosted on Vercel or Netlify
Example: https://ai-trip-planner.netlify.app

💡 Future Improvements

🌎 Add Google Maps integration for location previews

🗺 Allow multi-destination planning

📅 Add calendar-based itinerary view

💾 Enable saving and sharing trip plans

🎙 Voice-assisted trip creation (speech-to-text)

👨‍💻 Author

Developed by: [Your Name]
📧 Email: [Your Email Here]
🌐 GitHub: [Your GitHub Profile]
💼 LinkedIn: [Your LinkedIn Profile]
