console.log("Admin Appointments Loaded");

// ----------------------------
// Load Appointments
// ----------------------------

const appointmentTable =
document.getElementById("appointmentTable");

fetch("http://localhost:5000/api/auth/appointments")

.then(res => res.json())

.then(appointments => {

    appointmentTable.innerHTML = "";

    if (appointments.length === 0) {

        appointmentTable.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center;">
                No Appointments Found
            </td>
        </tr>
        `;

        return;
    }

    appointments.forEach(app => {

        let statusClass = "";

        if (app.status === "Approved") {
            statusClass = "status-approved";
        }
        else if (app.status === "Pending") {
            statusClass = "status-pending";
        }
        else {
            statusClass = "status-rejected";
        }

        const consulted =
            app.consulted === true ||
            app.consulted === "true" ||
            app.consulted === "Yes";

        appointmentTable.innerHTML += `
        <tr>

            <td>${app.patient_name}</td>

            <td>${app.doctor_name}</td>

            <td>${app.appointment_date}</td>

            <td>${app.appointment_time}</td>

            <td>${app.reason || "-"}</td>

            <td class="${statusClass}">
                ${app.status}
            </td>

            <td class="${consulted ? "consulted" : "not-consulted"}">
                ${consulted ? "Yes" : "No"}
            </td>

        </tr>
        `;

    });

})

.catch(error => {

    console.error(error);

    alert("Failed to load appointments.");

});

// ----------------------------
// Logout
// ----------------------------

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});