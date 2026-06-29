const doctor =
JSON.parse(
localStorage.getItem("doctor")
);

document
.getElementById("saveBtn")
.addEventListener("click", async ()=>{

    const availability =
    document.getElementById(
        "availability"
    ).value;

    const response =
    await fetch(

    `http://localhost:5000/api/auth/doctor-availability/${doctor.id}`,

    {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            availability
        })

    });

    const data =
    await response.json();

    alert(data.message);

});