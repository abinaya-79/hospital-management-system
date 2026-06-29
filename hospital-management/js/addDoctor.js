document
.getElementById("doctorForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const specialization =
        document.getElementById("specialization").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
        "http://localhost:5000/api/auth/add-doctor",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                specialization,
                password
            })
        }
    );

    const data = await response.json();

    alert(data.message);

});