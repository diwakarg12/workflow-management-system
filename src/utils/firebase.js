// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyBSSPIi6qX18tpeisAKV7bk9AQNeH-TYXk",
    authDomain: "workflow-management-sys.firebaseapp.com",
    projectId: "workflow-management-sys",
    storageBucket: "workflow-management-sys.firebasestorage.app",
    messagingSenderId: "94390923996",
    appId: "1:94390923996:web:3cf07cd6b536450a973a19",
    measurementId: "G-83RY4CP7MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);