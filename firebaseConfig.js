// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4QBqZ55dXNEpBatRMeL_h1Bn9WuIySHc",
  authDomain: "mediguide-web-90348.firebaseapp.com",
  projectId: "mediguide-web-90348",
  storageBucket: "mediguide-web-90348.firebasestorage.app",
  messagingSenderId: "922161762882",
  appId: "1:922161762882:web:e721d47591798e46df93db",
  measurementId: "G-G05LL8392C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);