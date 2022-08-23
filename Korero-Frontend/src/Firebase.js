// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzdp_SlltXXtfoCEse6NAuKWfPY70MONo",
  authDomain: "auth-letskorero-development.firebaseapp.com",
  projectId: "auth-letskorero-development",
  storageBucket: "auth-letskorero-development.appspot.com",
  messagingSenderId: "533486066176",
  appId: "1:533486066176:web:5d048e09e8e55ea707d6e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const  googleProvider  = new GoogleAuthProvider();

export {auth,googleProvider};