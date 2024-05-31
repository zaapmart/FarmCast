// auth.js

// Dummy user database (replace with real database in a production environment)
const users = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' }
    // Add more users as needed
];

// Function to handle form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Find user by email
    const user = users.find(user => user.email === email);

    // Check if user exists and password matches
    if (user && user.password === password) {
        // Redirect to dashboard or homepage (replace 'dashboard.html' with actual URL)
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});
