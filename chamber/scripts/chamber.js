// Set current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

// Main functionality
document.addEventListener('DOMContentLoaded', async () => {
    // Constants
    const apiKey = 'df3fd57c026a2469ab01e45aad9a3fdf';
    const city = 'Moatize, MZ';
    const units = 'metric';
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
    const directory = document.getElementById('directory');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const menuIcon = document.getElementById('menu');
    const navLinks = document.getElementById('nav-links');
    const spotlightContainer = document.querySelector('.spotlight-container');

    // Member data (local members for spotlight)
    const members = [
        {
            name: "Alpha Corp",
            address: "123 Business Rd, Capital City",
            phone: "(555) 123-4567",
            website: "https://alphacorp.com",
            image: "page-profile.webp",
            membershipLevel: 3,
            description: "Leading solutions in tech and innovation."
        },
        {
            name: "Beta Enterprises",
            address: "456 Market St, Business Town",
            phone: "(555) 987-6543",
            website: "https://betaent.com",
            image: "page-profile.webp",
            membershipLevel: 2,
            description: "Expertise in financial services and management."
        },
        // Additional members here...
    ];

    // Fetch weather data
    async function fetchWeatherData() {
        try {
            const weatherResponse = await fetch(weatherEndpoint);
            const weatherData = await weatherResponse.json();
            const currentTemp = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            document.getElementById('current-weather').innerHTML = `
                Temperature: ${currentTemp}°C<br>
                Description: ${description.charAt(0).toUpperCase() + description.slice(1)}
            `;

            const forecastResponse = await fetch(forecastEndpoint);
            const forecastData = await forecastResponse.json();
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
            document.getElementById('weather-forecast').innerHTML = forecastHtml;
        } catch (error) {
            console.error(error);
            document.getElementById('current-weather').textContent = 'Error fetching weather data.';
            document.getElementById('weather-forecast').textContent = 'Error fetching forecast.';
        }
    }

    // Render spotlight members
    function renderSpotlight() {
        const spotlightCandidates = members.filter(member => member.membershipLevel >= 2);
        const shuffledCandidates = spotlightCandidates.sort(() => 0.5 - Math.random());
        const spotlightMembers = shuffledCandidates.slice(0, 3);

        spotlightContainer.innerHTML = spotlightMembers.map(member => `
            <div class="spotlight-card">
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership Level: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
            </div>
        `).join('');
    }

    // Render directory members
    async function renderMembers(view = 'grid') {
        try {
            const response = await fetch('data/members.json');
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

    // Menu toggle
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuIcon.classList.toggle('open');
    });

    gridViewBtn.addEventListener('click', () => renderMembers('grid'));
    listViewBtn.addEventListener('click', () => renderMembers('list'));

    fetchWeatherData();
    renderSpotlight();
    renderMembers('grid');
});
