// Dummy credentials (hashed using SHA-256)
const dummyCredentials = {
    username: 'user1',
    passwordHash: 'b2a5cddbdf83fded9dbf0d08b2cf5d3c535f6c08c51b9b47b614449be4b6cbe1' // Hash of 'pass1'
};

// Hashing function using SHA-256
async function hashData(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get the entered username and password
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    // Hash the entered password
    const enteredPasswordHash = await hashData(enteredPassword);

    // Check if the entered credentials match the dummy credentials
    if (enteredUsername === dummyCredentials.username && enteredPasswordHash === dummyCredentials.passwordHash) {
        // Hide the login form and show the request form
        document.getElementById('loginFormContainer').style.display = 'none';
        document.getElementById('requestFormContainer').style.display = 'block';
    } else {
        // Show an error message
        alert('Invalid username or password');
    }
});

// Handle salary advance/IOU request form submission
document.getElementById('advanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(this);

    // Convert FormData to URL-encoded string
    const urlEncodedData = new URLSearchParams(formData).toString();

    // Send the form data to Formspree
    fetch('https://formspree.io/f/mwpeolzz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncodedData
    })
    .then(response => {
        if (response.ok) {
            alert('Form submitted successfully!');
            this.reset();
        } else {
            alert('Error submitting form.');
        }
    })
    .catch(error => console.error('Error:', error));
});
