(function() {
    emailjs.init("-gq8Ylj-DwOJwQpoc");
})();

document.getElementById('enquiryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_5alcehl', 'template_w8i62qa', this)
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