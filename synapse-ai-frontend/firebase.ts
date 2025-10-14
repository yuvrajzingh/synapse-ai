
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB5Uyta6LnaFgBJk1h6w8fKKa10_JAyJp8",
  authDomain: "synapse-ai-37094.firebaseapp.com",
  projectId: "synapse-ai-37094",
  storageBucket: "synapse-ai-37094.firebasestorage.app",
  messagingSenderId: "1004983234770",
  appId: "1:1004983234770:web:2081bbf21dae61a0827d0b"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()  //Because when we use next.js there is a chance of getting a double initialization of the app

const db = getFirestore(app);
export {db}