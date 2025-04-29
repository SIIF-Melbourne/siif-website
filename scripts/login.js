import { signIn } from '../auth.js';

document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear any previous error message
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    try {
        const user = await signIn(email, password);

        if (user) {
            // Display "Logged in!" message
            const loginSection = document.querySelector('.login');
            loginSection.innerHTML = '<h1>Logged in!</h1>';
        } else {
            // Show error message if login fails
            errorMessage.textContent = 'Invalid email or password.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error during login:', error);
        errorMessage.textContent = 'An unexpected error occurred. Please try again.';
        errorMessage.style.display = 'block';
    }
});