import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAwoKG4b5oetqNnrZEHOfcvsESRtBoHL6U",
  authDomain: "mimimi-49e3b.firebaseapp.com",
  projectId: "mimimi-49e3b",
  storageBucket: "mimimi-49e3b.firebasestorage.app",
  messagingSenderId: "479685563050",
  appId: "1:479685563050:web:f173645a0ad706885276d3",
  measurementId: "G-23DZK84N0B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase();