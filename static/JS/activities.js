document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'f3c17a1d089141d4d04ca6d5ac44957e';
    const lat = 6.7133054;
    const lon = 8.7001492;

    fetchCurrentWeather(apiKey, lat, lon);
    fetchThreeHourForecast(apiKey, lat, lon);
});

function fetchCurrentWeather(apiKey, lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].main.toLowerCase();
            document.getElementById('current-weather-description').textContent = data.weather[0].description;
            document.getElementById('current-temperature').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('current-humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('current-wind').textContent = `Wind: ${data.wind.speed} km/h`;

            const currentWeatherImg = document.getElementById('current-weather-img');
            if (weather.includes('sun')) {
                currentWeatherImg.src = 'images/sunny.png';
                currentWeatherImg.alt = 'Sunny';
            } else if (weather.includes('rain')) {
                currentWeatherImg.src = 'images/rainy.png';
                currentWeatherImg.alt = 'Rainy';
            } else {
                currentWeatherImg.src = 'images/cloudy.png';
                currentWeatherImg.alt = 'Cloudy';
            }
        })
        .catch(error => console.error('Error fetching current weather data:', error));
}

function fetchThreeHourForecast(apiKey, lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecast = data.list.slice(0, 8); // Get the next 24 hours (8 * 3-hour segments)
            const forecastContainer = document.getElementById('three-hour-forecast');

            forecastContainer.innerHTML = forecast.map(segment => {
                const date = new Date(segment.dt * 1000);
                return `
                    <div class="forecast-segment">
                        <p><strong>${date.getHours()}:00</strong></p>
                        <img src="https://openweathermap.org/img/wn/${segment.weather[0].icon}@2x.png" alt="${segment.weather[0].description}">
                        <p>${segment.weather[0].description}</p>
                        <p>Temp: ${segment.main.temp}°C</p>
                        <p>Humidity: ${segment.main.humidity}%</p>
                        <p>Wind: ${segment.wind.speed} km/h</p>
                    </div>
                `;
            }).join('');
        })
        .catch(error => console.error('Error fetching 3-hour forecast data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const addFarmButton = document.getElementById('add-farm-button');
    const addFarmForm = document.getElementById('add-farm-form');
    const farmDetailsForm = document.getElementById('farm-details-form');
    const farmList = document.getElementById('farm-list');

    addFarmButton.addEventListener('click', () => {
        addFarmForm.style.display = 'block';
    });

    farmDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const farmName = document.getElementById('farm-name').value;
        const farmLocation = document.getElementById('farm-location').value;
        const cropType = document.getElementById('crop-type').value;

        // Add the new farm to the farm list
        const farmItem = document.createElement('li');
        farmItem.textContent = `${farmName} - ${farmLocation} - ${cropType}`;
        farmList.appendChild(farmItem);

        // Clear the form
        farmDetailsForm.reset();
        addFarmForm.style.display = 'none';
    });
});