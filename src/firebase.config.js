import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAouv29Zk0rDGuvnSC-uSt3HvUUCSsXh7E",
  authDomain: "b-17-properties.firebaseapp.com",
  projectId: "b-17-properties",
  storageBucket: "b-17-properties.appspot.com",
  messagingSenderId: "759369920020",
  appId: "1:759369920020:web:e94c47e57e4cfb30710101",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
