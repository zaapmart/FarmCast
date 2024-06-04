// Function to login a user
function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a login object
    const loginData = {
        email,
        password
    };

    console.log("Login Data:", loginData); // Log the data to the console

    // Send login data to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        console.log("Server response:", body); // Log the server response
        if (status === 200 && body.status === "success") {
            console.log("Login successful, redirecting...");
            // Display login message
            document.getElementById('login-message').style.display = 'block';
            // Redirect to the dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } else {
            console.error('Login failed:', body);
            alert(body.message || 'Login failed');
        }
    })
    .catch(error => {
        console.error('Error logging in user:', error);
        alert('Error logging in user');
    });
}

// Add event listener to the form submission event
document.getElementById('login-form').addEventListener('submit', loginUser);
