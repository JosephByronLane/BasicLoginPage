const ids = ["user", "password"];

ids.forEach(id => {
    const element = document.getElementById(id);

    element.addEventListener("focus", function() {
        this.setAttribute("data-placeholder", this.placeholder);
        this.placeholder = '';
    });

    element.addEventListener("blur", function() {
        if (this.value == '') {
            this.placeholder = this.getAttribute("data-placeholder");
        }
    });
});

function getForm(){
    const user = document.querySelector("#user")
    const password = document.querySelector("#password")
    const button = document.querySelector("#button");

    button.textContent = "Processing...";
    button.disabled = true;

    if(user.value.trim() === "" || password.value.trim() === ""){
        handleLogin(button, false);
        return ;
    }

    const data = {
        user: user.value,
        password:password.value
    }
    connectionApi(data)
}

function connectionApi(data){
    fetch("https://dummyjson.com/auth/login", {
        "method": "POST",
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify({
            "username": data.user,
            "password": data.password
        })
    })
    .then(answer => answer.json())
    .then(answer => {
        console.log(answer);
        handleLogin(button, answer?.token);
    })
    .catch(err => {
        console.error(err);
    });    
}
function handleLogin(button, isSuccess) {
    
    const color = isSuccess ? "green" : "red";
    const message = isSuccess ? "Success" : "Invalid credentials";

    button.textContent = message;
    button.style.border = `1px solid ${color}`;
    button.style.color = color;
    button.style.backgroundColor = "transparent";
    
    document.querySelector("#user").style.border = `1px solid ${color}`;
    document.querySelector("#password").style.border = `1px solid ${color}`;

    setTimeout(() => {
        button.textContent = "Login";
        button.style.backgroundColor = "";
        button.style.border = "";
        button.style.color = "";
    
        document.querySelector("#user").style.border = "";
        document.querySelector("#password").style.border = "";
        button.disabled = false;
    }, 2000);
    if (isSuccess){
        setTimeout(() => {
            location.href = "https://www.google.com";
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
      const splash = document.getElementById('splash-screen');
      splash.style.transition = 'opacity 1s ease-in-out';
      splash.style.opacity = 0;
      setTimeout(() => {
        splash.style.display = 'none';
      }, 1000); 
    }, 8000);
});