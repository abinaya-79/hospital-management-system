console.log("Medical History Loaded");

const patient =
JSON.parse(
localStorage.getItem("patient")
);

fetch(
`https://hospital-management-system-2jn3.onrender.com/api/auth/medical-history/${patient.name}`
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
                No Medical History Found
            </td>
        </tr>
        `;

        return;
    }

    data.forEach(record => {

        table.innerHTML += `

        <tr>

            <td>${record.doctor_name}</td>

            <td>${record.visit_reason}</td>

            <td>${record.diagnosis}</td>

            <td>${record.prescription}</td>

            <td>${record.visit_date}</td>
        </tr>

        `;

    });

});