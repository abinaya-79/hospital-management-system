console.log("Doctor Management Loaded");

// ----------------------
// Fetch Doctors
// ----------------------

const doctorTable =
document.getElementById("doctorTable");

fetch("http://localhost:5000/api/auth/doctors")

.then(res => res.json())

.then(doctors => {

    doctorTable.innerHTML = "";

    if(doctors.length === 0){

        doctorTable.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">
                No Doctors Found
            </td>
        </tr>
        `;

        return;
    }

    doctors.forEach(doctor => {

        const availability =
        doctor.availability || "Unavailable";

        const availabilityClass =
        availability === "Available"
        ? "available"
        : "unavailable";

        doctorTable.innerHTML += `

        <tr>

            <td>${doctor.name}</td>

            <td>${doctor.specialization}</td>

            <td>${doctor.email}</td>

            <td>${doctor.phone}</td>

            <td class="${availabilityClass}">
                ${availability}
            </td>

            <td>

                <button
                class="edit-btn"
                onclick="editDoctor('${doctor.id}')">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteDoctor('${doctor.id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

});

// ----------------------
// Add Doctor
// ----------------------

document
.getElementById("addDoctorBtn")
.addEventListener("click",()=>{

window.location.href =
"add-doctor.html";

});

// ----------------------
// Edit Doctor
// ----------------------

function editDoctor(id){

window.location.href =
`edit-doctor.html?id=${id}`;

}

// ----------------------
// Delete Doctor
// ----------------------

async function deleteDoctor(id){

const confirmDelete =
confirm(
"Are you sure you want to delete this doctor?"
);

if(!confirmDelete){

return;

}

try{

const response =
await fetch(
`http://localhost:5000/api/auth/doctors/${id}`,
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

alert("Failed to delete doctor.");

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