console.log("Doctor Appointments Loaded");

const doctor =
JSON.parse(localStorage.getItem("doctor"));

fetch(
`http://localhost:5000/api/auth/appointments/doctor/${doctor.name}`
)

.then(res => res.json())

.then(data => {

    console.log("Appointments:", data);

    const table =
    document.getElementById("appointmentsTable");

    table.innerHTML = "";

    if(data.length === 0){

        table.innerHTML = `
        <tr>
            <td colspan="8">
                No appointments found
            </td>
        </tr>
        `;

        return;
    }

    data.forEach(app => {

        let statusClass = "";

        if(app.status === "Approved"){

            statusClass = "status-approved";

        }

        else if(app.status === "Pending"){

            statusClass = "status-pending";

        }

        else{

            statusClass = "status-rejected";

        }

        const consultedText =

        app.consulted === true ||
        app.consulted === "true" ||
        app.consulted === "Yes"

        ? "Yes"

        : "No";

        table.innerHTML += `

        <tr>

            <td>${app.patient_name}</td>

            <td>${app.appointment_date}</td>

            <td>${app.appointment_time}</td>

            <td>${app.reason || "-"}</td>

            <td class="${statusClass}">

                ${app.status}

            </td>

            <td>

                ${app.status === "Pending" ? `

                <button
                class="approve-btn"
                onclick="updateStatus('${app.id}','Approved')">

                    Approve

                </button>

                <button
                class="reject-btn"
                onclick="updateStatus('${app.id}','Rejected')">

                    Reject

                </button>

                ` : "-"}

            </td>

            <td>

                ${consultedText}

            </td>

            <td>

                <button
                class="prescription-btn"
                onclick='addPrescription(${JSON.stringify(app)})'>

                    Add Prescription

                </button>

            </td>

        </tr>

        `;

    });

})

.catch(error => {

    console.error(error);

});

// ----------------------------
// Approve / Reject Appointment
// ----------------------------

async function updateStatus(id,status){

    try{

        const response = await fetch(

        `http://localhost:5000/api/auth/appointments/${id}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                status:status

            })

        }

        );

        const result =
        await response.json();

        alert(result.message);

        location.reload();

    }

    catch(error){

        console.error(error);

        alert("Failed to update appointment.");

    }

}

// ----------------------------
// Add Prescription
// ----------------------------

function addPrescription(app){

    localStorage.setItem(

        "appointmentData",

        JSON.stringify(app)

    );

    window.location.href =
    "add-prescription.html";

}