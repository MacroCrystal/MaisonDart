// Add this to your existing JavaScript code or in a separate file
const bidButtons = document.querySelectorAll('.bid-button');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close');

bidButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

const bidForm = document.getElementById('bidForm');
bidForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle form submission here
    modal.style.display = 'none';
});
