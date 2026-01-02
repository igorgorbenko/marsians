// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate burger icon
    const spans = burger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = burger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.8)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Smooth reveal on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .objective-card, .level-card, .stat-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hero section is always visible
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'none';

// Leaflet Map initialization
function initMap() {
    // Все города с координатами
    const locations = [
        // Россия - Москва и область
        { lat: 55.7558, lng: 37.6173, title: "Москва", type: "main" },
        { lat: 55.8970, lng: 37.4400, title: "Химки" },
        { lat: 55.8200, lng: 37.3300, title: "Красногорск" },
        { lat: 55.6745, lng: 37.8976, title: "Люберцы" },
        { lat: 55.6444, lng: 38.0056, title: "Малаховка" },
        { lat: 56.0097, lng: 37.4819, title: "Лобня" },
        { lat: 55.8195, lng: 37.6111, title: "Останкино" },
        { lat: 56.3333, lng: 36.7333, title: "Клин" },

        // Россия - другие города
        { lat: 59.9343, lng: 30.3351, title: "Санкт-Петербург", type: "major" },
        { lat: 56.8587, lng: 35.9176, title: "Тверь" },
        { lat: 56.2965, lng: 43.9361, title: "Нижний Новгород" },
        { lat: 57.6261, lng: 39.8845, title: "Ярославль" },
        { lat: 53.1959, lng: 50.1002, title: "Самара" },
        { lat: 53.5303, lng: 49.3461, title: "Тольятти" },
        { lat: 54.1838, lng: 45.1749, title: "Саранск" },
        { lat: 48.7850, lng: 44.5147, title: "Волжский" },
        { lat: 45.0355, lng: 38.9753, title: "Краснодар" },
        { lat: 59.1374, lng: 37.9067, title: "Череповец" },
        { lat: 58.1984, lng: 68.2544, title: "Тобольск" },

        // Международные
        { lat: 53.1435, lng: 8.2146, title: "Олденбург, Германия", type: "international" },
        { lat: 32.6669, lng: -16.9241, title: "Мадейра, Португалия", type: "international" },
        { lat: 40.1792, lng: 44.4991, title: "Ереван, Армения", type: "international" },
        { lat: 25.2048, lng: 55.2708, title: "Дубай, ОАЭ", type: "international" },
        { lat: 32.6739, lng: 35.2985, title: "Мигдаль Ха Эмек, Израиль", type: "international" },
        { lat: 24.7136, lng: 46.6753, title: "Рияд, Саудовская Аравия", type: "international" },
        { lat: 36.5166, lng: 1.3166, title: "Тенес, Алжир", type: "international" },
        { lat: -4.0669, lng: -78.9536, title: "Замора, Эквадор", type: "international" },
        { lat: 44.7333, lng: 18.0833, title: "Добой, Босния", type: "international" }
    ];

    // Инициализация карты
    const map = L.map('map', {
        center: [50, 40],
        zoom: 3,
        zoomControl: true
    });

    // Черно-белая тема для карты
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Добавление маркеров
    locations.forEach(location => {
        const markerSize = location.type === 'main' ? 12 :
                          location.type === 'major' ? 10 :
                          location.type === 'international' ? 8 : 7;

        const markerColor = location.type === 'international' ? '#cccccc' : '#ffffff';

        // Создание кастомной иконки
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                width: ${markerSize}px;
                height: ${markerSize}px;
                background-color: ${markerColor};
                border: 2px solid #000000;
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            "></div>`,
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize / 2]
        });

        const marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map);

        // Popup при клике
        marker.bindPopup(`
            <div style="
                font-family: 'Nasalization', Arial, sans-serif;
                padding: 10px;
                color: #ffffff;
                background: #000000;
                border: 1px solid #ffffff;
                letter-spacing: 1px;
            ">
                <strong style="font-size: 12px;">${location.title}</strong><br>
                <span style="font-size: 10px; color: #cccccc;">MARSIANS MCC</span>
            </div>
        `);
    });
}

// Вызов функции при загрузке страницы (когда Leaflet готов)
if (typeof L !== 'undefined') {
    window.addEventListener('load', initMap);
} else {
    document.addEventListener('DOMContentLoaded', initMap);
}

// Load and display events
async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        const eventsContainer = document.getElementById('events-container');

        if (!eventsContainer) return;

        // Sort events by date (newest first)
        events.sort((a, b) => new Date(b.date) - new Date(a.date));

        eventsContainer.innerHTML = events.map(event => `
            <article class="event-card">
                <div class="event-image" style="background-image: url('${event.image}')">
                    <div class="event-category">${event.category}</div>
                </div>
                <div class="event-content">
                    <div class="event-date">${formatDate(event.date)}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Load and display members
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Load FIRST5
        const first5Container = document.getElementById('first5-container');
        const first5 = members.filter(m => m.role === 'FIRST5');

        if (first5Container) {
            first5Container.innerHTML = first5.map(member => `
                <div class="first5-item">
                    <div class="first5-position">F5.</div>
                    <div class="first5-nickname">${member.nickname}</div>
                    <div class="first5-name">${member.name} (${member.location})</div>
                </div>
            `).join('');
        }

        // Load regular members for carousel
        const membersContainer = document.getElementById('members-container');
        const regularMembers = members.filter(m => m.role === 'MEMBER');

        if (membersContainer) {
            membersContainer.innerHTML = regularMembers.map(member => `
                <div class="member-card">
                    <div class="member-image" style="background-image: url('${member.image}')"></div>
                    <div class="member-info">
                        <h3 class="member-nickname">${member.nickname}</h3>
                        <div class="member-name">${member.name}</div>
                        <div class="member-location">${member.location}</div>
                    </div>
                </div>
            `).join('');

            // Initialize members carousel after loading
            setTimeout(initMembersCarousel, 100);
        }
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

// Format date to Russian format
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

// Events Carousel
let currentSlide = 0;
let totalSlides = 0;

function getCardsPerView() {
    // Responsive cards per view
    if (window.innerWidth <= 768) return 1;
    return 3;
}

function initCarousel() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const track = document.getElementById('events-container');
    const carousel = document.querySelector('.events-carousel');

    if (!track || !prevBtn || !nextBtn || !carousel) return;

    totalSlides = track.children.length;

    // Button click handlers
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        if (currentSlide < totalSlides - cardsPerView) {
            currentSlide++;
            updateCarousel();
        }
    });

    // Mouse wheel scroll
    carousel.addEventListener('wheel', (e) => {
        e.preventDefault();
        const cardsPerView = getCardsPerView();

        if (e.deltaY > 0) {
            // Scroll down/right - next
            if (currentSlide < totalSlides - cardsPerView) {
                currentSlide++;
                updateCarousel();
            }
        } else {
            // Scroll up/left - prev
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }
    }, { passive: false });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const cardsPerView = getCardsPerView();
        const swipeThreshold = 50;

        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - next
            if (currentSlide < totalSlides - cardsPerView) {
                currentSlide++;
                updateCarousel();
            }
        }

        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right - prev
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }
    }

    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('events-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!track || !track.children.length) return;

    const cardsPerView = getCardsPerView();

    // Calculate card width including gap
    const carousel = track.parentElement;
    const carouselWidth = carousel.offsetWidth;
    const gap = 30;
    const cardWidth = (carouselWidth - (cardsPerView - 1) * gap) / cardsPerView;

    // Move by one card width + gap
    const offset = currentSlide * -(cardWidth + gap);
    track.style.transform = `translateX(${offset}px)`;

    // Update button states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= totalSlides - cardsPerView;
}

// Members Carousel
let currentMemberSlide = 0;
let totalMemberSlides = 0;

function getMemberCardsPerView() {
    // Show 5 cards on desktop, 1 on mobile
    if (window.innerWidth <= 768) return 1;
    return 5;
}

function initMembersCarousel() {
    const prevBtn = document.querySelector('.members-prev');
    const nextBtn = document.querySelector('.members-next');
    const track = document.getElementById('members-container');

    if (!track || !track.children.length) return;

    totalMemberSlides = track.children.length;
    currentMemberSlide = 0;

    // Add click handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentMemberSlide > 0) {
                currentMemberSlide--;
                updateMembersCarousel();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cardsPerView = getMemberCardsPerView();
            if (currentMemberSlide < totalMemberSlides - cardsPerView) {
                currentMemberSlide++;
                updateMembersCarousel();
            }
        });
    }

    // Add mouse wheel scroll
    const carousel = track.parentElement;
    if (carousel) {
        carousel.addEventListener('wheel', (e) => {
            e.preventDefault();
            const cardsPerView = getMemberCardsPerView();
            if (e.deltaY > 0 && currentMemberSlide < totalMemberSlides - cardsPerView) {
                currentMemberSlide++;
                updateMembersCarousel();
            } else if (e.deltaY < 0 && currentMemberSlide > 0) {
                currentMemberSlide--;
                updateMembersCarousel();
            }
        });

        // Add touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleMembersSwipe();
        });

        function handleMembersSwipe() {
            const cardsPerView = getMemberCardsPerView();
            if (touchStartX - touchEndX > 50 && currentMemberSlide < totalMemberSlides - cardsPerView) {
                currentMemberSlide++;
                updateMembersCarousel();
            } else if (touchEndX - touchStartX > 50 && currentMemberSlide > 0) {
                currentMemberSlide--;
                updateMembersCarousel();
            }
        }
    }

    updateMembersCarousel();
}

function updateMembersCarousel() {
    const track = document.getElementById('members-container');
    const prevBtn = document.querySelector('.members-prev');
    const nextBtn = document.querySelector('.members-next');

    if (!track || !track.children.length) return;

    const cardsPerView = getMemberCardsPerView();

    // Calculate card width including gap
    const carousel = track.parentElement;
    const carouselWidth = carousel.offsetWidth;
    const gap = 20;
    const cardWidth = (carouselWidth - (cardsPerView - 1) * gap) / cardsPerView;

    // Move by one card width + gap
    const offset = currentMemberSlide * -(cardWidth + gap);
    track.style.transform = `translateX(${offset}px)`;

    // Update button states
    if (prevBtn) prevBtn.disabled = currentMemberSlide === 0;
    if (nextBtn) nextBtn.disabled = currentMemberSlide >= totalMemberSlides - cardsPerView;
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadEvents().then(() => {
        // Initialize carousel after events are loaded
        setTimeout(initCarousel, 100);
    });
    loadMembers();
});

// Update carousels on window resize
window.addEventListener('resize', () => {
    updateCarousel();
    updateMembersCarousel();
});
