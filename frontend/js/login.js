// import config from "../config/index.js"
const form = document.getElementById('form');
// console.log(config,"config")
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        email: username,
        password: password
    };
    console.log(data,"dadada")

    fetch(`http://127.0.0.1:8082/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        persistLogin(data.tokens.access.token,data.user.email)
        console.log(data);
        window.location.href ="profile.html"
    
    })
    .catch(error => {
        console.log(error);
        alert(`${error.statusCode}`)
    });
});

const persistLogin = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };