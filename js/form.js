var LoginForm = document.getElementById("LoginForm")
        var RegisterForm = document.getElementById("RegisterForm")
        var Indicator = document.getElementById("Indicator")

            function Register() {
                RegisterForm.style.transform = "translateX(0px)";
                LoginForm.style.transform = "translateX(0px)";
                Indicator.style.transform = "translateX(100px)";
            }
            function Login() {
                RegisterForm.style.transform = "translateX(300px)";
                LoginForm.style.transform = "translateX(300px)";
                Indicator.style.transform = "translateX(0px)";
            }