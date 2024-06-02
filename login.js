const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const validateName = (name) =>{
    return /^[a-zA-Z\s]*$/.test(name);
}
const validatePassword = (password) =>{
    return password.length >= 8;
}
// Register form submission
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const nameError = document.getElementById('nameError');
    const passwordError = document.getElementById('passwordError');

    nameError.textContent = '';
    passwordError.textContent = '';

    if(!validateName(name)){
        nameError.textContent = 'Name must contain only letter and spaces.';
        return;
    }

    if(!validatePassword(password)){
        passwordError.textContent = 'Password must be at least 8 characters long.';
        return;
    }

    const formData = {
        name,
        email,
        password
    };

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('User registered successfully.');
        } else {
            throw new Error('Error registering user');
        }
    } catch (error) {
        console.error('Error registering user:', error);
    }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };
    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Login successful');
        } else {
            throw new Error('Error logging in');
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});
