// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfd3UQO7owT-WRlLQY1cydZSNhZItjLe4",
  authDomain: "not-mine-cf89a.firebaseapp.com",
  projectId: "not-mine-cf89a",
  storageBucket: "not-mine-cf89a.appspot.com",
  messagingSenderId: "483691030126",
  appId: "1:483691030126:web:9542c3ee53e141b140e87f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
