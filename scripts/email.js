(function() {
    emailjs.init("C-FJ34pNntexXgk6t"); // Replace with your EmailJS Public Key
})();

// Add event listener to the form
document.getElementById('enquiryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_3tyjizo', 'template_f5pnqah', this)
        .then(() => {
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
            this.reset();
        }, (error) => {
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('errorMessage').style.display = 'block';
            console.error('FAILED...', error);
        });
});