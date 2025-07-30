document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    const adultsSelect = document.getElementById('adults');
    const childrenSelect = document.getElementById('children');
    const roomTypeSelect = document.getElementById('room-type');
    const diningCheckbox = document.getElementById('dining-option');

    // Summary elements
    const summaryCheckin = document.getElementById('summary-checkin');
    const summaryCheckout = document.getElementById('summary-checkout');
    const summaryNights = document.getElementById('summary-nights');
    const summaryGuests = document.getElementById('summary-guests');
    const summaryRoom = document.getElementById('summary-room');
    const summaryExtras = document.getElementById('summary-extras');
    const summaryTotal = document.getElementById('summary-total');

    // Room prices
    const roomPrices = {
        standard: 85,
        deluxe: 120,
        suite: 180,
        family: 150
    };

    // Set default dates (today and tomorrow)
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    checkInInput.valueAsDate = today;
    checkOutInput.valueAsDate = tomorrow;
    updateSummary();

    // Event listeners
    checkInInput.addEventListener('change', updateSummary);
    checkOutInput.addEventListener('change', updateSummary);
    adultsSelect.addEventListener('change', updateSummary);
    childrenSelect.addEventListener('change', updateSummary);
    roomTypeSelect.addEventListener('change', updateSummary);
    diningCheckbox.addEventListener('change', updateSummary);

    // Room selection buttons
    document.querySelectorAll('.select-room').forEach(button => {
        button.addEventListener('click', function() {
            const roomType = this.dataset.roomType;
            roomTypeSelect.value = roomType;
            updateSummary();

            // Scroll to form
            document.querySelector('.booking-form-col').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // FAQ toggle
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('active');
        });
    });

    // Update booking summary
    function updateSummary() {
        // Dates
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);

        // Calculate nights
        const timeDiff = checkOutDate - checkInDate;
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        // Format dates
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        summaryCheckin.textContent = checkInDate.toLocaleDateString('en-US', options);
        summaryCheckout.textContent = checkOutDate.toLocaleDateString('en-US', options);
        summaryNights.textContent = nights;

        // Guests
        const adults = adultsSelect.value;
        const children = childrenSelect.value;
        summaryGuests.textContent = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}`;

        // Room
        const roomType = roomTypeSelect.value;
        if (roomType) {
            summaryRoom.textContent = roomTypeSelect.options[roomTypeSelect.selectedIndex].text;
        } else {
            summaryRoom.textContent = 'Not selected';
        }

        // Extras
        const extras = [];
        if (diningCheckbox.checked) {
            extras.push('Breakfast buffet');
        }
        summaryExtras.textContent = extras.length ? extras.join(', ') : 'None';

        // Calculate total
        let total = 0;
        if (roomType && roomPrices[roomType]) {
            total = roomPrices[roomType] * nights;

            if (diningCheckbox.checked) {
                total += (parseInt(adults) + parseInt(children)) * 15 * nights;
            }
        }

        summaryTotal.textContent = total ? `$${total.toFixed(2)}` : '$0.00';
    }
});