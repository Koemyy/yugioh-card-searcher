import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR6mf-aikju-vhuidF3XEg8wo37sPVi4Q",
  authDomain: "yugioh-card-searcher.firebaseapp.com",
  projectId: "yugioh-card-searcher",
  storageBucket: "yugioh-card-searcher.appspot.com",
  messagingSenderId: "66990741308",
  appId: "1:66990741308:web:ffbe5536eeb9e315427039",
  measurementId: "G-3YSLL276HB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, firebaseConfig };
