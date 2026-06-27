console.log("Admin Dashboard Loaded");

// ----------------------
// Welcome Admin
// ----------------------

const admin =
JSON.parse(localStorage.getItem("admin"));

if(admin){

    document.getElementById(
        "adminWelcome"
    ).innerHTML =
    `Welcome ${admin.name} 👋`;

}

// ----------------------
// Total Doctors
// ----------------------

fetch(
"http://localhost:5000/api/auth/doctors"
)

.then(res => res.json())

.then(doctors => {

    document.getElementById(
        "doctorCount"
    ).innerText = doctors.length;

});

// ----------------------
// Total Patients
// ----------------------

fetch(
"http://localhost:5000/api/auth/patients"
)

.then(res => res.json())

.then(patients => {

    document.getElementById(
        "patientCount"
    ).innerText = patients.length;

});

// ----------------------
// Total Appointments
// ----------------------

fetch(
"http://localhost:5000/api/auth/appointments"
)

.then(res => res.json())

.then(appointments => {

    document.getElementById(
        "appointmentCount"
    ).innerText = appointments.length;

    // Pending Count

    const pending =
    appointments.filter(app =>
        app.status === "Pending"
    );

    document.getElementById(
        "pendingCount"
    ).innerText = pending.length;

});

// ----------------------
// Admin Messages
// ----------------------

const messages = [

"Every successful hospital begins with excellent management. 🏥",

"Good administration creates better patient care. 💙",

"Small improvements every day lead to healthier communities. 🌟",

"Behind every great doctor is a great administrator. 👨‍💼",

"Lead with responsibility, serve with compassion. ❤️"

];

document.getElementById(
    "adminMessage"
).innerText =

messages[
Math.floor(
Math.random() * messages.length
)
];

// ----------------------
// Logout
// ----------------------

document.getElementById(
"logoutBtn"
)

.addEventListener(
"click",
()=>{

localStorage.clear();

window.location.href =
"login.html";

});