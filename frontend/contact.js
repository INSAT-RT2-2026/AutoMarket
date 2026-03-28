function submitForm() {
    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    if (!name || !phone || !email) {
        alert("Please fill in: " +
            [!name && "Full Name", !phone && "Phone Number", !email && "Email"]
            .filter(Boolean).join(', '));
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
    }
    emailjs.send("service_lqz1wsf", "template_jh5rg4i", {
        from_name: name,
        phone: phone,
        from_email: email
    })
    .then(() => {
        document.getElementById("formSection").style.display = "none";
        document.getElementById("thankYou").style.display = "block";
    })
    .catch((error) => {
        alert("Something went wrong. Please try again.");
        console.error(error);
    });
}