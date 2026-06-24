console.log("Doctor Appointments Loaded");

const doctor =
JSON.parse(
localStorage.getItem("doctor")
);

fetch(
`http://localhost:5000/api/auth/appointments/doctor/${doctor.name}`
)

.then(res => res.json())

.then(data => {


const table =
document.getElementById(
    "appointmentsTable"
);

if(data.length === 0){

    table.innerHTML = `
    <tr>
        <td colspan="7">
            No appointments found
        </td>
    </tr>
    `;

    return;
}

data.forEach(app => {

    let statusClass = "";

    if(app.status === "Approved"){
        statusClass = "status-approved";
    }
    else if(app.status === "Pending"){
        statusClass = "status-pending";
    }
    else{
        statusClass = "status-rejected";
    }

    table.innerHTML += `

    <tr>

        <td>${app.patient_name}</td>

        <td>${app.appointment_date}</td>

        <td>${app.appointment_time}</td>

        <td>${app.reason}</td>

        <td class="${statusClass}">
            ${app.status}
        </td>

        <td>

            <button
            class="consult-btn">

            No

            </button>

        </td>

        <td>

            <button
            class="prescription-btn"
            onclick='addPrescription(${JSON.stringify(app)})'>

            Add Prescription

            </button>

        </td>

    </tr>

    `;

});


});

function addPrescription(app){


localStorage.setItem(
    "appointmentData",
    JSON.stringify(app)
);

window.location.href =
"add-prescription.html";


}
