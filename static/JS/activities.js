document.addEventListener('DOMContentLoaded', function() {
    const activityForm = document.getElementById('activity-form');

    if (activityForm) {
        activityForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const activityName = document.getElementById('activity-name').value;
            const activityDate = document.getElementById('activity-date').value;
            const weatherCondition = document.getElementById('weather-condition').value;
            const resourcesNeeded = document.getElementById('resources-needed').value;

            const activityData = {
                name: activityName,
                date_added: activityDate,
                ideal_weather: weatherCondition,
                resources_needed: resourcesNeeded,
                status: 'pending'
            };

            fetch('/add_activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activityData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Activity added successfully!');
                    activityForm.reset();
                } else {
                    alert('Failed to add activity.');
                }
            })
            .catch(error => {
                console.error('Error adding activity:', error);
            });
        });
    } else {
        console.error('Error: activityForm element is null');
    }
});