// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXs08LaE7xAmfYPmoKHr3J2-gv3FqIt8w",
    authDomain: "project2-f4212.firebaseapp.com",
    projectId: "project2-f4212",
    storageBucket: "project2-f4212.firebasestorage.app",
    messagingSenderId: "1049793003875",
    appId: "1:1049793003875:web:d66437b7c6a34b972d1356",
    measurementId: "G-YBZ1PJTHVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };