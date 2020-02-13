
const loginFuction = () => {
    const submit = document.querySelector(".submit");
    const logIn = document.querySelector("#login")
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const adminEmail = "a@gmail.com";
    const adminPassword = "12";
    const cashierEmail = "c@gmail.com";
    const cashierPassword = "123"
  
    submit.addEventListener("click", () => {
        if(email.value === adminEmail && password.value === adminPassword){
            logIn.setAttribute("action", "admin.html");
        }
        if(email.value === cashierEmail && password.value === cashierPassword){
            logIn.setAttribute("action", "cashier.html");
        }
    })
  }
  loginFuction();