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
    initHomePage();
    initCarDetailsPage();
});
function initHomePage() {
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
function inquire(carId) {
    const car = allCars.find(c => c.id === carId);
    const select = document.getElementById('car-interest');
    if (car && select) select.value = `${car.brand} ${car.model}`;
    const contact = document.getElementById('contact');
    if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = 'indx.html#contact';
    }
}
function updateModels() {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model');
    model.innerHTML = '<option value="">Any Model</option>';
    const models = {
        bmw: ["M3", "Série 3", "X4", "IX"],
        porsche: ["911", "TAYCAN", "Taycan Cross Turismo"],
        mercedes: ["911", "Cayenne", "Panamera"],
        audi: ["RS7", "R8", "E-tron GT"],
        ford: ["Mustang", "RAPTOR"]
    };
    if (models[make]) {
        models[make].forEach(m => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            model.appendChild(opt);
        });
    }
}
function startSearch() {
    const make = document.getElementById('make').value.toLowerCase();
    const model = document.getElementById('model').value.toLowerCase();
    let filtered = allCars;
    if (make) filtered = filtered.filter(c => c.brand.toLowerCase() === make);
    if (model) filtered = filtered.filter(c => c.model.toLowerCase() === model);
    displayCars(filtered);
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
}

function renderCarDetails(car, container) {
    if (!car) {
        container.innerHTML = `
            <h2>Car not found</h2>
            <p style="color:#00f0ff; font-weight:bold;">The car id in the URL is invalid.</p>
            <a class="back-link" href="indx.html#collection">Back to collection</a>
        `;
        return;
    }
    container.innerHTML = `
        <div class="details-card">
            <img class="details-image" src="${car.image}" alt="${car.brand} ${car.model}">
            <h2>${car.brand} ${car.model} ${car.year}</h2>
            <p class="details-price">${car.price.toLocaleString()} DT</p>
            <p class="details-specs">${car.specs}</p>
            <p class="details-description">${car.description || ''}</p>
            <div class="details-actions">
                <button class="buy-btn" onclick="inquire(${car.id})">Buy Now</button>
                <a class="back-link" href="indx.html#collection">Back to collection</a>
            </div>
        </div>
    `;
}
/*const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you! We will contact you soon about your inquiry.');
        e.target.reset();
    });
}*/