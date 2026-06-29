const doctorTable =
document.getElementById("doctorTable");

fetch("http://localhost:5000/api/auth/doctors")

.then(res => res.json())

.then(doctors => {

    doctors.forEach(doctor => {

        const availabilityText =
        doctor.availability === "Available"
        ? "🟢 Available"
        : "🔴 Unavailable";

        const actionButton =
        doctor.availability === "Available"

        ?

        `<button
            class="book-btn"
            onclick="bookDoctor('${doctor.name}')">

            Book Appointment

        </button>`

        :

        `<button disabled>

            Unavailable

        </button>`;

        doctorTable.innerHTML += `

        <tr>

            <td>${doctor.name}</td>

            <td>${doctor.specialization}</td>

            <td>${doctor.phone}</td>

            <td>${availabilityText}</td>

            <td>

                ${actionButton}

            </td>

        </tr>

        `;

    });

});

function bookDoctor(doctorName){

    localStorage.setItem(
        "selectedDoctor",
        doctorName
    );

    window.location.href =
    "book-appointment.html";

}