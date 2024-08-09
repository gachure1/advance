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
