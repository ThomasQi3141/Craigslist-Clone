// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ1ugLPM3JqvBQgYxAIWW2NcqhFd4LoOg",
  authDomain: "craigslist-clone-2.firebaseapp.com",
  projectId: "craigslist-clone-2",
  storageBucket: "craigslist-clone-2.appspot.com",
  messagingSenderId: "577441433961",
  appId: "1:577441433961:web:f2ea45d26ad2eda9aed5f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestoreDB = getFirestore(app);
