// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOqY50GKa9HIKjK6YNKjfNbaZS9Sot2a8",
  authDomain: "craigslist-clone-3.firebaseapp.com",
  projectId: "craigslist-clone-3",
  storageBucket: "craigslist-clone-3.appspot.com",
  messagingSenderId: "731691102235",
  appId: "1:731691102235:web:a9a3ad02bf74aa08ce08be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestoreDB = getFirestore(app);
