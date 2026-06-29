console.log("Doctor Dashboard Loaded");

const doctor =
JSON.parse(localStorage.getItem("doctor"));

if(doctor){


document.getElementById(
    "doctorWelcome"
).innerHTML =
`Welcome Dr. ${doctor.name} 👋`;


}

const messages = [

"Every patient deserves your best care today. 💙",

"Small acts of care make a big difference. 🌟",

"Your dedication helps build healthier communities. 🏥",

"Compassion is as important as medicine. ❤️",

"Thank you for making a difference in patients' lives. 🙌"

];

document.getElementById(
"dailyMessage"
).innerText =

messages[
Math.floor(
Math.random() * messages.length
)
];

document.getElementById(
"logoutBtn"
).addEventListener("click",()=>{


localStorage.clear();

window.location.href =
"login.html";


});
