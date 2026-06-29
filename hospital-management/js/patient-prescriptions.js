console.log("Patient Prescriptions Loaded");

const patient =
JSON.parse(
localStorage.getItem("patient")
);

fetch(
`https://hospital-management-system-2jn3.onrender.com/api/auth/prescriptions/patient/${patient.name}`
)

.then(res => res.json())

.then(data => {

    const table =
    document.getElementById(
        "prescriptionTable"
    );

    if(data.length === 0){

        table.innerHTML = `
        <tr>
            <td colspan="4">
                No prescriptions found
            </td>
        </tr>
        `;

        return;
    }

    data.forEach(item => {

        table.innerHTML += `

        <tr>

            <td>${item.doctor_name}</td>

            <td>${item.diagnosis}</td>

            <td>${item.medicines}</td>

            <td>${item.notes}</td>

        </tr>

        `;

    });

});