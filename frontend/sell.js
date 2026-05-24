document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
        sessionStorage.setItem('redirectAfterLogin', 'sell.html');
        window.location.href = 'login.html';
        return;
    }
    updateNavbar();
    prefillUser();

    document.getElementById('sellForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const fields = ['brand', 'model', 'year', 'price', 'horsepower', 'description', 'name', 'phone', 'email'];
        for (const f of fields) {
            const el = this.querySelector(`[name="${f}"]`);
            if (!el || !el.value.trim()) {
                showError(`Please fill in: ${f}`);
                return;
            }
        }
        if (!this.querySelector('[name="images[]"]').files.length) {
            showError('Please upload at least one image');
            return;
        }

        const btn = this.querySelector('.submit-btn');
        btn.disabled = true;
        btn.textContent = 'Submitting...';
        clearError();

        try {
            const formData = new FormData(this);
            formData.append('user_id', user.id);
            const res = await fetch('/backend/sell.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.status === 'success') {
                document.querySelector('.sell-container').innerHTML = `
                    <div style="text-align:center; padding: 3rem 1rem;">
                        <div style="width:60px;height:60px;border-radius:50%;border:2px solid #d4af37;display:flex;align-items:center;justify-content:center;margin:0 auto 1.2rem;animation:glow 2s infinite;">
                            <svg viewBox="0 0 24 24" width="24" height="24" style="stroke:#d4af37;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <h3 style="color:#d4af37;font-size:1.5rem;margin-bottom:0.6rem;">Listing Submitted!</h3>
                        <p style="color:#888;line-height:1.7;">Your car has been received.<br>Our team will review it and contact you shortly.</p>
                        <a href="index.html" style="display:inline-block;margin-top:1.5rem;color:#00f0ff;text-decoration:none;font-weight:bold;">← Back to collection</a>
                    </div>`;
            } else {
                showError('Something went wrong. Please try again.');
                btn.disabled = false;
                btn.textContent = 'Submit Car';
            }
        } catch (err) {
            showError('Network error. Please try again.');
            btn.disabled = false;
            btn.textContent = 'Submit Car';
        }
    });
});

function showError(msg) {
    const el = document.getElementById('responseMsg');
    el.style.color = '#ff5050';
    el.textContent = msg;
}

function clearError() {
    document.getElementById('responseMsg').textContent = '';
}

function prefillUser() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) return;
    const nameEl = document.querySelector('input[name="name"]');
    const emailEl = document.querySelector('input[name="email"]');
    const phoneEl = document.querySelector('input[name="phone"]');
    if (nameEl) nameEl.value = user.name || '';
    if (emailEl) emailEl.value = user.email || '';
    if (phoneEl) phoneEl.value = user.phone || '';
}

function updateNavbar() {
    const user = localStorage.getItem('user');
    const navAuthBtn = document.getElementById('navAuthBtn');
    const navUserMenu = document.getElementById('navUserMenu');
    const navUserName = document.getElementById('navUserName');
    if (!navAuthBtn) return;
    if (user) {
        const parsed = JSON.parse(user);
        navAuthBtn.style.display = 'none';
        if (navUserMenu) navUserMenu.style.display = 'block';
        if (navUserName) {
            navUserName.textContent = parsed.name.charAt(0).toUpperCase();
            const helloEl = document.getElementById('navDropdownHello');
            if (helloEl) helloEl.textContent = 'Hello ' + parsed.name + '!';
            navUserName.onclick = function() {
                const dropdown = document.getElementById('navDropdown');
                dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
            };
        }
    } else {
        navAuthBtn.style.display = 'block';
        if (navUserMenu) navUserMenu.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}