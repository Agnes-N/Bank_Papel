
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

  var emailArray=[];
  var passwordArray=[];
  function forgot(){
    event.preventDefault();

    var email = document.getElementById("fe").value;

    if(emailArray.indexOf(email) == -1){
        if (email == ""){
            alert("Email required.");
            return ;
        }
        alert("Email does not exist.");
        return ;
    }

    alert("email is send to your email check it out. \n Thanks");
    document.getElementById("fe").value ="";
}