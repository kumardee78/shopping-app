import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZsFk2JTYeyiRn5Cwoz3cqGOjiz2OKBUo",
  authDomain: "geekster-ecommerce-220a5.firebaseapp.com",
  projectId: "geekster-ecommerce-220a5",
  storageBucket: "geekster-ecommerce-220a5.appspot.com",
  messagingSenderId: "934799306066",
  appId: "1:934799306066:web:c0ac315137d7746ab25e8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);