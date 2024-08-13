// Script for CAD system

// Firestore references
initializeApp(firebaseConfig);
const callsRef = db.collection('calls');
const unitsRef = db.collection('units');

// Load active calls
function loadActiveCalls() {
    callsRef.onSnapshot((snapshot) => {
        const callsDiv = document.getElementById('active-calls');
        const callsTable = document.getElementById('calls-table');
        callsDiv.innerHTML = '';
        callsTable.innerHTML = `
            <tr>
                <th>Call ID</th>
                <th>Description</th>
                <th>Status</th>
            </tr>`;
        snapshot.forEach((doc) => {
            const call = doc.data();
            callsDiv.innerHTML += `
                <div class="card">
                    <h3>${call.callID}</h3>
                    <p>${call.description}</p>
                    <p>Status: ${call.status}</p>
                </div>`;
            callsTable.innerHTML += `
                <tr>
                    <td>${call.callID}</td>
                    <td>${call.description}</td>
                    <td>${call.status}</td>
                </tr>`;
        });
    });
}

// Load available units
function loadAvailableUnits() {
    unitsRef.onSnapshot((snapshot) => {
        const unitsTable = document.getElementById('units-table');
        unitsTable.innerHTML = `
            <tr>
                <th>Unit ID</th>
                <th>Status</th>
                <th>Location</th>
            </tr>`;
        snapshot.forEach((doc) => {
            const unit = doc.data();
            unitsTable.innerHTML += `
                <tr>
                    <td>${unit.unitID}</td>
                    <td>${unit.status}</td>
                    <td>${unit.location}</td>
                </tr>`;
        });
    });
}

// Create new call
function createNewCall() {
    const callID = prompt("Enter Call ID:");
    const description = prompt("Enter Call Description:");
    const status = "Pending";
    
    if (callID && description) {
        callsRef.add({
            callID: callID,
            description: description,
            status: status,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("Call created successfully!");
        }).catch((error) => {
            console.error("Error creating call: ", error);
        });
    }
}

// Add new unit
function addNewUnit() {
    const unitID = prompt("Enter Unit ID:");
    const status = "Available";
    const location = prompt("Enter Unit Location:");
    
    if (unitID && location) {
        unitsRef.add({
            unitID: unitID,
            status: status,
            location: location,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("Unit added successfully!");
        }).catch((error) => {
            console.error("Error adding unit: ", error);
        });
    }
}

// Handle Dark Mode toggle
document.getElementById('dark-mode').addEventListener('change', function() {
    if (this.checked) {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#e0e0e0';
    } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
    }
});

// Initial load of data
if (document.getElementById('active-calls')) loadActiveCalls();
if (document.getElementById('units-table')) loadAvailableUnits();
