console.log("Medical History Page Loaded");

const form =
document.getElementById("medicalHistoryForm");

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

    const visit_reason =
    document.getElementById(
        "visitReason"
    ).value;

    const diagnosis =
    document.getElementById(
        "diagnosis"
    ).value;

    const prescription =
    document.getElementById(
        "prescription"
    ).value;

    try {

        const response = await fetch(
        "https://hospital-management-system-2jn3.onrender.com/api/auth/add-medical-history",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                patient_name,
                doctor_name: doctor.name,
                visit_reason,
                diagnosis,
                prescription

            })

        });

        const data =
        await response.json();

        alert(data.message);

        if(data.success){

            window.location.href =
            "doctor-dashboard.html";

        }

    }
    catch(error){

        console.error(error);

        alert(
            "Failed to save medical history"
        );

    }

});