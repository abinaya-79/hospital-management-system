console.log("My Appointments Loaded");

const patient =
JSON.parse(
localStorage.getItem("patient")
);

fetch(
`http://localhost:5000/api/auth/appointments/patient/${patient.name}`
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
            <td colspan="6">
                No appointments found
            </td>
        </tr>
        `;

        return;
    }

    data.forEach(app => {

        const consultedText =
        app.consulted === true ||
        app.consulted === "true" ||
        app.consulted === "Yes"
        ? "Yes"
        : "No";

        table.innerHTML += `

        <tr>

            <td>${app.doctor_name}</td>

            <td>${app.appointment_date}</td>

            <td>${app.appointment_time}</td>

            <td>${app.reason}</td>

            <td>${app.status}</td>

            <td>${consultedText}</td>

        </tr>

        `;

    });

});