// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA026_eA-_mPfYHRrKcpZRyJIG7Pm_M5ew",
  authDomain: "airbnb-clone-authenticat-85d8d.firebaseapp.com",
  projectId: "airbnb-clone-authenticat-85d8d",
  storageBucket: "airbnb-clone-authenticat-85d8d.appspot.com", // Fixed storage bucket URL typo
  messagingSenderId: "320826590667",
  appId: "1:320826590667:web:8afeaf71a5a95abc01224e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
