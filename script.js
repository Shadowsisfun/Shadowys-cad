// Ensure Firestore is initialized
const db = firebase.firestore();

/** UNITS MANAGEMENT **/
// Reference to the 'units' collection
const unitsRef = db.collection('units');

// Function to add a new unit
document.getElementById('add-unit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const unitName = document.getElementById('unitName').value;
    const unitType = document.getElementById('unitType').value;

    unitsRef.add({
        unitName,
        unitType,
        status: 'available',
        location: new firebase.firestore.GeoPoint(0, 0),
        assignedCallID: null
    }).then(() => {
        alert('Unit added successfully!');
    }).catch((error) => {
        console.error('Error adding unit:', error);
    });
});

// Function to list units
function listUnits() {
    unitsRef.get().then((snapshot) => {
        const unitsList = document.getElementById('units-list');
        unitsList.innerHTML = ''; // Clear existing list
        snapshot.forEach((doc) => {
            const unit = doc.data();
            unitsList.innerHTML += `<div>${unit.unitName} (${unit.unitType}) - ${unit.status}</div>`;
        });
    });
}

// Call the function to list units on page load
if (document.getElementById('units-list')) {
    listUnits();
}

/** CALLS MANAGEMENT **/
const callsRef = db.collection('calls');

// Function to add a new call
document.getElementById('add-call-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value.split(',').map(Number);

    callsRef.add({
        description,
        location: new firebase.firestore.GeoPoint(location[0], location[1]),
        status: 'pending',
        assignedUnits: [],
        timestamp: firebase.firestore.Timestamp.now()
    }).then(() => {
        alert('Call added successfully!');
    }).catch((error) => {
        console.error('Error adding call:', error);
    });
});

// Function to list calls
function listCalls() {
    callsRef.get().then((snapshot) => {
        const callsList = document.getElementById('calls-list');
        callsList.innerHTML = ''; // Clear existing list
        snapshot.forEach((doc) => {
            const call = doc.data();
            callsList.innerHTML += `<div>${call.description} - ${call.status}</div>`;
        });
    });
}

// Call the function to list calls on page load
if (document.getElementById('calls-list')) {
    listCalls();
}

/** LOGS MANAGEMENT **/
const logsRef = db.collection('logs');

// Function to list logs
function listLogs() {
    logsRef.get().then((snapshot) => {
        const logsList = document.getElementById('logs-list');
        logsList.innerHTML = ''; // Clear existing list
        snapshot.forEach((doc) => {
            const log = doc.data();
            logsList.innerHTML += `<div>${log.timestamp.toDate()} - ${log.action}</div>`;
        });
    });
}

// Call the function to list logs on page load
if (document.getElementById('logs-list')) {
    listLogs();
}

/** USER SETTINGS **/
const usersRef = db.collection('users');

// Function to update user profile
document.getElementById('update-profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const userId = firebase.auth().currentUser.uid; // Assuming user is authenticated
    const username = document.getElementById('username').value;
    const bio = document.getElementById('bio').value;

    usersRef.doc(userId).set({
        username,
        bio,
    }, { merge: true }).then(() => {
        alert('Profile updated successfully!');
    }).catch((error) => {
        console.error('Error updating profile:', error);
    });
});
