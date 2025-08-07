import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARpY8X-NdhupIR-CgtVSm5r36xDSVoPYQ",
  authDomain: "react-todo-app-94c8b.firebaseapp.com",
  projectId: "react-todo-app-94c8b",
  storageBucket: "react-todo-app-94c8b.firebasestorage.app",
  messagingSenderId: "678169014337",
  appId: "1:678169014337:web:f83954cb22e38a305a16c0",
  measurementId: "G-KZG2G7SSJC"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
