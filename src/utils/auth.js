// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkN3Ayw-ewbLevVN7uqQXdOKj6eTSz8_A",
  authDomain: "tps-and-assessments.firebaseapp.com",
  projectId: "tps-and-assessments",
  storageBucket: "tps-and-assessments.appspot.com",
  messagingSenderId: "817988643076",
  appId: "1:817988643076:web:ad3fd4bbefab4e2a3d4851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };