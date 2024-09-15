import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "eric-b6638.firebaseapp.com",
  projectId: "eric-b6638",
  storageBucket: "eric-b6638.appspot.com",
  messagingSenderId: "441247057079",
  appId: "1:441247057079:web:40be385ff4465cc3d47932",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth();
