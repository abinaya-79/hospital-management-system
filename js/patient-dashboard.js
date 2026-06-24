console.log("Patient Dashboard Loaded");

const patient =
JSON.parse(localStorage.getItem("patient"));

console.log(patient);

if(patient){

    document.querySelector(
        ".welcome-section h1"
    ).innerHTML =
    `Welcome ${patient.name} 👋`;

}
if(patient){

    fetch(
    `http://localhost:5000/api/auth/appointments/patient/${patient.name}`
    )

    .then(res => res.json())

    .then(data => {

        const box =
        document.getElementById(
            "appointmentStatus"
        );

        if(data.length === 0){

            box.innerHTML =
            "No appointments booked yet.";

            return;
        }

        const appointment =
        data[0];

        box.innerHTML = `

            Doctor:
            ${appointment.doctor_name}
            <br><br>

            Date:
            ${appointment.appointment_date}
            <br><br>

            Time:
            ${appointment.appointment_time}
            <br><br>

            Status:
            <b>${appointment.status}</b>

        `;

    });

}
fetch(
`http://localhost:5000/api/auth/prescriptions/patient/${patient.name}`
)

.then(res => res.json())

.then(data => {

    const box =
    document.getElementById(
        "prescriptionBox"
    );

    if(data.length === 0){

        box.innerHTML =
        "No prescriptions available.";

        return;

    }

    let html = "";

    data.forEach(p => {

        html += `
            Diagnosis:
            ${p.diagnosis}
            <br><br>

            Medicines:
            ${p.medicines}
            <br><br>

            Notes:
            ${p.notes}
            <hr><br>
        `;

    });

    box.innerHTML = html;

});

fetch(
`http://localhost:5000/api/auth/medical-history/${patient.name}`
)

.then(res => res.json())

.then(data => {

    const box =
    document.getElementById(
        "medicalHistoryBox"
    );

    if(data.length === 0){

        box.innerHTML =
        "No medical history found.";

        return;

    }

    let html = "";

    data.forEach(record => {

        html += `

            Date:
            ${record.visit_date}
            <br><br>

            Doctor:
            ${record.doctor_name}
            <br><br>

            Reason:
            ${record.visit_reason}
            <br><br>

            Diagnosis:
            ${record.diagnosis}
            <br><br>

            Prescription:
            ${record.prescription}

            <hr><br>

        `;

    });

    box.innerHTML = html;

});