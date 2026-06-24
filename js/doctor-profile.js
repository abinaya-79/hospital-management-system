const doctor =
JSON.parse(
    localStorage.getItem("doctor")
);

document.getElementById("name").value =
doctor.name || "";

document.getElementById("email").value =
doctor.email || "";

document.getElementById("phone").value =
doctor.phone || "";

document.getElementById("specialization").value =
doctor.specialization || "";

document
.getElementById("profileForm")
.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const updatedDoctor = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        phone:
        document.getElementById("phone").value,

        specialization:
        document.getElementById("specialization").value,

        password:
        document.getElementById("password").value

    };

    const response =
    await fetch(

        `http://localhost:5000/api/auth/doctor/${doctor.id}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(updatedDoctor)

        }

    );

    const data =
    await response.json();

    alert(data.message);

    localStorage.setItem(
        "doctor",
        JSON.stringify({
            ...doctor,
            ...updatedDoctor
        })
    );

    window.location.href =
    "doctor-dashboard.html";

});