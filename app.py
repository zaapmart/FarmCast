from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Example data storage (in-memory)
data_store = {
    "profile": {"name": "John Doe", "farms": []},
    "activities": [],
    "todo_list": [],
    "crop_info": {
        "name": "Rice",
        "variety": "Jasmine",
        "planting_season": "May to June",
        "expected_harvest": "September to October",
        "notes": "Requires consistent watering and prefers a tropical climate."
    }
}

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/add-activity')
def add_activity():
    return render_template('add-activity.html')

@app.route('/view-activities')
def view_activities():
    return render_template('view-activities.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')

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

@app.route('/todo_list', methods=['GET', 'POST'])
def todo_list():
    if request.method == 'POST':
        data = request.json
        data_store['todo_list'].append(data)
        return jsonify({"status": "success"})
    return jsonify(data_store['todo_list'])

@app.route('/crop_info', methods=['GET'])
def crop_info():
    return jsonify(data_store['crop_info'])

if __name__ == '__main__':
    app.run(debug=True)
