document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
    }

    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    populateFormFieldsFromURL();

    fetchWeatherData();

    renderSpotlight();
    renderMembers('grid');

    handleNavigationToggle();
    handleViewSwitch();
});

function populateFormFieldsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const fields = [
        'first-name',
        'last-name',
        'email',
        'mobile',
        'business-name',
        'timestamp',
    ];

    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.textContent = urlParams.get(field) || 'N/A';
        }
    });
}

function handleNavigationToggle() {
    const menuIcon = document.getElementById('menu');
    const navLinks = document.getElementById('nav-links');
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuIcon.classList.toggle('open');
        });
    }
}

function handleViewSwitch() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    if (gridViewBtn) gridViewBtn.addEventListener('click', () => renderMembers('grid'));
    if (listViewBtn) listViewBtn.addEventListener('click', () => renderMembers('list'));
}

async function fetchWeatherData() {
    const apiKey = 'df3fd57c026a2469ab01e45aad9a3fdf';
    const city = 'Moatize, MZ';
    const units = 'metric';
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherEndpoint);
        if (!weatherResponse.ok) throw new Error('Weather data not available.');
        const weatherData = await weatherResponse.json();

        displayCurrentWeather(weatherData);

        const forecastResponse = await fetch(forecastEndpoint);
        if (!forecastResponse.ok) throw new Error('Forecast data not available.');
        const forecastData = await forecastResponse.json();

        displayWeatherForecast(forecastData);
    } catch (error) {
        console.error(error);
        displayWeatherError();
    }
}

function displayCurrentWeather(weatherData) {
    const currentWeatherElement = document.getElementById('current-weather');
    if (currentWeatherElement) {
        const currentTemp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        currentWeatherElement.innerHTML = `
            <p>Temperature: ${currentTemp}°C</p>
            <p>Description: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        `;
    }
}

function displayWeatherForecast(forecastData) {
    const forecastElement = document.getElementById('weather-forecast');
    if (forecastElement) {
        const forecastHtml = forecastData.list
            .filter((_, index) => index % 8 === 0)
            .slice(0, 3)
            .map(item => `
                <div>
                    <h3>${new Date(item.dt_txt).toDateString()}</h3>
                    <p>Temp: ${item.main.temp}°C</p>
                    <p>${item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}</p>
                </div>
            `).join('');
        forecastElement.innerHTML = forecastHtml;
    }
}

function displayWeatherError() {
    const errorElements = ['current-weather', 'weather-forecast'];
    errorElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = 'Error fetching data.';
    });
}

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); 
        if (!response.ok) throw new Error('Failed to fetch members data.');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function renderSpotlight() {
    const spotlightContainer = document.querySelector('.spotlight-container');
    if (!spotlightContainer) return;

    const members = await fetchMembers();
    const spotlightMembers = members
        .filter(member => member.membershipLevel >= 2)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    spotlightContainer.innerHTML = spotlightMembers.map(member => `
        <div class="spotlight-card">
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Description:</strong> ${member.description}</p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
        </div>
    `).join('');
}


async function renderMembers(view = 'grid') {
    const directory = document.getElementById('directory');
    if (!directory) return;

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Members data not available.');
        const members = await response.json();

        directory.className = view === 'grid' ? 'grid-view' : 'list-view';
        directory.innerHTML = members.map(member => `
            <div class="member-card">
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership Level: ${member.level}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error(error);
        directory.innerHTML = '<p>Error loading members.</p>';
    }
}

function getMockMembers() {
    return [
        {
            name: 'Alpha Corp',
            address: '123 Business Rd, Capital City',
            phone: '(555) 123-4567',
            website: 'https://alphacorp.com',
            image: 'page-profile.webp',
            membershipLevel: 3,
        },
        {
            name: 'Beta Enterprises',
            address: '456 Market St, Business Town',
            phone: '(555) 987-6543',
            website: 'https://betaent.com',
            image: 'page-profile.webp',
            membershipLevel: 2,
        },
    ];
}


