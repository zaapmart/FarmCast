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
