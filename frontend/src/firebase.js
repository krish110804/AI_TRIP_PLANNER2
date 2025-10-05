// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdhM-ShjKTLUheZVmVflZBGYFsdqbWQuk",
  authDomain: "trip-planner-a9a98.firebaseapp.com",
  projectId: "trip-planner-a9a98",
  storageBucket: "trip-planner-a9a98.firebasestorage.app",
  messagingSenderId: "140222247567",
  appId: "1:140222247567:web:fddf433d159106f63c76fa",
  measurementId: "G-GXDHJXFS6W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Initialize Firebase Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
