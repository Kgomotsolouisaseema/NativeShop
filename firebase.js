// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeBpUfAIn5CVcn3FJNDaU4jTVPyGOn59k",
  authDomain: "shopinglistapp-fb9ae.firebaseapp.com",
  projectId: "shopinglistapp-fb9ae",
  storageBucket: "shopinglistapp-fb9ae.appspot.com",
  messagingSenderId: "1075034777863",
  appId: "1:1075034777863:web:b0a8ef370c8f54bdf37da2",
  measurementId: "G-4Y01GBT8NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
 export const auth =getAuth(app);
 export const googleProvider = new GoogleAuthProvider();
 export const db  = getFirestore(app)
 