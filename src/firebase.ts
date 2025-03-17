// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9WQF7qhhYd84H6bj-b9LJSZBNQSC1VSI",
  authDomain: "pt-leagues.firebaseapp.com",
  projectId: "pt-leagues",
  storageBucket: "pt-leagues.firebasestorage.app",
  messagingSenderId: "1029939223054",
  appId: "1:1029939223054:web:6063f43141439c8ac6fa5f",
  measurementId: "G-BG24JYV485"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();