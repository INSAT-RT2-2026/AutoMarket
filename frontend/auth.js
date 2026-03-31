const API = 'http://localhost:5000/api/auth';

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if (email === '' || password === '') {
        errorMsg.textContent = 'Please fill all fields';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email) === false) {
        errorMsg.textContent = 'Please enter a valid email address';
        return;
    }

    fetch(API + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        if (data.msg) {
            errorMsg.textContent = data.msg;
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'indx.html';
        }
    })
    .catch(function() {
        errorMsg.textContent = 'Server error, make sure backend is running';
    });
}

function register() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMsg = document.getElementById('errorMsg');

    if (fullName === '' || email === '' || password === '' || confirmPassword === '') {
        errorMsg.textContent = 'Please fill all fields';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email) === false) {
        errorMsg.textContent = 'Please enter a valid email address';
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = 'Passwords do not match';
        return;
    }

    if (password.length < 6) {
        errorMsg.textContent = 'Password must be at least 6 characters';
        return;
    }

    fetch(API + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName, email: email, password: password })
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        if (data.msg) {
            errorMsg.textContent = data.msg;
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'indx.html';
        }
    })
    .catch(function() {
        errorMsg.textContent = 'Server error, make sure backend is running';
    });
}