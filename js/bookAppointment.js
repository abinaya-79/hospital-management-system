const doctorSelect =
document.getElementById("doctorSelect");

fetch("http://localhost:5000/api/auth/doctors")

.then(res => res.json())

.then(doctors => {


doctors.forEach(doctor => {

    doctorSelect.innerHTML += `

    <option
        value="${doctor.name}">

        Dr. ${doctor.name} - ${doctor.specialization}

    </option>

    `;

});


});

document
.getElementById("appointmentForm")
.addEventListener("submit", async (e) => {


e.preventDefault();

const patient_name =
document.getElementById("patientName").value;


const doctor_name =
document.getElementById("doctorSelect").value;

const appointment_date =
document.getElementById("appointmentDate").value;

const appointment_time =
document.getElementById("appointmentTime").value;

const reason =
document.getElementById("reason").value;

try {

    const response = await fetch(

        "http://localhost:5000/api/auth/book-appointment",

        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                patient_name,
                doctor_name,
                appointment_date,
                appointment_time,
                reason

            })

        }

    );

    const result =
    await response.json();

    alert(result.message);

    document
    .getElementById("appointmentForm")
    .reset();

}

catch(error){

    console.error(error);

    alert("Failed to book appointment");

}


});
