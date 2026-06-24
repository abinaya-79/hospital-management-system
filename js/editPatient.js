const params =
new URLSearchParams(window.location.search);

const patientId =
params.get("id");

fetch(
`http://localhost:5000/api/auth/patients/${patientId}`
)

.then(res => res.json())

.then(patient => {


document.getElementById("name").value =
patient.name;

document.getElementById("email").value =
patient.email;

document.getElementById("phone").value =
patient.phone;

document.getElementById("age").value =
patient.age;

document.getElementById("gender").value =
patient.gender;


});

document
.getElementById("editPatientForm")
.addEventListener("submit", async(e)=>{


e.preventDefault();

const updatedPatient = {

    name:
    document.getElementById("name").value,

    email:
    document.getElementById("email").value,

    phone:
    document.getElementById("phone").value,

    age:
    document.getElementById("age").value,

    gender:
    document.getElementById("gender").value

};

const response = await fetch(

    `http://localhost:5000/api/auth/patients/${patientId}`,

    {
        method:"PUT",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:
        JSON.stringify(updatedPatient)

    }

);

const result =
await response.json();

alert(result.message);

window.location.href =
"view-patients.html";


});
