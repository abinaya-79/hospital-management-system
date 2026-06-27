const patient =
JSON.parse(localStorage.getItem("patient"));

if(patient){

    document.getElementById(
        "patientWelcome"
    ).innerHTML =
    `Welcome ${patient.name} 👋`;

}

const messages = [

"Your health is your greatest wealth. 💙",

"Every healthy choice matters. 🌱",

"Stay positive, stay healthy, stay strong. ✨",

"Taking care of yourself is always a good investment. ❤️",

"Your wellbeing is our priority. 🏥"

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