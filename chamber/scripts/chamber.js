document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = 'df3fd57c026a2469ab01e45aad9a3fdf'; // OpenWeatherMap API key
    const city = 'Moatize, MZ'; // City and country code
    const units = 'metric'; // Use 'imperial' for Fahrenheit
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

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
        {
            name: "Gamma",
            address: "789 Factory Ave, Industry City",
            phone: "(555) 654-3210",
            website: "https://gammaindustries.com",
            image: "page-profile.webp",
            membershipLevel: 1,
            description: "Manufacturers of premium-grade industrial goods."
        },
        {
            name: "Delta Design",
            address: "101 Art Ln, Design District",
            phone: "(555) 111-2222",
            website: "https://deltadesign.com",
            image: "page-profile.webp",
            membershipLevel: 3,
            description: "Creative agency specializing in branding."
        },
        {
            name: "Epsilon Solutions",
            address: "202 Tech Blvd, Silicon Valley",
            phone: "(555) 333-4444",
            website: "https://epsilonsolutions.com",
            image: "page-profile.webp",
            membershipLevel: 2,
            description: "Pioneering software development and IT consulting."
        },
        {
            name: "Zeta Group",
            address: "303 Retail Park, Shop City",
            phone: "(555) 555-6666",
            website: "https://zetagroup.com",
            image: "page-profile.webp",
            membershipLevel: 1,
            description: "Retail management and supply chain specialists."
        }
    ];

    // Function to fetch and display weather data
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
                .filter((_, index) => index % 8 === 0) // 3-day forecast
                .slice(0, 3)
                .map(item => {
                    const date = new Date(item.dt_txt);
                    return `
                        <div>
                            <h3>${date.toDateString()}</h3>
                            <p>Temp: ${item.main.temp}°C</p>
                            <p>${item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}</p>
                        </div>
                    `;
                })
                .join('');
            document.getElementById('weather-forecast').innerHTML = forecastHtml;
        } catch (error) {
            document.getElementById('current-weather').textContent = 'Error fetching weather data.';
            document.getElementById('weather-forecast').textContent = 'Error fetching forecast.';
            console.error(error);
        }
    }

    // Function to render spotlight members
    function renderSpotlight() {
        const spotlightCandidates = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        const shuffledCandidates = spotlightCandidates.sort(() => 0.5 - Math.random());
        const spotlightMembers = shuffledCandidates.slice(0, 3);

        const spotlightContainer = document.querySelector('.spotlight-container');
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

    fetchWeatherData();
    renderSpotlight();
});




/*
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

document.addEventListener('DOMContentLoaded', async () => {
    const directory = document.getElementById('directory');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');

    const response = await fetch('data/members.json');
    const members = await response.json();

    function renderMembers(view = 'grid') {
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
    }

    const menuIcon = document.getElementById('menu');
    const navLinks = document.getElementById('nav-links');
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuIcon.classList.toggle('open');
    });

    gridViewBtn.addEventListener('click', () => renderMembers('grid'));
    listViewBtn.addEventListener('click', () => renderMembers('list'));

    renderMembers('grid');
});
*/