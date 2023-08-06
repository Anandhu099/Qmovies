
const form = document.getElementById('form_register');
// console.log(config,"config")
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if(!validation(username,password,confirmPassword))return
    const data = {
        email: username,
        password: password
    };
    console.log(data, "dadada")

    fetch(`http://127.0.0.1:8082/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            alert("Registered Successfully")
            window.location.href ="login.html"
            // handle response data
        })
        .catch(error => {
            console.log(error);
            // handle error
        });
});

const validation = (username, password, confirmPassword) => {
    console.log(username,"lkfahsdfjhds")
    if (!username.length) {
        alert("Username can't be empty")
        return false
    }
    if (password.length<=5) {
        document.querySelector(".helper-text").style.color="red"
        alert("Password must be at least 6 characters length");  
        return false
    }
    if (password !== confirmPassword) {
        alert("Passwords don't match")
        return false
    }
    return true
}
