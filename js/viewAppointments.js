const appointmentTable =
document.getElementById("appointmentTable");

loadAppointments();

async function loadAppointments(){


appointmentTable.innerHTML = "";

const response = await fetch(
    "http://localhost:5000/api/auth/appointments"
);

const appointments =
await response.json();

appointments.forEach(appointment => {

    appointmentTable.innerHTML += `

    <tr>

        <td>${appointment.patient_name}</td>

        <td>${appointment.doctor_name}</td>

        <td>${appointment.appointment_date}</td>

        <td>${appointment.appointment_time}</td>

        <td>${appointment.reason}</td>

        <td>${appointment.status}</td>

        <td>

            <button
                class="approve-btn"
                onclick="updateStatus(
                '${appointment.id}',
                'Approved'
                )">

                Approve

            </button>

            <button
                class="reject-btn"
                onclick="updateStatus(
                '${appointment.id}',
                'Rejected'
                )">

                Reject

            </button>

            <button
                class="delete-btn"
                onclick="deleteAppointment(
                '${appointment.id}'
                )">

                Delete

            </button>

        </td>

    </tr>

    `;

});


}

async function updateStatus(id,status){


const response = await fetch(

    `http://localhost:5000/api/auth/appointments/${id}`,

    {
        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            status
        })

    }

);

const result =
await response.json();

alert(result.message);

loadAppointments();


}

async function deleteAppointment(id){


const confirmDelete =
confirm("Delete Appointment?");

if(!confirmDelete){
    return;
}

const response = await fetch(

    `http://localhost:5000/api/auth/appointments/${id}`,

    {
        method:"DELETE"
    }

);

const result =
await response.json();

alert(result.message);

loadAppointments();


}
