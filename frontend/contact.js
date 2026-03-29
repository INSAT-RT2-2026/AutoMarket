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
        from_email: email ,
        car_interest: document.getElementById("carInterest").value || "Not specified",
        message: document.getElementById("message").value.trim() || "No message"
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
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("car");
    if (carId) {
        const allCars = [
            { id: 1, brand: "Porsche", model: "911", price: 450000 },
            { id: 2, brand: "Audi", model: "E-tron GT", price: 315000 },
            { id: 3, brand: "BMW", model: "iX", price: 264000 },
            { id: 4, brand: "BMW", model: "M3", price: 224000 },
            { id: 5, brand: "Ford", model: "Mustang", price: 265000 },
            { id: 6, brand: "Audi", model: "R8", price: 480000 },
            { id: 7, brand: "Ford", model: "Raptor", price: 240000 },
            { id: 8, brand: "Audi", model: "RS7", price: 360000 },
            { id: 9, brand: "Porsche", model: "Taycan", price: 280000 },
            { id: 10, brand: "Porsche", model: "Taycan Cross Turismo", price: 300000 },
            { id: 11, brand: "BMW", model: "X4", price: 162000 }
        ];
        const car = allCars.find(c => c.id === Number(carId));
        if (car) {
            document.getElementById("selectedCar").style.display = "block";
            document.getElementById("selectedCarText").textContent =
            `${car.brand} ${car.model} — ${car.price.toLocaleString()} DT`;
            document.getElementById("carInterest").value =
            `${car.brand} ${car.model}`;
        }
    }
});