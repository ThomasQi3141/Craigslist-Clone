// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClvwV6Jo4xj1WglAQsB6RDPvdM8lqdH60",
  authDomain: "craigslist-clone-17738.firebaseapp.com",
  projectId: "craigslist-clone-17738",
  storageBucket: "craigslist-clone-17738.appspot.com",
  messagingSenderId: "129823859062",
  appId: "1:129823859062:web:732d4af8b068d10cf51a57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
