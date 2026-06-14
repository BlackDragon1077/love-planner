import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAX6t2U64NzRyPdJ7gsNdbqD1Bqex5r_E8",
  authDomain: "love-planner-afb22.firebaseapp.com",
  projectId: "love-planner-afb22",
  storageBucket: "love-planner-afb22.firebasestorage.app",
  messagingSenderId: "337701370437",
  appId: "1:337701370437:web:20aac15712d9880197c12c",
  measurementId: "G-E3NKTVCVXB"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);