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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const patientsRef = ref(db, "patients");


// Add Patient
document.getElementById("patientForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let date = document.getElementById("date").value;
    let illness = document.getElementById("illness").value;

    push(patientsRef, { name, age, date, illness });
    alert("Patient added successfully!");
    document.getElementById("patientForm").reset();
});

// Fetch and Display Patients
onValue(patientsRef, (snapshot) => {
    let table = document.getElementById("patientTable");
    table.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
        let patient = childSnapshot.val();
        let row = `<tr>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.date}</td>
            <td>${patient.illness}</td>
        </tr>`;
        table.innerHTML += row;
    });
});