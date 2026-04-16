function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }
    fetch("backend/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "login",
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            localStorage.setItem("user", data.name);
            window.location.href = "indx.html";
        } else {
            alert("Invalid email or password");
        }
    })
    .catch(error => {
        alert("Something went wrong");
        console.log(error);
    });
}
function register() {
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }s
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    fetch("backend/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "register",
            name: name,
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            alert("Account created! Please sign in.");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Something went wrong");
        }
    })
    .catch(error => {
        alert("Something went wrong");
        console.log(error);
    });
}