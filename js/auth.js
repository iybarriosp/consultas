class Auth {
    constructor() {
        this.loginForm = document.getElementById('LoginForm');
        this.registerForm = document.getElementById('RegisterForm');
        this.indicator = document.getElementById('Indicator');
        
        this.loginForm.addEventListener('submit', this.login.bind(this));
        this.registerForm.addEventListener('submit', this.register.bind(this));
    }

    static toggleLogin() {
        document.getElementById('LoginForm').style.transform = 'translateX(0)';
        document.getElementById('RegisterForm').style.transform = 'translateX(300px)';
        document.getElementById('Indicator').style.transform = 'translateX(0)';
    }

    static toggleRegister() {
        document.getElementById('LoginForm').style.transform = 'translateX(-300px)';
        document.getElementById('RegisterForm').style.transform = 'translateX(0)';
        document.getElementById('Indicator').style.transform = 'translateX(100px)';
    }

    register(event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (username && email && password) {
            localStorage.setItem('user', JSON.stringify({ username, email, password }));
            alert('Registration successful!');
        } else {
            alert('Please fill in all fields.');
        }
    }

    login(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            alert('Login successful!');
        } else {
            alert('Incorrect username or password.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Auth();
});
