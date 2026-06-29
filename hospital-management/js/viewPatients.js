const patientTable =
document.getElementById("patientTable");

fetch("https://hospital-management-system-2jn3.onrender.com/api/auth/patients")

.then(res => res.json())

.then(patients => {


patients.forEach(patient => {

    patientTable.innerHTML += `

    <tr>

        <td>${patient.name}</td>

        <td>${patient.age}</td>

        <td>${patient.gender}</td>

        <td>${patient.email}</td>

        <td>${patient.phone}</td>

        <td>

    <button
        class="history-btn"
        onclick="viewHistory('${patient.name}')">

        View History

    </button>

</td>

    </tr>

    `;

});


});

function editPatient(id){


window.location.href =
`edit-patient.html?id=${id}`;


}

async function deletePatient(id){

const confirmDelete =
confirm("Delete this patient?");

if(!confirmDelete){
    return;
}

const response = await fetch(

    `https://hospital-management-system-2jn3.onrender.com/api/auth/patients/${id}`,

    {
        method:"DELETE"
    }

);

const result =
await response.json();

alert(result.message);

location.reload();


}
function viewHistory(patientName){

    localStorage.setItem(
        "selectedPatient",
        patientName
    );

    window.location.href =
    "patient-history.html";

}