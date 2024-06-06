function logoutUser(event) {
    event.preventDefault(); // Prevent the default link behavior

    fetch('/logout', {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/login';
        } else {
            console.error('Logout failed');
            alert('Error logging out');
        }
    })
    .catch(error => {
        console.error('Error logging out user:', error);
        alert('Error logging out user');
    });
}

// Add event listener to the logout button
document.getElementById('logout-button').addEventListener('click', logoutUser);