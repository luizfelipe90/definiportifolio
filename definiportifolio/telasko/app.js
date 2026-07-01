document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const confirmBox = document.getElementById('confirm-box');
    const btnReset = document.getElementById('btn-reset');
    const dateInput = document.getElementById('f-date');

    // Set minimum date to today
    const today = new Date();
    const pad = n => String(n).padStart(2, '0');
    const minDate = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    dateInput.setAttribute('min', minDate);
    dateInput.value = minDate;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('f-name').value.trim();
        const serviceRaw = document.getElementById('f-service').value; // e.g. "Combo Completo|80"
        const [serviceName, price] = serviceRaw.split('|');
        const barber = document.getElementById('f-barber').value;
        const dateRaw = document.getElementById('f-date').value;
        const time = document.getElementById('f-time').value;

        // Format date to Brazilian pattern
        const [y, m, d] = dateRaw.split('-');
        const dateBR = `${d}/${m}/${y}`;

        document.getElementById('c-name').textContent = name;
        document.getElementById('c-service').textContent = serviceName;
        document.getElementById('c-barber').textContent = barber;
        document.getElementById('c-date').textContent = dateBR;
        document.getElementById('c-time').textContent = time;
        document.getElementById('c-price').textContent = `R$ ${parseFloat(price).toFixed(2)}`;

        form.style.display = 'none';
        confirmBox.style.display = 'block';
    });

    btnReset.addEventListener('click', () => {
        form.reset();
        dateInput.value = minDate;
        confirmBox.style.display = 'none';
        form.style.display = 'block';
    });
});
