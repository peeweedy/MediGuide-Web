// Firebase Configuration (Replace with your own config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to Add Patient
function addPatient(name, age, date, illness) {
    db.collection("patients").add({
        name: name,
        age: age,
        date: date,
        illness: illness,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Patient added successfully!");
        window.location.href = "patients.html"; // Redirect after adding
    }).catch(error => {
        console.error("Error adding patient: ", error);
    });
}

// Function to Remove Patient
function removePatient(id) {
    db.collection("patients").doc(id).delete()
        .then(() => {
            alert("Patient removed!");
            location.reload(); // Reload the page to update the list
        })
        .catch(error => {
            console.error("Error removing patient: ", error);
        });
}

// Function to Display Patients on Patients Page
function displayPatients() {
    const patientTable = document.getElementById("patientTable");
    db.collection("patients").orderBy("timestamp").onSnapshot(snapshot => {
        patientTable.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            patientTable.innerHTML += `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.age}</td>
                    <td>${data.date}</td>
                    <td>${data.illness}</td>
                    <td>
                        <button class="remove-btn" onclick="removePatient('${doc.id}')">Remove</button>
                    </td>
                </tr>
            `;
        });
    });
}

// Function to Search Patients
function searchPatient() {
    let searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
    const searchResults = document.getElementById("searchResults");

    db.collection("patients").orderBy("timestamp").get().then(snapshot => {
        searchResults.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.name.toLowerCase().includes(searchValue)) {
                searchResults.innerHTML += `
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.age}</td>
                        <td>${data.date}</td>
                        <td>${data.illness}</td>
                    </tr>
                `;
            }
        });
    });

    // Reset table when search bar is empty
    if (searchValue === "") {
        searchResults.innerHTML = "";
    }
}

// Call displayPatients() when on the Patients page
if (window.location.pathname.includes("patients.html")) {
    displayPatients();
}

