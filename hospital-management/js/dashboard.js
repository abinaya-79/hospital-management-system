console.log("dashboard.js loaded");
document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if(confirmLogout){
        window.location.href = "login.html";
    }

});
const addPrescriptionBtn =
document.getElementById("addPrescriptionBtn");

if(addPrescriptionBtn){
    addPrescriptionBtn.addEventListener("click", () => {
        alert("Prescription module coming soon.");
    });
}

const viewPatientsBtn =
document.getElementById("viewPatientsBtn");

if(viewPatientsBtn){

    viewPatientsBtn.addEventListener("click", () => {

        window.location.href =
        "view-patients.html";

    });

}

const availabilityBtn =
document.getElementById("availabilityBtn");

if(availabilityBtn){
    availabilityBtn.addEventListener("click", () => {
        alert("Availability management coming soon.");
    });
}

const updateProfileBtn =
document.getElementById("updateProfileBtn");

if(updateProfileBtn){
    updateProfileBtn.addEventListener("click", () => {
        alert("Profile update module coming soon.");
    });
}

const addDoctorBtn = document.getElementById("addDoctorBtn");

console.log("BUTTON:", addDoctorBtn);

if(addDoctorBtn){

    addDoctorBtn.addEventListener("click", () => {

        console.log("ADD DOCTOR CLICKED");

        window.location.href = "add-doctor.html";

    });

}
const viewDoctorsBtn = document.getElementById("viewDoctorsBtn");

if(viewDoctorsBtn){

    viewDoctorsBtn.addEventListener("click", () => {

        window.location.href = "view-doctors.html";

    });

}

const editDoctorBtn = document.getElementById("editDoctorBtn");

if(editDoctorBtn){
    editDoctorBtn.addEventListener("click", () => {
        alert("Edit Doctor Module");
    });
}

const removeDoctorBtn = document.getElementById("removeDoctorBtn");

if(removeDoctorBtn){
    removeDoctorBtn.addEventListener("click", () => {
        alert("Remove Doctor Module");
    });
}


const medicalHistoryBtn = document.getElementById("medicalHistoryBtn");

if(medicalHistoryBtn){
    medicalHistoryBtn.addEventListener("click", () => {
        alert("Medical History Module");
    });
}

const prescriptionsBtn = document.getElementById("prescriptionsBtn");

if(prescriptionsBtn){
    prescriptionsBtn.addEventListener("click", () => {
        alert("Prescriptions Module");
    });
}

const reportsBtn = document.getElementById("reportsBtn");

if(reportsBtn){
    reportsBtn.addEventListener("click", () => {
        alert("Reports Module");
    });
}
const bookAppointmentBtn =
document.getElementById("bookAppointmentBtn");

if(bookAppointmentBtn){

    bookAppointmentBtn.addEventListener("click", () => {

        window.location.href =
        "book-appointment.html";

    });

}
const viewPatientsBtn =
document.getElementById("viewPatientsBtn");

if(viewPatientsBtn){

    viewPatientsBtn.addEventListener("click", () => {

        console.log("VIEW PATIENTS CLICKED");

        window.location.href =
        "view-patients.html";

    });

}

const patientName =
prompt("Enter Patient Name");
fetch(
"http://localhost:5000/api/auth/appointments/patient/sangavi"
)
.then(res => res.json())
.then(data => {

    if(data.length === 0) return;

    const appointment = data[0];

    document.getElementById(
        "appointmentStatus"
    ).innerHTML = `

        Doctor: ${appointment.doctor_name}
        <br><br>

        Date: ${appointment.appointment_date}
        <br><br>

        Time: ${appointment.appointment_time}
        <br><br>

        Status: ${appointment.status}

    `;

});


