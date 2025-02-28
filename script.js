document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addPatientForm");
    const patientTable = document.getElementById("patientTable");

    // ✅ LOAD PATIENTS FUNCTION
    function loadPatients() {
        let patients = JSON.parse(localStorage.getItem("patients")) || [];
        patientTable.innerHTML = ""; // Clear table

        if (patients.length === 0) {
            patientTable.innerHTML = "<tr><td colspan='5' style='text-align:center;'>No patients found.</td></tr>";
            return;
        }

        patients.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

        patients.forEach((patient, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.date}</td>
                <td>${patient.illness}</td>
                <td>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </td>
            `;
            patientTable.appendChild(row);
        });

        // ✅ Attach event listeners to all "Remove" buttons
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                removePatient(index);
            });
        });
    }

    // ✅ FIXED REMOVE PATIENT FUNCTION
    function removePatient(index) {
        let patients = JSON.parse(localStorage.getItem("patients")) || [];
        patients.splice(index, 1); // Remove patient at that index
        localStorage.setItem("patients", JSON.stringify(patients));
        loadPatients(); // Refresh table after removal
    }

    // ✅ FIXED ADD PATIENT FUNCTION
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const age = document.getElementById("age").value;
            const date = document.getElementById("date").value;
            const illness = document.getElementById("illness").value;

            if (name === "" || age === "" || date === "") {
                alert("Please fill in all fields.");
                return;
            }

            let patients = JSON.parse(localStorage.getItem("patients")) || [];

            const newPatient = {
                name,
                age,
                date,
                illness
            };

            patients.push(newPatient);
            localStorage.setItem("patients", JSON.stringify(patients));

            alert("Patient added successfully!");
            window.location.href = "patients.html";
        });
    }

    // ✅ LOAD PATIENTS WHEN PAGE LOADS
    if (patientTable) {
        loadPatients();
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    function searchPatient() {
        let query = searchInput.value.trim().toLowerCase();
        let patients = JSON.parse(localStorage.getItem("patients")) || [];
        searchResults.innerHTML = ""; // Clear previous results

        if (query === "") {
            return displayAllPatients(); // Reset table when input is cleared
        }

        let filteredPatients = patients.filter(patient =>
            patient.name.toLowerCase().includes(query)
        );

        if (filteredPatients.length === 0) {
            searchResults.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">No matching patients found.</td>
                </tr>`;
            return;
        }

        filteredPatients.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

        filteredPatients.forEach(patient => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.date}</td>
                <td>${patient.illness}</td>
            `;
            searchResults.appendChild(row);
        });
    }

    function displayAllPatients() {
        let patients = JSON.parse(localStorage.getItem("patients")) || [];
        searchResults.innerHTML = ""; // Clear table

        if (patients.length === 0) {
            searchResults.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">No patients found.</td>
                </tr>`;
            return;
        }

        patients.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

        patients.forEach(patient => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.date}</td>
                <td>${patient.illness}</td>
            `;
            searchResults.appendChild(row);
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", searchPatient);
    }

    displayAllPatients(); // Show all patients on page load
});
// Reference Firestore collection
const patientTable = document.getElementById("patientTable");

function loadPatients() {
    db.collection("patients").orderBy("date", "asc").get()
    .then((querySnapshot) => {
        patientTable.innerHTML = ""; // Clear the table before adding new data
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let row = `<tr>
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.date}</td>
                <td>${data.illness}</td>
                <td><button class="remove-btn" onclick="removePatient('${doc.id}')">Remove</button></td>
            </tr>`;
            patientTable.innerHTML += row;
        });
    })
    .catch((error) => {
        console.error("Error fetching patients:", error);
    });
}

// Load patients when the page loads
window.onload = loadPatients;

