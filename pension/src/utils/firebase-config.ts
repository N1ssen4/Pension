import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAYsS5drb7TkbQ5GrSB_K0WSxt5SREWZoA",
  authDomain: "pension-dreamplan.firebaseapp.com",
  databaseURL:
    "https://pension-dreamplan-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pension-dreamplan",
  storageBucket: "pension-dreamplan.appspot.com",
  messagingSenderId: "2519938002",
  appId: "1:2519938002:web:15d05b5eb93c5d2e4fce0b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);