        // Dummy credentials
        const dummyCredentials = {
            username: 'user1',
            password: 'pass1'
        };

        // Handle login form submission
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Get the entered username and password
            const enteredUsername = document.getElementById('username').value;
            const enteredPassword = document.getElementById('password').value;

            // Check if the entered credentials match the dummy credentials
            if (enteredUsername === dummyCredentials.username && enteredPassword === dummyCredentials.password) {
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
            const formData = new FormData(this);
            fetch('submit_form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Form submitted successfully!');
                    this.reset();
                } else {
                    alert('Error submitting form.');
                }
            })
            .catch(error => console.error('Error:', error));
        });