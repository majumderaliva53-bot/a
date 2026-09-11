// Paste your Google Apps Script Web App URL here
const scriptURL = 'https://script.google.com/macros/s/AKfycbzG7soyZDEJWuNt60bjSGSnxyZ_yzGkYEvCZqHr7i9zDA2tFNSnqeATi2w8g9pF89eYJQ/exec';

const form = document.getElementById('rsvpForm');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('status-message');
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const guestsGroup = document.getElementById('guestsGroup');

// Dynamic UI adjustment based on attendance choice
attendanceRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.value === 'Not Attending') {
      guestsGroup.style.display = 'none';
    } else {
      guestsGroup.style.display = 'block';
    }
  });
});

// Handle Form Submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Show loading status on button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  statusMessage.style.display = 'none';

  const formData = new FormData(form);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm RSVP';

      // Display success message
      statusMessage.textContent = 'Thank you for your response! Ranar Community looks forward to your presence.';
      statusMessage.className = 'success';
      statusMessage.style.display = 'block';

      // Reset form controls
      form.reset();
      guestsGroup.style.display = 'block';
    })
    .catch((error) => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm RSVP';

      // Display error message
      statusMessage.textContent = 'Oops! Submission failed. Please try again.';
      statusMessage.className = 'error';
      statusMessage.style.display = 'block';

      console.error('Submission Error!', error.message);
    });
});