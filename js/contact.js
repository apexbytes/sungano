document.addEventListener('DOMContentLoaded', function() {
    // Initialize Map
    const map = L.map('map').setView([-1.2921, 36.8219], 15); // Nairobi coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-1.2921, 36.8219]).addTo(map)
        .bindPopup('Motel Sungano<br>123 Resort Lane, Nairobi')
        .openPopup();

    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('active');
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form validation would go here
            alert('Thank you for your message. We will respond as soon as possible.');
            this.reset();
        });
    }
});