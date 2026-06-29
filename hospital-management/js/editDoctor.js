const params = new URLSearchParams(window.location.search);

const doctorId = params.get("id");

fetch(`https://hospital-management-system-2jn3.onrender.com/api/auth/doctors/${doctorId}`)
.then(res => res.json())
.then(doctor => {


document.getElementById("name").value =
doctor.name;

document.getElementById("email").value =
doctor.email;

document.getElementById("phone").value =
doctor.phone;

document.getElementById("specialization").value =
doctor.specialization;


});

document
.getElementById("editDoctorForm")
.addEventListener("submit", async (e) => {


e.preventDefault();

const updatedDoctor = {

    name:
    document.getElementById("name").value,

    email:
    document.getElementById("email").value,

    phone:
    document.getElementById("phone").value,

    specialization:
    document.getElementById("specialization").value

};

const response = await fetch(

    `https://hospital-management-system-2jn3.onrender.com/api/auth/doctors/${doctorId}`,

    {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedDoctor)
    }

);

const result = await response.json();

alert(result.message);

window.location.href =
"view-doctors.html";


});
