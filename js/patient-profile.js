console.log("Patient Profile Loaded");

const patient =
JSON.parse(
localStorage.getItem("patient")
);

fetch(
`http://localhost:5000/api/auth/patients/${patient.id}`
)

.then(res => res.json())

.then(data => {

document.getElementById("name").value =
data.name || "";

document.getElementById("email").value =
data.email || "";

document.getElementById("phone").value =
data.phone || "";

document.getElementById("age").value =
data.age || "";

document.getElementById("gender").value =
data.gender || "";

document.getElementById("profession").value =
data.profession || "";

document.getElementById("height").value =
data.height || "";

document.getElementById("weight").value =
data.weight || "";

document.getElementById("blood_group").value =
data.blood_group || "";

});

document.getElementById(
"updateProfileBtn"
)

.addEventListener(
"click",
async ()=>{

const response =
await fetch(
`http://localhost:5000/api/auth/patients/${patient.id}`,
{
method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

phone:
document.getElementById("phone").value,

age:
document.getElementById("age").value,

gender:
document.getElementById("gender").value,

profession:
document.getElementById("profession").value,

height:
document.getElementById("height").value,

weight:
document.getElementById("weight").value,

blood_group:
document.getElementById("blood_group").value

})

}
);

const result =
await response.json();

alert(result.message);

}
);

document.getElementById(
"changePasswordBtn"
)

.addEventListener(
"click",
async ()=>{

const currentPassword =
document.getElementById(
"currentPassword"
).value;

const newPassword =
document.getElementById(
"newPassword"
).value;

const confirmPassword =
document.getElementById(
"confirmPassword"
).value;

if(currentPassword !== patient.password){

alert(
"Current password is incorrect"
);

return;

}

if(newPassword !== confirmPassword){

alert(
"Passwords do not match"
);

return;

}

const response =
await fetch(
`http://localhost:5000/api/auth/patients/${patient.id}`,
{
method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:patient.name,
email:patient.email,
phone:patient.phone,
age:patient.age,
gender:patient.gender,
profession:patient.profession,
height:patient.height,
weight:patient.weight,
blood_group:patient.blood_group,
password:newPassword

})

}
);

const result =
await response.json();

alert("Password Changed");

}
);