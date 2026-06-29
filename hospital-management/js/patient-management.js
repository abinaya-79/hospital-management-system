console.log("Patient Management Loaded");

// ----------------------
// Fetch Patients
// ----------------------

const patientTable =
document.getElementById("patientTable");

fetch("http://localhost:5000/api/auth/patients")

.then(res => res.json())

.then(patients => {

    patientTable.innerHTML = "";

    if(patients.length === 0){

        patientTable.innerHTML = `

        <tr>

            <td colspan="6" style="text-align:center;">

                No Patients Found

            </td>

        </tr>

        `;

        return;

    }

    patients.forEach(patient => {

        patientTable.innerHTML += `

        <tr>

            <td>${patient.name}</td>

            <td>${patient.email}</td>

            <td>${patient.phone}</td>

            <td>${patient.age}</td>

            <td>${patient.gender}</td>

            <td>

                <button
                class="edit-btn"
                onclick="editPatient('${patient.id}')">

                    Edit

                </button>

                <button
                class="delete-btn"
                onclick="deletePatient('${patient.id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

});

// ----------------------
// Edit Patient
// ----------------------

function editPatient(id){

    window.location.href =
    `edit-patient.html?id=${id}`;

}

// ----------------------
// Delete Patient
// ----------------------

async function deletePatient(id){

    const confirmDelete =
    confirm("Are you sure you want to delete this patient?");

    if(!confirmDelete){

        return;

    }

    try{

        const response =
        await fetch(

        `http://localhost:5000/api/auth/patients/${id}`,

        {

            method:"DELETE"

        }

        );

        const result =
        await response.json();

        alert(result.message);

        location.reload();

    }

    catch(error){

        console.error(error);

        alert("Failed to delete patient.");

    }

}

// ----------------------
// Logout
// ----------------------

document
.getElementById("logoutBtn")
.addEventListener("click",()=>{

    localStorage.clear();

    window.location.href =
    "login.html";

});