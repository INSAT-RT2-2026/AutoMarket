const allCars = [
    {
        "id": 1,
        "brand": "Porsche",
        "model": "911",
        "year": 2023,
        "price": 450000,
        "type": "sports",
        "image": "car_images/911.webp",
        "specs": "3.0L Twin-Turbo • PDK • 2k miles",
        "description": "Iconic rear-engine performance with razor-sharp handling and daily comfort."
    },
    {
        "id": 2,
        "brand": "Audi",
        "model": "E-tron GT",
        "year": 2024,
        "price": 315000,
        "type": "electric",
        "image": "car_images/E-tron GT.webp",
        "specs": "Electric • AWD • 1k miles",
        "description": "Instant torque, smooth long-range driving, and an ultra-modern electric feel."
    },
    {
        "id": 3,
        "brand": "BMW",
        "model": "iX",
        "year": 2024,
        "price": 264000,
        "type": "suv",
        "image": "car_images/IX.webp",
        "specs": "Electric • AWD • New",
        "description": "A luxury electric SUV with effortless power and a spacious, premium cabin."
    },
    {
        "id": 4,
        "brand": "BMW",
        "model": "M3",
        "year": 2024,
        "price": 224000,
        "type": "sedan",
        "image": "car_images/M3.webp",
        "specs": "3.0L Twin-Turbo • Automatic • 5k miles",
        "description": "Legendary M performance tuned for precision acceleration and confident control."
    },
    {
        "id": 5,
        "brand": "Ford",
        "model": "Mustang",
        "year": 2023,
        "price": 265000,
        "type": "sports",
        "image": "car_images/MUSTANG.jpg",
        "specs": "5.0L V8 • Manual • 8k miles",
        "description": "Classic V8 muscle with an engaging manual drive feel and unmistakable style."
    },
    {
        "id": 6,
        "brand": "Audi",
        "model": "R8",
        "year": 2023,
        "price": 480000,
        "type": "supercar",
        "image": "car_images/R8.jpg",
        "specs": "5.2L V10 • AWD • 3k miles",
        "description": "A track-bred V10 supercar delivering breathtaking acceleration and composed grip."
    },
    {
        "id": 7,
        "brand": "Ford",
        "model": "Raptor",
        "year": 2023,
        "price": 240000,
        "type": "truck",
        "image": "car_images/RAPTOR.webp",
        "specs": "3.5L EcoBoost • 4WD • 10k miles",
        "description": "Built for the wild: tough stance, confident traction, and serious off-road capability."
    },
    {
        "id": 8,
        "brand": "Audi",
        "model": "RS7",
        "year": 2024,
        "price": 360000,
        "type": "sedan",
        "image": "car_images/RS7.webp",
        "specs": "4.0L V8 • AWD • 1.5k miles",
        "description": "Grand touring power in a sleek sedan—fast, refined, and always in control."
    },
    {
        "id": 9,
        "brand": "Porsche",
        "model": "Taycan",
        "year": 2023,
        "price": 280000,
        "type": "electric",
        "image": "car_images/TAYCAN.webp",
        "specs": "Electric • RWD • 6k miles",
        "description": "Electric performance with Porsche precision and a smooth, confident ride."
    },
    {
        "id": 10,
        "brand": "Porsche",
        "model": "Taycan Cross Turismo",
        "year": 2023,
        "price": 300000,
        "type": "electric",
        "image": "car_images/Taycan Cross Turismo.webp",
        "specs": "Electric • AWD • 4k miles",
        "description": "Sporty wagon versatility with elevated comfort and capable all-weather performance."
    },
    {
        "id": 11,
        "brand": "BMW",
        "model": "X4",
        "year": 2023,
        "price": 162000,
        "type": "suv",
        "image": "car_images/X4.webp",
        "specs": "2.0L Turbo • AWD • 12k miles",
        "description": "A premium compact SUV with dynamic driving, modern tech, and everyday comfort."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    initHomePage();
    initCarDetailsPage();

    document.addEventListener('click', (event) => {
        const navUserMenu = document.getElementById('navUserMenu');
        const navDropdown = document.getElementById('navDropdown');
        if (!navUserMenu || !navDropdown) return;
        if (!navUserMenu.contains(event.target)) {
            navDropdown.style.display = 'none';
        }
    });
});

function initHomePage() {
    if (document.querySelector('.stats')) {
        const experienceStat = document.querySelector('.stat-item:nth-child(2) .stat-number');
        if (experienceStat) {
            const startYear = 2012;
            const currentYear = new Date().getFullYear();
            experienceStat.setAttribute('data-target', currentYear - startYear);
        }
    }
    if (document.getElementById('carsGrid')) {
        displayCars(allCars);
    }
    if (document.getElementById('car-interest')) {
        populateCarSelect(allCars);
    }
}

function initCarDetailsPage() {
    const detailsContainer = document.getElementById('carDetails');
    if (!detailsContainer) return;
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const car = allCars.find(c => c.id === id);
    renderCarDetails(car, detailsContainer);
}

function openCarDetails(carId) {
    window.location.href = `car-details.html?id=${encodeURIComponent(carId)}`;
}

function displayCars(cars) {
    const container = document.getElementById('carsGrid');
    if (!container) return;
    container.innerHTML = cars.map(car => `
        <div class="car-card" data-type="${car.type}" onclick="openCarDetails(${car.id})">
            <img src="${car.image}" alt="${car.brand} ${car.model}">
            <div class="car-info">
                <h3>${car.brand} ${car.model} ${car.year}</h3>
                <p>${car.specs}</p>
                <p class="price">${car.price.toLocaleString()} DT</p>
                <button class="details-btn" onclick="event.stopPropagation(); openCarDetails(${car.id})">View Description</button>
                <button class="buy-btn" onclick="event.stopPropagation(); inquire(${car.id})">Buy Now</button>
            </div>
        </div>
    `).join('');
}

function filterCars(category) {
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    let filtered = [];
    if (category === 'all') {
        filtered = allCars;
    } else if (category === 'supercars') {
        filtered = allCars.filter(car => ['sports', 'supercar'].includes(car.type));
    } else if (category === 'luxury') {
        filtered = allCars.filter(car => ['sedan', 'suv', 'electric', 'truck'].includes(car.type));
    } else if (category === 'exotic') {
        filtered = allCars.filter(car => ['supercar', 'electric'].includes(car.type));
    }
    displayCars(filtered);
}

function populateCarSelect(cars) {
    const select = document.getElementById('car-interest');
    if (!select) return;
    cars.forEach(car => {
        const option = document.createElement('option');
        option.value = `${car.brand} ${car.model}`;
        option.textContent = `${car.brand} ${car.model} - $${car.price.toLocaleString()}`;
        select.appendChild(option);
    });
}

/* ── Custom Dropdown Logic ── */
const modelsMap = {
    bmw:     ["M3", "X4", "iX"],
    porsche: ["911", "Taycan", "Taycan Cross Turismo"],
    audi:    ["R8", "RS7", "E-tron GT"],
    ford:    ["Mustang", "Raptor"]
};

function toggleDropdown(which) {
    const wrapper = document.getElementById(which + 'Wrapper');
    const isOpen  = wrapper.classList.contains('open');
    // close all first
    document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    if (!isOpen) wrapper.classList.add('open');
}

function selectMake(el) {
    const value = el.dataset.value;
    const label = el.textContent;
    // update hidden input + label
    document.getElementById('make').value = value;
    document.getElementById('makeLabel').textContent = label;
    // highlight selected option
    document.querySelectorAll('#makeList .custom-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    // close
    document.getElementById('makeWrapper').classList.remove('open');
    // rebuild model list
    updateModels(value);
}

function selectModel(el) {
    const value = el.dataset.value;
    const label = el.textContent;
    document.getElementById('model').value = value;
    document.getElementById('modelLabel').textContent = label;
    document.querySelectorAll('#modelList .custom-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('modelWrapper').classList.remove('open');
}

function updateModels(make) {
    make = make || document.getElementById('make').value;
    const list = document.getElementById('modelList');
    // reset
    list.innerHTML = '<li class="custom-option selected" data-value="" onclick="selectModel(this)">Any Model</li>';
    document.getElementById('model').value = '';
    document.getElementById('modelLabel').textContent = 'Any Model';
    if (modelsMap[make]) {
        modelsMap[make].forEach(m => {
            const li = document.createElement('li');
            li.className = 'custom-option';
            li.dataset.value = m;
            li.textContent = m;
            li.onclick = function() { selectModel(this); };
            list.appendChild(li);
        });
    }
}

function startSearch() {
    const make  = document.getElementById('make').value.toLowerCase();
    const model = document.getElementById('model').value.toLowerCase();
    let filtered = allCars;
    if (make)  filtered = filtered.filter(c => c.brand.toLowerCase() === make);
    if (model) filtered = filtered.filter(c => c.model.toLowerCase() === model);
    displayCars(filtered);
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    }
});

function renderCarDetails(car, container) {
    if (!car) {
        container.innerHTML = `
            <h2>Car not found</h2>
            <p style="color:#00f0ff; font-weight:bold;">The car id in the URL is invalid.</p>
            <a class="back-link" href="index.html#collection">Back to collection</a>
        `;
        return;
    }
    document.title = `${car.brand} ${car.model} — TunLuxAuto`;
    container.innerHTML = `
        <div class="details-card">
            <div class="details-image-wrapper">
                <img class="details-image" src="${car.image}" alt="${car.brand} ${car.model}">
                <span class="details-type-badge">${car.type.toUpperCase()}</span>
            </div>
            <div class="details-body">
                <div class="details-header">
                    <div>
                        <h2>${car.brand} ${car.model}</h2>
                        <span class="details-year">${car.year}</span>
                    </div>
                    <p class="details-price">${car.price.toLocaleString()} DT</p>
                </div>
                <div class="details-specs-grid">
                    ${car.specs.split('•').map(spec => `
                        <div class="spec-item">
                            <span>${spec.trim()}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="details-description-box">
                    <h4>About this car</h4>
                    <p>${car.description || ''}</p>
                </div>
                <div class="details-actions">
                    <button class="buy-btn" onclick="inquire(${car.id})">Buy Now</button>
                    <a class="back-link" href="index.html#collection">← Back to collection</a>
                </div>
            </div>
        </div>
    `;
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        update();
    });
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

function inquire(carId) {
    if (!localStorage.getItem('user')) {
        sessionStorage.setItem('redirectAfterLogin', `contact.html?car=${encodeURIComponent(carId)}`);
        window.location.href = 'register.html';
        return;
    }
    window.location.href = `contact.html?car=${encodeURIComponent(carId)}`;
}

function updateNavbar() {
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

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}
