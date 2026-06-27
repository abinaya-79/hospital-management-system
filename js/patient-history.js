const patientName =
localStorage.getItem(
"selectedPatient"
);

fetch(
`http://localhost:5000/api/auth/medical-history/${patientName}`
)

.then(res => res.json())

.then(data => {


const table =
document.getElementById(
    "historyTable"
);

if(data.length === 0){

    table.innerHTML = `
    <tr>
        <td colspan="5">
            No history found
        </td>
    </tr>
    `;

    return;

}

data.forEach(record => {

    table.innerHTML += `

    <tr>

        <td>${record.created_at || "-"}</td>

        <td>${record.doctor_name}</td>

        <td>${record.visit_reason}</td>

        <td>${record.diagnosis}</td>

        <td>${record.prescription}</td>

    </tr>

    `;

});


});
