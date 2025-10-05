// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABPKkjKbz6Za028np_wEBPFiWLmqsdJlU",
  authDomain: "aiproject-4ef93.firebaseapp.com",
  projectId: "aiproject-4ef93",
  storageBucket: "aiproject-4ef93.appspot.com", // ✅ fixed
  messagingSenderId: "322581671153",
  appId: "1:322581671153:web:7de87e0f4b464ae1f1cd50",
  measurementId: "G-FC1LL4V3FZ",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Initialize Firebase Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
