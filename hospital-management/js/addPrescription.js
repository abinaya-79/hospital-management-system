console.log("Add Prescription Page Loaded");

const form =
document.getElementById("prescriptionForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const doctor =
    JSON.parse(
        localStorage.getItem("doctor")
    );

    const patient_name =
    document.getElementById(
        "patientName"
    ).value;

    const diagnosis =
    document.getElementById(
        "diagnosis"
    ).value;

    const medicines =
    document.getElementById(
        "medicines"
    ).value;

    const notes =
    document.getElementById(
        "notes"
    ).value;

    try {

        const response = await fetch(
        "http://localhost:5000/api/auth/add-prescription",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                patient_name,
                doctor_name: doctor.name,
                diagnosis,
                medicines,
                notes

            })

        });

        const data =
        await response.json();

        alert(data.message);
        if(data.success){

    await fetch(
    "http://localhost:5000/api/auth/add-medical-history",
    {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

    patient_name:
    appointment.patient_name,

    doctor_name:
    doctor.name,

    visit_reason:
    appointment.reason,

    diagnosis,

    prescription:
    medicines

})

    });

}

await fetch(

`http://localhost:5000/api/auth/update-consulted/${appointment.id}`,

{
    method:"PUT"
}

);
        if(data.success){

            const appointment =
                    JSON.parse(
        localStorage.getItem(
"appointmentData"
)
);

await fetch(

`http://localhost:5000/api/auth/appointments/${appointment.id}`,

{
    method:"PUT",

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify({

        consulted:true

    })

}

);
            window.location.href =
            "doctor-dashboard.html";

        }

    }
    catch(error){

        console.error(error);

        alert(
            "Failed to save prescription"
        );

    }

});

const appointment =
JSON.parse(
localStorage.getItem(
"appointmentData"
)
);

console.log(appointment);

document.getElementById(
    "patientName"
).value =
appointment.patient_name;