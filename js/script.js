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

// Google Maps initialization
function initMap() {
    // Черно-белый стиль карты
    const mapStyles = [
        { elementType: "geometry", stylers: [{ color: "#0a0a0a" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#cccccc" }]
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#888888" }]
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#1a1a1a" }]
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#666666" }]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#1a1a1a" }]
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#333333" }]
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#888888" }]
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#2a2a2a" }]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#444444" }]
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#1a1a1a" }]
        },
        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#888888" }]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#000000" }]
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#555555" }]
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#000000" }]
        }
    ];

    // Центр карты - Москва
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: 50, lng: 40 },
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
    });

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

    // Добавление маркеров
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: location.type === 'main' ? 10 : location.type === 'major' ? 8 : location.type === 'international' ? 6 : 5,
                fillColor: location.type === 'international' ? '#cccccc' : '#ffffff',
                fillOpacity: 1,
                strokeColor: '#000000',
                strokeWeight: 2
            }
        });

        // Информационное окно при клике
        const infoWindow = new google.maps.InfoWindow({
            content: `<div style="color: #000; font-family: 'Nasalization', Arial, sans-serif; padding: 10px;">
                        <strong>${location.title}</strong><br>
                        MARSIANS MCC
                      </div>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Вызов функции при загрузке страницы
window.initMap = initMap;

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
        const membersContainer = document.getElementById('members-container');

        if (!membersContainer) return;

        // Separate FIRST5 and regular members
        const first5 = members.filter(m => m.role === 'FIRST5');
        const regularMembers = members.filter(m => m.role === 'MEMBER');

        // Display FIRST5 first
        const allMembers = [...first5, ...regularMembers];

        membersContainer.innerHTML = allMembers.map(member => `
            <div class="member-card ${member.role === 'FIRST5' ? 'first5' : ''}">
                <div class="member-image" style="background-image: url('${member.image}')"></div>
                <div class="member-info">
                    <div class="member-role">${member.role}</div>
                    <h3 class="member-name">${member.name}</h3>
                    <div class="member-title">${member.title}</div>
                    <div class="member-achievements">${member.achievements}</div>
                    <div class="member-bike">${member.bike}</div>
                </div>
            </div>
        `).join('');
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

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    loadMembers();
});
