// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvfN2AKAbuzcHmiH1HL3QnVu8kDGvIlBI",
  authDomain: "noteapp-de11d.firebaseapp.com",
  databaseURL: "https://noteapp-de11d-default-rtdb.firebaseio.com",
  projectId: "noteapp-de11d",
  storageBucket: "noteapp-de11d.firebasestorage.app",
  messagingSenderId: "95479022789",
  appId: "1:95479022789:web:b250804f692100939d1cac",
  measurementId: "G-E1LNNH7YGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export default app