// TESTING

document.getElementById('submitButton').addEventListener('click', async () => {
    const form = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Collect form data
    const formData = {
        category: document.getElementById('category').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    try {
        // Send email using EmailJS
        const response = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);

        if (response.status === 200) {
            successMessage.style.display = 'block';
            form.reset(); // Clear the form
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        errorMessage.style.display = 'block';
    }
});