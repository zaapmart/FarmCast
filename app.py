from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Initialize empty data storage (in-memory)
data_store = {
    "profile": {"name": "", "farms": []},
    "activities": [],
    "todo_list": [],
    "crop_info": {
        "name": "",
        "variety": "",
        "planting_season": "",
        "expected_harvest": "",
        "notes": ""
    },
    "users": []
}

API_KEY = 'f3c17a1d089141d4d04ca6d5ac44957e'
LAT = 6.7133054
LON = 8.7001492

def get_current_weather():
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.json
        data_store['users'].append(data)
        return jsonify({"status": "success"})
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if request.content_type != 'application/json':
            return jsonify({"status": "fail", "message": "Content-Type must be application/json"}), 415

        data = request.json
        print(f"Login data received: {data}")
        for user in data_store['users']:
            if user['email'] == data['email'] and user['password'] == data['password']:
                print("Login successful")
                return jsonify({"status": "success"})
        print("Invalid email or password")
        return jsonify({"status": "fail", "message": "Invalid email or password"}), 401
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        data = request.json
        data_store['profile']['name'] = data['name']
        return jsonify({"status": "success"})
    return jsonify(data_store['profile'])

@app.route('/farms', methods=['GET', 'POST'])
def farms():
    if request.method == 'POST':
        data = request.json
        data_store['profile']['farms'].append(data)
        return jsonify({"status": "success"})
    return jsonify(data_store['profile']['farms'])

@app.route('/activities', methods=['GET', 'POST'])
def activities():
    if request.method == 'POST':
        data = request.json
        data_store['activities'].append(data)
        return jsonify({"status": "success"})
    return jsonify(data_store['activities'])

@app.route('/view_activities')
def view_activities():
    weather = get_current_weather()
    if weather:
        for activity in data_store['activities']:
            activity['weather'] = weather['weather'][0]['description']
    return render_template('view-activities.html', activities=data_store['activities'])

@app.route('/add_activity', methods=['GET', 'POST'])
def add_activity():
    if request.method == 'POST':
        data = request.json
        data_store['activities'].append(data)
        print(data_store['activities'])  # Debug print statement
        return jsonify({"status": "success"})
    return render_template('add-activity.html')

@app.route('/todo_list', methods=['GET', 'POST'])
def todo_list():
    if request.method == 'POST':
        data = request.json
        data_store['todo_list'].append(data)
        return jsonify({"status": "success"})
    return jsonify(data_store['todo_list'])

@app.route('/crop_info', methods=['GET'])
def crop_info():
    if data_store['profile']['farms']:
        latest_farm = data_store['profile']['farms'][-1]
        crop_info = {
            "name": latest_farm['crop_name'],
            "species": latest_farm['crop_species'],
            "planting_season": latest_farm['planting_season'],
            "expected_harvest": latest_farm['expected_harvest'],
            "notes": latest_farm.get('notes', '')
        }
        return jsonify(crop_info)
    else:
        return jsonify({"error": "No farm data available"}), 404

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(data_store['users'])

if __name__ == '__main__':
    app.run(debug=True)
