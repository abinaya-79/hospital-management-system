const doctorTable =
document.getElementById("doctorTable");

fetch("http://localhost:5000/api/auth/doctors")

.then(res => res.json())

.then(doctors => {

    doctors.forEach(doctor => {

        doctorTable.innerHTML += `

        <tr>

            <td>${doctor.name}</td>

            <td>${doctor.specialization}</td>

            <td>${doctor.email}</td>

            <td>${doctor.phone}</td>

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

function editDoctor(id){

    window.location.href =
    `edit-doctor.html?id=${id}`;

}

async function deleteDoctor(id){


const confirmDelete = confirm(
    "Are you sure you want to delete this doctor?"
);

if(!confirmDelete){
    return;
}

try {

    const response = await fetch(
        `http://localhost:5000/api/auth/doctors/${id}`,
        {
            method: "DELETE"
        }
    );

    const result = await response.json();

    alert(result.message);

    location.reload();

} catch(error){

    console.error(error);

    alert("Failed to delete doctor");

}


}
