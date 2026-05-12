function submitForm() {
    const user = JSON.parse(localStorage.getItem('user'));
    const message = document.getElementById("message").value.trim() || null;
    const car_name = document.getElementById("carInterest").value || null;

    fetch("/backend/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id:  user.id,
            car_name: car_name,
            message:  message
        })
    })
    .then(res => res.json())
    .then(data => {
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

function updateNavbar() {
    console.log('updateNavbar called', localStorage.getItem('user'));
    const user = localStorage.getItem('user');
    const navAuthBtn = document.getElementById('navAuthBtn');

    const navUserMenu = document.getElementById('navUserMenu');
    const navUserName = document.getElementById('navUserName');

    if (!navAuthBtn) return;

    if (user) {
        const parsed = JSON.parse(user);
        if (navAuthBtn) navAuthBtn.style.display = 'none';
        if (navUserMenu) navUserMenu.style.display = 'block';
        if (navUserName) {
            navUserName.textContent = parsed.name.charAt(0).toUpperCase();
            const helloEl = document.getElementById('navDropdownHello');
            if (helloEl) helloEl.textContent = 'Hello ' + parsed.name + '!';
            navUserName.onclick = function() {
                const dropdown = document.getElementById('navDropdown');
                const isVisible = dropdown.style.display === 'block';
                dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
            };
        }
    } else {
        if (navAuthBtn) navAuthBtn.style.display = 'block';
        if (navUserMenu) navUserMenu.style.display = 'none';
    }
}

function prefillFromUser() {
    const raw = localStorage.getItem('user');
    if (!raw) return;
    try {
        const user = JSON.parse(raw);
        if (user.name) document.getElementById('fullName').value = user.name;
        if (user.email) document.getElementById('email').value = user.email;
        if (user.phone) document.getElementById('phone').value = user.phone;
    } catch (e) {}
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}

function prefillCarFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const carName = params.get('car');
    if (!carName) return;
    document.getElementById('carInterest').value = carName;
    document.getElementById('selectedCarText').textContent = 'Interested in: ' + carName;
    document.getElementById('selectedCar').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('user')) {
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'register.html';
        return;
    }
    prefillFromUser();
    updateNavbar();
    prefillCarFromUrl();

    document.addEventListener('click', (event) => {
        const navUserMenu = document.getElementById('navUserMenu');
        const navDropdown = document.getElementById('navDropdown');
        if (!navUserMenu || !navDropdown) return;
        if (!navUserMenu.contains(event.target)) {
            navDropdown.style.display = 'none';
        }
    });
});