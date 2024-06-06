// Function to login a user
function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a user login object
    const userLogin = {
        email,
        password
    };

    // Send login data to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogin)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '/dashboard';
        } else {
            console.error('Login failed:', data.message);
            alert('Invalid email or password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error logging in user:', error);
        alert('Error logging in user');
    });
}

// Function to register a new user
function registerUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Create a new user object
    const newUser = {
        email,
        password,
        name,
        phone
    };

    console.log("Registration Data:", newUser); // Log the data to the console

    // Send user data to the server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('registration-message').style.display = 'block';
        } else {
            console.error('Error registering user:', data);
            alert('Error registering user');
        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
        alert('Error registering user');
    });
}

// Add event listener to the form submission event
document.getElementById('registration-form').addEventListener('submit', registerUser);
