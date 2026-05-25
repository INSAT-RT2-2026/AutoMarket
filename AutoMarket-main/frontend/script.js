const allCars = [
    {
        "id": 1,
        "brand": "Porsche",
        "model": "911",
        "year": 2023,
        "price": 450000,
        "type": "sports",
        "horsepower": 450,
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
        "horsepower": 522,
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
        "horsepower": 516,
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
        "horsepower": 503,
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
        "horsepower": 450,
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
        "horsepower": 562,
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
        "horsepower": 450,
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
        "horsepower": 591,
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
        "horsepower": 408,
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
        "horsepower": 469,
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
        "horsepower": 248,
        "image": "car_images/X4.webp",
        "specs": "2.0L Turbo • AWD • 12k miles",
        "description": "A premium compact SUV with dynamic driving, modern tech, and everyday comfort."
    }
];

let currentCars = [...allCars];
let allLoadedCars = [...allCars];

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
        loadCars();
    }
    if (document.getElementById('car-interest')) {
        populateCarSelect(allCars);
    }
    if (document.querySelector('.featured-grid')) {
        loadFeaturedCars();
    }
    const sortSelect = document.getElementById("sort");
    if (sortSelect) {
        sortSelect.addEventListener("change", sortCars);
    }
}

function loadCars() {
    document.getElementById('carsGrid').innerHTML = `
        <div class="cars-loading">
            <div class="loading-spinner"></div>
            <p>Loading collection...</p>
        </div>
    `;

    fetch('/backend/cars.php')
    .then(res => res.json())
    .then(data => {
        const dbCars = (data.cars || []).map(c => ({
            id: 'db-' + c.car_id,
            brand: c.brand,
            model: c.model,
            year: c.year,
            price: parseFloat(c.price),
            horsepower: c.horsepower,
            image: c.images ? JSON.parse(c.images)[0] : 'car_images/default.jpg',
            specs: `${c.year} • ${c.horsepower}hp`,
            description: c.description,
            type: 'listing'
        }));
        currentCars = [...allCars, ...dbCars];
        allLoadedCars = [...currentCars];
        displayCars(currentCars);
        rebuildSearchDropdowns(currentCars);
    })
    .catch(() => {
        currentCars = [...allCars];
        allLoadedCars = [...allCars];
        displayCars(currentCars);
    });
}

function loadFeaturedCars() {
    fetch('/backend/cars.php')
    .then(res => res.json())
    .then(data => {
        const dbCars = (data.cars || []).slice(0, 3);
        if (!dbCars.length) return;
        
        const grid = document.querySelector('.featured-grid');
        if (!grid) return;

        grid.innerHTML = dbCars.map(c => {
            const images = c.images ? JSON.parse(c.images) : [];
            const img = images[0] || 'car_images/default.jpg';
            return `
                <div class="car-card" onclick="openCarDetails('db-${c.car_id}')">
                    <img src="${img}" alt="${c.brand} ${c.model}">
                    <h3>${c.brand} ${c.model}</h3>
                    <p>${parseInt(c.price).toLocaleString()} DT</p>
                    <button class="details-btn" onclick="event.stopPropagation(); openCarDetails('db-${c.car_id}')">View Description</button>
                </div>
            `;
        }).join('');
    })
    .catch(() => {}); 
}

function rebuildSearchDropdowns(cars) {
    // rebuild makes
    const makeList = document.getElementById('makeList');
    if (!makeList) return;
    
    const makes = [...new Set(cars.map(c => c.brand))].sort();
    makeList.innerHTML = '<li class="custom-option selected" data-value="" onclick="selectMake(this)">Any Make</li>';
    makes.forEach(make => {
        const li = document.createElement('li');
        li.className = 'custom-option';
        li.dataset.value = make.toLowerCase();
        li.textContent = make;
        li.onclick = function() { selectMake(this); };
        makeList.appendChild(li);
    });

    // rebuild modelsMap
    cars.forEach(car => {
        const key = car.brand.toLowerCase();
        if (!modelsMap[key]) modelsMap[key] = [];
        if (!modelsMap[key].includes(car.model)) {
            modelsMap[key].push(car.model);
        }
    });
}

function initCarDetailsPage() {
    const detailsContainer = document.getElementById('carDetails');
    if (!detailsContainer) return;

    const params = new URLSearchParams(window.location.search);
    const rawId = params.get('id');

    if (rawId && rawId.startsWith('db-')) {
        const dbId = rawId.replace('db-', '');
        fetch(`/backend/cars.php?id=${dbId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                const c = data.car;
                const images = c.images ? JSON.parse(c.images) : [];
                renderCarDetails({
                    id: 'db-' + c.car_id,
                    brand: c.brand,
                    model: c.model,
                    year: c.year,
                    price: parseFloat(c.price),
                    horsepower: c.horsepower,
                    image: images[0] || 'car_images/default.jpg',
                    specs:`${c.horsepower}hp`,
                    description: c.description,
                    type: 'listing',
                    seller_name: c.seller_name,
                    seller_phone: c.seller_phone,
                    seller_email: c.seller_email
                }, detailsContainer);
            } else {
                renderCarDetails(null, detailsContainer);
            }
        })
        .catch(() => renderCarDetails(null, detailsContainer));
    } else {
        const id = Number(rawId);
        const car = allCars.find(c => c.id === id);
        renderCarDetails(car, detailsContainer);
    }
}

function openCarDetails(carId) {
    window.location.href = `car-details.html?id=${encodeURIComponent(carId)}`;
}

function displayCars(cars) {
    const container = document.getElementById('carsGrid');
    if (!container) return;
    container.innerHTML = cars.map(car => `
        <div class="car-card" data-type="${car.type}" onclick="openCarDetails('${car.id}')">
            <img src="${car.image}" alt="${car.brand} ${car.model}">
            <div class="car-info">
                <h3>${car.brand} ${car.model} ${car.year}</h3>
                <p>${car.specs}</p>
                <p class="price">${car.price.toLocaleString()} DT</p>
                <button class="details-btn" onclick="event.stopPropagation(); openCarDetails('${car.id}')">View Description</button>
                <button class="buy-btn" onclick="event.stopPropagation(); inquire('${car.brand} ${car.model}')">Buy Now</button>
                <button class="compare-btn" id="cmdbtn-${car.id}" onclick="event.stopPropagation(); selectForCompare(${car.id}, '${car.brand} ${car.model}', ${car.price}, ${car.year}, ${car.horsepower}, '${car.type}')">+ Compare</button>
            </div>
        </div>
    `).join('');
}

function filterCars(category) {
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        currentCars = [...allLoadedCars];
    } else if (category === 'supercars') {
        currentCars = allLoadedCars.filter(car => ['sports', 'supercar'].includes(car.type));
    } else if (category === 'luxury') {
        currentCars = allLoadedCars.filter(car => ['sedan', 'suv', 'electric', 'truck', 'listing'].includes(car.type));
    } else if (category === 'exotic') {
        currentCars = allLoadedCars.filter(car => ['supercar', 'electric'].includes(car.type));
    }

    displayCars(currentCars);
}

function sortCars() {
    const sortEl = document.getElementById("sort");
    if (!sortEl) return;
    const value = sortEl.value;

    let sorted = [...currentCars];

    if (value === "priceLow") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (value === "priceHigh") {
        sorted.sort((a, b) => b.price - a.price);
    } else if (value === "newest") {
        sorted.sort((a, b) => b.year - a.year);
    } else if (value === "power") {
        sorted.sort((a, b) => b.horsepower - a.horsepower);
    }

    currentCars = sorted;
    displayCars(currentCars);
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

const modelsMap = {
    bmw:     ["M3", "X4", "iX"],
    porsche: ["911", "Taycan", "Taycan Cross Turismo"],
    audi:    ["R8", "RS7", "E-tron GT"],
    ford:    ["Mustang", "Raptor"]
};

function toggleDropdown(which) {
    const wrapper = document.getElementById(which + 'Wrapper');
    const isOpen  = wrapper.classList.contains('open');
    document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    if (!isOpen) wrapper.classList.add('open');
}

function selectMake(el) {
    const value = el.dataset.value;
    const label = el.textContent;
    document.getElementById('make').value = value;
    document.getElementById('makeLabel').textContent = label;
    document.querySelectorAll('#makeList .custom-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('makeWrapper').classList.remove('open');
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
    let filtered = allLoadedCars;
    if (make)  filtered = filtered.filter(c => c.brand.toLowerCase() === make);
    if (model) filtered = filtered.filter(c => c.model.toLowerCase() === model);
    displayCars(filtered);
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    }
});

function renderCarDetails(car, container) {
    if (!car) {
        document.title = 'Car Not Found — TunLuxAuto';
        container.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 60vh;
                text-align: center;
                padding: 2rem;
            ">
                <div style="
                    font-size: 6rem;
                    font-weight: 900;
                    color: transparent;
                    -webkit-text-stroke: 2px #d4af37;
                    letter-spacing: 0.1em;
                    line-height: 1;
                    margin-bottom: 1.5rem;
                    animation: slideUp 0.7s both;
                ">404</div>
                <h2 style="
                    color: #fff;
                    font-size: 1.5rem;
                    margin-bottom: 0.8rem;
                    animation: slideUp 0.7s 0.15s both;
                ">This car doesn't exist</h2>
                <p style="
                    color: #888;
                    font-size: 0.95rem;
                    margin-bottom: 2rem;
                    animation: slideUp 0.7s 0.3s both;
                ">The ID in the URL is invalid or the listing has been removed.</p>
                <a href="index.html#collection" style="
                    display: inline-block;
                    padding: 12px 32px;
                    background: #d4af37;
                    color: black;
                    font-weight: bold;
                    border-radius: 25px;
                    text-decoration: none;
                    transition: transform 0.2s;
                    animation: slideUp 0.7s 0.45s both;
                " onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
                    Back to Collection
                </a>
            </div>
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
                ${car.seller_name ? `
                    <div class="details-seller-box">
                        <h4>Seller Info</h4>
                        <p>👤 ${car.seller_name}</p>
                        <p>📞 ${car.seller_phone}</p>
                        <p>✉️ ${car.seller_email}</p>
                    </div>
                ` : ''}
                <div class="details-actions">
                    <button class="buy-btn" onclick="inquire('${car.brand} ${car.model}')">Buy Now</button>
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
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + suffix;
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

function inquire(carName) {
    if (!localStorage.getItem('user')) {
        sessionStorage.setItem('redirectAfterLogin', `contact.html?car=${encodeURIComponent(carName)}`);
        window.location.href = 'register.html';
        return;
    }
    window.location.href = `contact.html?car=${encodeURIComponent(carName)}`;
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

            const adminLinkEl = document.getElementById('navAdminLink');
            if (adminLinkEl) {
                adminLinkEl.style.display = parsed.role === 'admin' ? 'block' : 'none';
            }

            navUserName.onclick = function() {
                const dropdown = document.getElementById('navDropdown');
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
function selectSort(el) {
    const value = el.dataset.value;
    document.getElementById('sort').value = value;
    document.getElementById('sortLabel').textContent = el.textContent;
    document.querySelectorAll('#sortList .custom-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('sortWrapper').classList.remove('open');
    sortCars();
}
// ── Car Comparison Logic ──
let carA = null, carB = null;

function selectForCompare(id, name, price, year, hp, type) {
  if (carA && carA.id === id) { clearSlot('A'); return; }
  if (carB && carB.id === id) { clearSlot('B'); return; }
  if (carA && carB) { alert('Remove one car first before adding another.'); return; }

  const car = { id, name, price, year, hp, type };
  const img = allCars.find(c => c.id === id)?.image || '';

  if (!carA) {
    carA = car;
    fillSlot('A', car, img);
    const btn = document.getElementById('cmdbtn-' + id);
    if (btn) { btn.classList.add('selected-a'); btn.textContent = '✓ Car A'; }
  } else {
    carB = car;
    fillSlot('B', car, img);
    const btn = document.getElementById('cmdbtn-' + id);
    if (btn) { btn.classList.add('selected-b'); btn.textContent = '✓ Car B'; }
  }
  updateCompareBtn();
  document.getElementById('compareSection').scrollIntoView({ behavior: 'smooth' });
}

function fillSlot(slot, car, img) {
  document.getElementById('slot' + slot).classList.add('filled');
  document.getElementById('slot' + slot + '-empty').style.display = 'none';
  document.getElementById('slot' + slot + '-filled').style.display = 'flex';
  document.getElementById('slot' + slot + '-img').src = img;
  document.getElementById('slot' + slot + '-name').textContent = car.name;
  document.getElementById('slot' + slot + '-price').textContent = car.price.toLocaleString() + ' DT';
  document.getElementById('slot' + slot + '-meta').textContent = car.year + ' · ' + car.hp + ' HP · ' + car.type;
}

function clearSlot(slot) {
  const car = slot === 'A' ? carA : carB;
  if (!car) return;
  const btn = document.getElementById('cmdbtn-' + car.id);
  if (btn) { btn.classList.remove('selected-a', 'selected-b'); btn.textContent = '+ Compare'; }
  if (slot === 'A') carA = null; else carB = null;
  document.getElementById('slot' + slot).classList.remove('filled');
  document.getElementById('slot' + slot + '-empty').style.display = 'block';
  document.getElementById('slot' + slot + '-filled').style.display = 'none';
  document.getElementById('compareResults').style.display = 'none';
  updateCompareBtn();
}

function updateCompareBtn() {
  const btn = document.getElementById('runCompareBtn');
  if (carA && carB) {
    btn.disabled = false;
    btn.textContent = 'Compare ' + carA.name + ' vs ' + carB.name + ' →';
  } else {
    btn.disabled = true;
    btn.textContent = 'Select 2 cars to compare';
  }
}

function runComparison() {
  if (!carA || !carB) return;

  document.getElementById('th-a').textContent = carA.name;
  document.getElementById('th-b').textContent = carB.name;

  const setWin = (idA, idB, vA, vB) => {
    const a = document.getElementById(idA), b = document.getElementById(idB);
    a.className = ''; b.className = '';
    if (vA > vB) { a.classList.add('win'); b.classList.add('lose'); }
    else if (vB > vA) { b.classList.add('win'); a.classList.add('lose'); }
  };

  document.getElementById('r-year-a').textContent = carA.year;
  document.getElementById('r-year-b').textContent = carB.year;
  setWin('r-year-a', 'r-year-b', carA.year, carB.year);

  document.getElementById('r-type-a').textContent = carA.type;
  document.getElementById('r-type-b').textContent = carB.type;

  document.getElementById('r-hp-a').textContent = carA.hp + ' HP';
  document.getElementById('r-hp-b').textContent = carB.hp + ' HP';
  setWin('r-hp-a', 'r-hp-b', carA.hp, carB.hp);

  document.getElementById('r-price-a').textContent = carA.price.toLocaleString() + ' DT';
  document.getElementById('r-price-b').textContent = carB.price.toLocaleString() + ' DT';
  setWin('r-price-a', 'r-price-b', -carA.price, -carB.price);

  const scorePrice = (p1, p2) => {
    const min = Math.min(p1, p2), max = Math.max(p1, p2);
    return [Math.round(100 - ((p1 - min) / (max - min || 1)) * 50),
            Math.round(100 - ((p2 - min) / (max - min || 1)) * 50)];
  };
  const scoreHP = (h1, h2) => {
    const max = Math.max(h1, h2);
    return [Math.round((h1 / max) * 100), Math.round((h2 / max) * 100)];
  };
  const scoreAge = (y1, y2) => {
    const now = new Date().getFullYear(), max = Math.max(now - y1, now - y2);
    return [Math.round(100 - (((now - y1) / (max || 1)) * 60)),
            Math.round(100 - (((now - y2) / (max || 1)) * 60))];
  };

  const [ps1, ps2] = scorePrice(carA.price, carB.price);
  const [hs1, hs2] = scoreHP(carA.hp, carB.hp);
  const [as1, as2] = scoreAge(carA.year, carB.year);

  const setBar = (id, labelId, val) => {
    setTimeout(() => { document.getElementById(id).style.width = val + '%'; }, 80);
    document.getElementById(labelId).textContent = val;
  };

  setBar('cbar-price-a', 'cbl-price-a', ps1);
  setBar('cbar-price-b', 'cbl-price-b', ps2);
  setBar('cbar-hp-a', 'cbl-hp-a', hs1);
  setBar('cbar-hp-b', 'cbl-hp-b', hs2);
  setBar('cbar-age-a', 'cbl-age-a', as1);
  setBar('cbar-age-b', 'cbl-age-b', as2);

  const total1 = Math.round((ps1 + hs1 + as1) / 3);
  const total2 = Math.round((ps2 + hs2 + as2) / 3);

  document.getElementById('v-score-a').textContent = total1;
  document.getElementById('v-score-b').textContent = total2;
  document.getElementById('v-name-a').textContent = carA.name;
  document.getElementById('v-name-b').textContent = carB.name;
  document.getElementById('v-winner-a').textContent = '';
  document.getElementById('v-winner-b').textContent = '';

  if (total1 > total2) document.getElementById('v-winner-a').textContent = '★ Better choice';
  else if (total2 > total1) document.getElementById('v-winner-b').textContent = '★ Better choice';
  else { document.getElementById('v-winner-a').textContent = 'Tie'; document.getElementById('v-winner-b').textContent = 'Tie'; }

  document.getElementById('compareResults').style.display = 'block';
  document.getElementById('compareResults').scrollIntoView({ behavior: 'smooth' });
}