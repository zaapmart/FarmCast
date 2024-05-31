document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'f3c17a1d089141d4d04ca6d5ac44957e';
    const lat = 6.7133054;
    const lon = 8.7001492;

    fetchCurrentWeather(apiKey, lat, lon);
    fetchThreeHourForecast(apiKey, lat, lon);

    // Fetch profile data and display
    fetchProfileData();

    // Fetch and display other data (activities, todo_list, etc.)
    fetchActivities();
    fetchTodoList();
    fetchCropInfo();

    // Handle adding new farms
    const addFarmButton = document.getElementById('add-farm-button');
    const addFarmForm = document.getElementById('add-farm-form');
    const farmDetailsForm = document.getElementById('farm-details-form');
    const farmList = document.getElementById('farm-list');

    addFarmButton.addEventListener('click', () => {
        addFarmForm.style.display = 'block';
    });

    farmDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const farmName = document.getElementById('farm-name').value;
        const farmLocation = document.getElementById('farm-location').value;
        const farmCoordinates = document.getElementById('farm-coordinates').value;
        const cropName = document.getElementById('crop-name').value;
        const cropSpecies = document.getElementById('crop-species').value;
        const plantingSeason = document.getElementById('planting-season').value;
        const expectedHarvest = document.getElementById('expected-harvest').value;

        const newFarm = {
            name: farmName,
            location: farmLocation,
            coordinates: farmCoordinates,
            crop_name: cropName,
            crop_species: cropSpecies,
            planting_season: plantingSeason,
            expected_harvest: expectedHarvest
        };

        console.log("New farm data:", newFarm);

        fetch('/farms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFarm)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                fetchProfileData();
                fetchCropInfo();  // Refresh crop info section
                addFarmForm.style.display = 'none';
                alert('Farm added successfully');
            } else {
                console.error('Error adding farm:', data);
                alert('Error adding farm');
            }
        })
        .catch(error => {
            console.error('Error adding farm:', error);
            alert('Error adding farm');
        });
    });

    function fetchProfileData() {
        fetch('/profile')
            .then(response => response.json())
            .then(data => {
                const currentDate = new Date().toLocaleDateString();
                document.querySelector('.profile-details').innerHTML = `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Current Date:</strong> ${currentDate}</p>
                    <p><strong>Farms:</strong></p>
                    <ul id="farm-list">
                        ${data.farms.map(farm => `
                            <li>
                                ${farm.name} - ${farm.location} - ${farm.coordinates}
                            </li>
                        `).join('')}
                    </ul>
                `;
                console.log('Profile data fetched:', data);
            })
            .catch(error => console.error('Error fetching profile data:', error));
    }

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

                if (forecastContainer) {
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
                } else {
                    console.error('Error: forecastContainer is null');
                }
            })
            .catch(error => console.error('Error fetching 3-hour forecast data:', error));
    }

    function fetchActivities() {
        fetch('/activities')
            .then(response => response.json())
            .then(data => {
                document.getElementById('activity-list').innerHTML = data.map(activity => `
                    <li>${activity.name} - ${activity.date} - ${activity.weather_condition}</li>
                `).join('');
            })
            .catch(error => console.error('Error fetching activities:', error));
    }

    function fetchTodoList() {
        fetch('/todo_list')
            .then(response => response.json())
            .then(data => {
                document.getElementById('todo-items').innerHTML = data.map(item => `
                    <li>${item.name} - ${item.deadline}</li>
                `).join('');
            })
            .catch(error => console.error('Error fetching to-do list:', error));
    }

    function fetchCropInfo() {
        fetch('/crop_info')
            .then(response => response.json())
            .then(data => {
                document.querySelector('.crop-info-content').innerHTML = `
                    <p><strong>Crop Name:</strong> ${data.name}</p>
                    <p><strong>Variety:</strong> ${data.variety}</p>
                    <p><strong>Planting Season:</strong> ${data.planting_season}</p>
                    <p><strong>Expected Harvest:</strong> ${data.expected_harvest}</p>
                    <p><strong>Notes:</strong> ${data.notes}</p>
                `;
            })
            .catch(error => console.error('Error fetching crop info:', error));
    }
});
