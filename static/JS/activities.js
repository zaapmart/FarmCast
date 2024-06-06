document.addEventListener('DOMContentLoaded', function() {
    // Wait for the DOM content to be fully loaded
    const activityForm = document.getElementById('activity-form');

    // Check if the form element is available
    if (activityForm) {
        // Add event listener for form submission
        activityForm.addEventListener('submit', function(e) {
            // Prevent default form submission behavior
            e.preventDefault();

            // Retrieve form input values
            const activityName = document.getElementById('activity-name').value;
            const activityDate = document.getElementById('activity-date').value;
            const weatherCondition = document.getElementById('weather-condition').value;
            const resourcesNeeded = document.getElementById('resources-needed').value;

            // Construct activity data object
            const activityData = {
                name: activityName,
                date_added: activityDate,
                ideal_weather: weatherCondition,
                resources_needed: resourcesNeeded,
                status: 'pending'
            };

            // Send POST request to add activity
            fetch('/add_activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activityData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle response
                if (data.status === 'success') {
                    // Show success message and reset form
                    alert('Activity added successfully!');
                    activityForm.reset();
                } else {
                    // Show error message
                    alert('Failed to add activity.');
                }
            })
            .catch(error => {
                // Log error to console
                console.error('Error adding activity:', error);
            });
        });
    } else {
        // Log error if form element is not found
        console.error('Error: activityForm element is null');
    }
});
