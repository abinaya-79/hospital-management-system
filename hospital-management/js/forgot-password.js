console.log("Forgot Password Loaded");

document
.getElementById("resetBtn")
.addEventListener("click", async () => {

    const role =
    document.getElementById("role").value;

    const email =
    document.getElementById("email").value.trim();

    const newPassword =
    document.getElementById("newPassword").value.trim();

    const confirmPassword =
    document.getElementById("confirmPassword").value.trim();

    // Validation

    if(role === "" ||
       email === "" ||
       newPassword === "" ||
       confirmPassword === ""){

        alert("Please fill all fields.");

        return;

    }

    if(newPassword !== confirmPassword){

        alert("Passwords do not match.");

        return;

    }

    if(newPassword.length < 6){

        alert("Password must be at least 6 characters.");

        return;

    }

    try{

        const response = await fetch("https://hospital-management-system-2jn3.onrender.com/api/auth/login", {
            
                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    role,
                    email,
                    newPassword

                })

            }
        );

        const result = await response.json();

        if(result.success){

            alert("Password Updated Successfully!");

            window.location.href = "login.html";

        }
        else{

            alert(result.message);

        }

    }

    catch(error){

        console.error(error);

        alert("Something went wrong.");

    }

});