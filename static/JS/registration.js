// Function to register a new user
function registerUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Log form data for debugging
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Name:', name);
    console.log('Phone:', phone);

    // Create a new user object
    const newUser = {
        email,
        password,
        name,
        phone
    };

    // Log new user object for debugging
    console.log('New user:', newUser);

    // Display registration message
    document.getElementById('registration-message').style.display = 'block';
}
