# 🌍 AI Trip Planner — Intelligent Travel Itinerary Generator  

> ✨ “Plan smarter, travel better — powered by OpenAI & Firebase.”

---

## 🧭 Overview  
**AI Trip Planner** is a full-stack web application that automatically creates personalized travel plans using **AI**.  
With built-in authentication, a clean dashboard, and seamless integration of **OpenAI GPT** and **Firebase Google Login**, users can generate detailed itineraries, packing lists, and trip summaries — instantly.

---

## 🚀 Live Demo  
🎥 **Video Demonstration:** (https://drive.google.com/file/d/1KUxzy7fSWQkUdbI8RnDDLKqNthwIOKFU/view?usp=drive_link) 

🌐 **Deployed Website:** (https://ai-trip-planner-2-one.vercel.app/)

🧠 **Backend API:** (https://ai-trip-planner-ue50.onrender.com)

---

## 🖼️ Website Preview  

### 🏠 Login Page  
> Email + Google Login with Firebase Authentication  
<img width="1912" height="904" alt="Screenshot 2025-10-06 004939" src="https://github.com/user-attachments/assets/5e95bf51-c8d3-4cdf-ad7a-b46cf3b09653" />


---


### 📊 Dashboard  
> Create, view, delete, and generate AI-based trip plans  
<img width="1905" height="903" alt="Screenshot 2025-10-06 004851" src="https://github.com/user-attachments/assets/23461316-0d90-4d27-a596-d0d4df66050a" />

---

### ✨ AI Trip Plan  
> Beautifully structured AI-generated summary, itinerary, and packing list  
<img width="929" height="883" alt="Screenshot 2025-10-06 004901" src="https://github.com/user-attachments/assets/ea2947f8-74da-471b-a363-15be63d7823f" />

---
## API Docs:-
<img width="1918" height="768" alt="Screenshot 2025-10-06 124703" src="https://github.com/user-attachments/assets/4f7f42f0-b5c8-4874-8b3e-aa5943259aba" />
<img width="1872" height="679" alt="Screenshot 2025-10-06 124834" src="https://github.com/user-attachments/assets/a602b9fb-53fc-4f4a-8266-dca01ce639f8" />
<img width="1903" height="694" alt="Screenshot 2025-10-06 125049" src="https://github.com/user-attachments/assets/803f931e-7786-428f-8bac-388901904ff2" />

## ⚙️ Features  

✅ **User Authentication (JWT)** – Secure login & signup  
✅ **Google Sign-In (Firebase Auth)** – One-click access with Google  
✅ **AI Trip Planner (Gemini-CLI/OpenAI GPT-4o-mini)** – Auto-generates custom itineraries  
✅ **Trip Management (CRUD)** – Create, read, delete trips with ease  
✅ **Responsive Design** – Built with TailwindCSS  
✅ **Clean Dashboard UI** – Modern and minimalist interface  
✅ **MongoDB Database** – Secure storage of user trips  
✅ **Deployed on Render + Netlify** – Production-ready environment  

---

## 🧱 Tech Stack  

| Layer | Technologies Used |
|--------|-------------------|
| **Frontend** | React.js, TailwindCSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | JWT, Firebase Google Auth |
| **AI Engine** | OpenAI GPT-4o-mini |
| **Deployment** | Render (Backend), Netlify (Frontend) |

---

## ⚙️ Installation & Setup  

### 🔸 Prerequisites  
- Node.js (v18+)  
- MongoDB installed locally or cloud instance  
- OpenAI API key  
- Firebase project setup  

---

### 🧩 Backend Setup  

```bash
cd backend
npm install
Create .env file inside backend/:

env
Copy code
MONGO_URI=mongodb://localhost:27017/ai-trip-planner
PORT=8000
JWT_SECRET=mysecretkey123
OPENAI_API_KEY=your_openai_api_key_here
Run the backend server:

bash
Copy code
npm run dev
Server runs at:
➡️ http://localhost:8000

🎨 Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
Create .env inside frontend/:

env
Copy code
REACT_APP_BACKEND_URL=http://localhost:8000
Frontend runs at:
➡️ http://localhost:3000

🔐 Firebase Setup
Go to Firebase Console

Create a new project

Enable Google Authentication

Copy the configuration and paste it in frontend/src/firebase.js

js
Copy code
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
🧠 OpenAI Integration
In your trips.controller.js, the AI plan is generated as follows:

js
Copy code
const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
});

const aiResponse = completion.choices[0].message.content;
The generated plan is saved to MongoDB in the following structure:

json
Copy code
{
  "summary": "Relaxing beach vacation in Goa.",
  "itinerary": [
    { "day": 1, "plan": "Arrive and relax at the beach" },
    { "day": 2, "plan": "Visit Chapora Fort and enjoy local food" }
  ],
  "packing": ["Sunscreen", "Camera", "Beachwear"]
}
🗂 Folder Structure
pgsql
Copy code
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
💡 Future Enhancements
🌍 Multi-destination trip planning

🗺️ Google Maps integration

📅 Calendar view for itineraries

💬 Shareable trip links

📦 Export trip to PDF

👨‍💻 Developer Info
Developed by: krish
📧 Email: krish17aug04@gmail.com
