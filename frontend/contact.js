function submitForm() {
    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name === "" || phone === "" || email === "") {
        alert("Please fill all fields");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email");
        return;
    }

    const phonePattern = /^[0-9]{8}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number");
        return;
    }
    
   fetch("../backend/contact.php", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            car_interest: document.getElementById("carInterest").value || "Not specified",
            message: document.getElementById("message").value.trim() || "No message"
        })
    })
    
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.status === "success") {
            document.getElementById("formSection").style.display = "none";
            document.getElementById("thankYou").style.display = "block";
        } else {
            alert("Server error");
        }
    })
    .catch(error => {
        alert("Something went wrong");
        console.log(error);
    });
}