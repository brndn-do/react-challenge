import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs19aaTKKyq3eK9zYEeGFeURbG89FcBS0",
  authDomain: "brandon-do-react-challenge.firebaseapp.com",
  databaseURL: "https://brandon-do-react-challenge-default-rtdb.firebaseio.com",
  projectId: "brandon-do-react-challenge",
  storageBucket: "brandon-do-react-challenge.firebasestorage.app",
  messagingSenderId: "113265238174",
  appId: "1:113265238174:web:c051db4ee895c753129b8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

// Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };