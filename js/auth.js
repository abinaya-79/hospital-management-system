console.log("auth.js loaded");

let selectedRole = "patient";

// ------------------ Role Selection ------------------

function selectRole(role, element) {

    selectedRole = role;

    const buttons = document.querySelectorAll(".role-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    element.classList.add("active");

    const registerText = document.getElementById("registerText");

    if (registerText) {
        if (role === "patient") {
            registerText.style.display = "block";
        } else {
            registerText.style.display = "none";
        }
    }
}

// ------------------ Login Password Toggle ------------------

function togglePassword() {

    const password = document.getElementById("password");

    if (!password) return;

    password.type =
        password.type === "password"
            ? "text"
            : "password";
}

// ------------------ Login Form ------------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();

        console.log("LOGIN ROLE:", selectedRole);
        console.log("EMAIL:", email);
        console.log("PASSWORD:", password);

        fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password,
                role: selectedRole
            })

        })

        .then(res => res.json())

        .then(data => {

            console.log("SERVER RESPONSE:", data);

            if (data.success) {

                if (selectedRole === "patient") {

    localStorage.setItem(
        "patient",
        JSON.stringify(data.user)
    );

    window.location.href =
        "patient-dashboard.html";

}

                else if (selectedRole === "doctor") {

    localStorage.setItem(
        "doctor",
        JSON.stringify(data.user)
    );

    window.location.href =
        "doctor-dashboard.html";

}

                else if (selectedRole === "admin") {

    localStorage.setItem(
        "admin",
        JSON.stringify(data.user)
    );

    window.location.href =
        "admin-dashboard.html";

}

}
            else {

                alert(data.message);

            }

        })

        .catch(error => {

            console.error(error);

            alert("Server Error");

        });

    });

}

// ------------------ Register Password Toggle ------------------

function toggleRegisterPassword() {

    const password =
        document.getElementById("regPassword");

    if (!password) return;

    password.type =
        password.type === "password"
            ? "text"
            : "password";
}

// ------------------ Register Form ------------------

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        console.log("REGISTER CLICKED");

        const password =
            document.getElementById("regPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("passwordMessage");

        // Password Validation

        if (password.length < 6) {

            message.innerHTML =
                "Password must contain at least 6 characters";

            message.className = "error";

            return;
        }

        if (password !== confirmPassword) {

            message.innerHTML =
                "Passwords do not match";

            message.className = "error";

            return;
        }

        // Form Values

        const fullName =
            document.getElementById("fullName").value;

        const email =
            document.getElementById("email").value;

        const phone =
            document.getElementById("phone").value;

        const age =
            document.getElementById("age").value;

        const gender =
            document.getElementById("gender").value;

        // Send Data to Backend

        fetch("http://localhost:5000/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: fullName,
                email,
                phone,
                age,
                gender,
                password
            })

        })

        .then(res => res.json())

        .then(data => {

            console.log(data);

            if (data.success) {

                message.innerHTML =
                    "Registration Successful";

                message.className = "success";

                setTimeout(() => {

                    window.location.href =
                        "patient-dashboard.html";

                }, 1500);

            } else {

                message.innerHTML =
                    data.message;

                message.className = "error";
            }

        })

       .catch(error => {

    console.log("FULL ERROR:", error);

    alert(JSON.stringify(error));

    message.innerHTML =
        "Server Error";

    message.className = "error";

});

    });

}

function addPrescription(app){

    localStorage.setItem(
        "appointmentData",
        JSON.stringify(app)
    );

    window.location.href =
    "add-prescription.html";

}