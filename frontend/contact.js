function submitForm() {
    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    if (name === "" || phone === "" || email === "") {
        alert("Please fill all fields");
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email) === false) {
        alert("Please enter a valid email");
        return;
    }
    const phonePattern = /^[0-9]{8}$/;
    if (phonePattern.test(phone) === false) {
        alert("Please enter a valid phone number");
        return;
    }
    emailjs.send("service_lqz1wsf", "template_jh5rg4i", {
        from_name: name,
        phone: phone,
        from_email: email
    })
    .then(function () {
        document.getElementById("formSection").style.display = "none";
        document.getElementById("thankYou").style.display = "block";
    })
    .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
    });
}