FarmCast
FarmCast is an innovative web application designed to help farmers manage their agricultural activities more efficiently. Leveraging real-time weather data, the application provides insights and reminders for key farming tasks, aiming to enhance productivity and reduce losses due to adverse weather conditions.

FarmCast was conceived in response to the challenges faced by farmers in managing time-sensitive agricultural activities. The idea emerged after personal experiences with rice farming, where unanticipated weather changes led to significant losses. FarmCast aims to provide farmers with a tool to better plan and execute their farming tasks, thereby improving efficiency and reducing risks.

Features
Current Weather Information:

Displays real-time weather data for the farm location.
Provides detailed weather conditions including temperature, humidity, and wind speed.
3-Hour Weather Forecast:

Shows weather forecasts in 3-hour intervals for the next 24 hours.
Helps farmers plan their activities based on upcoming weather conditions.
Farm Management:

Allows users to add and manage multiple farms.
Stores essential farm details such as location and crop type.
Activity Tracking:

Users can log and monitor various farm activities.
Keeps track of completed and pending tasks to ensure timely execution.
Crop Information:

Provides detailed information about different crops.
Includes planting seasons, expected harvest times, and care instructions.
Architecture
The architecture of FarmCast is designed to ensure seamless data flow and user interaction. Below is a high-level diagram of the architecture:

Frontend:

Built with HTML5, CSS3, and JavaScript to create a responsive and interactive user interface.
Communicates with the backend via RESTful APIs.
Backend:

Developed using Flask, a lightweight Python web framework.
Handles API requests, data processing, and serves static files.
Data Integration:

Integrates with the OpenWeather API to fetch real-time weather data.
Stores user data in an in-memory data structure (for this prototype).
Technologies Used
Frontend:

HTML5, CSS3, JavaScript: For building the user interface.
No additional frameworks were used to keep the project simple and focus on core JavaScript skills.
Backend:

Flask: Chosen for its simplicity and flexibility in handling HTTP requests and serving as the application’s backend.
API Integration:

OpenWeather API: Used to fetch real-time weather data and forecasts.
Installation
To run FarmCast locally, follow these steps:

Clone the repository:
git clone https://github.com/zaapmart/Farmcast.git

cd farmcast
Create a virtual environment:

python -m venv venv
source venv/bin/activate # On Windows, use `venv\Scripts\activate`
Install the dependencies:

pip install -r requirements.txt
Run the Flask application:

python app.py
Open your web browser and navigate to http://127.0.0.1:5000.

Usage
Once the application is running, you can:

View current weather conditions and 3-hour forecasts.
Add and manage farm details.
Log and track farm activities.
Access detailed crop information.

Contributing
We welcome contributions to FarmCast! If you have suggestions for new features or improvements, feel free to fork the repository and submit a pull request. Please ensure that your contributions align with the project's goals and coding standards.

Authot: Kufre Akpan [contactkufreakpan@gmail.com]
