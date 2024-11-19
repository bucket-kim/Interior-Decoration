// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvlwtUelo8EU3PIq25-9zsXTwfysyZAVs",
  authDomain: "deco-interior.firebaseapp.com",
  projectId: "deco-interior",
  storageBucket: "deco-interior.firebasestorage.app",
  messagingSenderId: "957253822694",
  appId: "1:957253822694:web:d2ca88c1f892a64e5fb327",
  measurementId: "G-DJRK42C8H5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);