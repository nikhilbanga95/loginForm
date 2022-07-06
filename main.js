    var signUpInputValueCounter = 0;
    var signUpErrorValueCounter = 1;

function setFormMessage(formClassName, errorOrSuccess, message){
    const messageContainer = formClassName.querySelector(".combination");
    
    messageContainer.textContent = message;
    messageContainer.classList.remove("combination-error","combination-success");
    if(errorOrSuccess != ""){
        messageContainer.classList.add(`combination-${errorOrSuccess}`);
    };
};
function alertBox(message){
    alert(message);
}

function setInputError(inputElement, message,errorValueCounter){
    errorValueCounter = 0;
    inputElement.classList.add("combination-error");
    inputElement.parentElement.querySelector(".login_form-input-error").textContent= message;
};

function clearInputError(inputElement,errorValueCounter){
    errorValueCounter = 1;
    inputElement.classList.remove("combination-error");
    inputElement.parentElement.querySelector(".login_form-input-error").textContent= "";
}

document.addEventListener("DOMContentLoaded", () => {
    
    const loginForm = document.querySelector('.login_form');
    const signUp = document.querySelector('.signUp_form');
    const passwordForm = document.querySelector('.passwordReset_form');
    
    const signIn = document.querySelectorAll('#signIn');
    const createAccount = document.querySelector('#createAccount');
    const passwordReset = document.querySelector('#passwordReset');

    const signUpInputElement = document.querySelectorAll(".signUp_form-input");
    const loginInputElement = document.querySelectorAll(".login_form-input");
    const passwordResetElement = document.querySelectorAll(".passwordReset_form-input") ;

    signIn.forEach((inputElement) => {
        inputElement.addEventListener("click", (e) => {
            e.preventDefault();
    
            loginForm.classList.remove("form_hidden");
            if(!signUp.classList.contains("form_hidden")){
                signUp.classList.add("form_hidden")
            };
            if(!passwordForm.classList.contains("form_hidden")){
                passwordForm.classList.add("form_hidden")
            };
        });
    });

    createAccount.addEventListener("click", (e) => {
        e.preventDefault();
        signUp.classList.remove("form_hidden");
        if(!loginForm.classList.contains("form_hidden")){
            loginForm.classList.add("form_hidden")
        };
        if(!passwordForm.classList.contains("form_hidden")){
            passwordForm.classList.add("form_hidden")
        };
    });

    passwordReset.addEventListener("click", (e) => {
        e.preventDefault();
        
        passwordForm.classList.remove("form_hidden");
        if(!loginForm.classList.contains("form_hidden")){
            loginForm.classList.add("form_hidden")
        };
        if(!signUp.classList.contains("form_hidden")){
            signUp.classList.add("form_hidden")
        };
    });
    
    loginInputElement.forEach((inputElement,index) => {
        
        inputElement.addEventListener("blur", (e) => {
            if(e.target.value == ""){
                setInputError(e.target,"Enter a value");
            };

            if(e.target.id === "emailUsername" && ((!e.target.value.includes("@") && !e.target.value.includes(".com")) || (e.target.value.length > 0 && e.target.value.length < 10) )) {           
                setInputError(inputElement, "Enter a valid email id or username(which must have atleast 10 characters)")
            }
        })

        inputElement.addEventListener("click", (e) => {
            if(index > 0 && loginInputElement[index-1].value == "") {           
                setInputError(loginInputElement[index-1], "Enter this value first");
            };
        });

        inputElement.addEventListener("click", (e) => {
            clearInputError(inputElement);
        });

        inputElement.addEventListener("click",e =>{
            setFormMessage(loginForm,"","")
        });

    });

    signUpInputElement.forEach((inputElement, index) => {
        
        inputElement.addEventListener("click", (e) => {
            if(index > 0 && signUpInputElement[index-1].value == "") {           
                setInputError(signUpInputElement[index-1], "Enter this value first");
            };
        });
        
        inputElement.addEventListener("blur", (e) => {
            if(e.target.id === "signUpUsername" && e.target.value.length > 0 && e.target.value.length < 10){
                setInputError(inputElement, "Username must contain at least 10 characters")
            }
            else if(e.target.id === "email" && !e.target.value.includes("@") && !e.target.value.includes(".com")){           
                setInputError(inputElement, "Enter a valid email id")
            }
            else if(e.target.id === "confirmPassword" 
            && e.target.value != e.target.parentElement.querySelector("#password").value) {           
                setInputError(inputElement, "Enter the same password")
            }
            else if(e.target.value == ""){
                setInputError(e.target,"Enter a value");
            };

        });

        inputElement.addEventListener("click", (e) => {
            clearInputError(inputElement);
        });

        inputElement.addEventListener("click",e =>{
            setFormMessage(signUp,"","")
        });
    });

    passwordResetElement.forEach((inputElement,index) => {
        
        inputElement.addEventListener("blur", (e) => {
            if(e.target.value == ""){
                setInputError(e.target,"Enter a value");
            };

            if(e.target.id === "resetEmail" && (!e.target.value.includes("@") && !e.target.value.includes(".com")) ) {           
                setInputError(inputElement, "Enter a valid email id")
            };
        })

        inputElement.addEventListener("click", (e) => {
            if(index > 0 && loginInputElement[index-1].value == "") {           
                setInputError(loginInputElement[index-1], "Enter this value first");
            };
        });

        inputElement.addEventListener("click", (e) => {
            clearInputError(inputElement);
        });

        inputElement.addEventListener("click",e =>{
            setFormMessage(passwordForm,"","")
        });

    });

    passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        let resetValueCounter = 0;        
        let resetValue = 0;
        passwordResetElement.forEach((inputElement) => {

            if(inputElement.value == ""){
                resetValueCounter = 1;
            }
            else{
                resetValueCounter = 0;
            };

            resetValue += resetValueCounter;

        })

        let resetErrorValueCounter = 0;
        let resetErrorValue = 0;
        passwordResetElement.forEach((inputElement) => {

            if(!inputElement.classList.contains("combination-error")){
                resetErrorValueCounter = 0;
            }
            else{
                resetErrorValueCounter = 1;
            };

            resetErrorValue += resetErrorValueCounter;
        });

        if(resetValue != 0 || resetErrorValue != 0){
            setFormMessage(passwordForm,"error","Enter a valid Email Id");            
        }
        else{
            alertBox("Password resent link sent to the Email Address. Reset the password using the link sent to the mail and go to the Sign In page");
        };

    });

    signUp.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let signUpInputValueCounter = 0;        
        let signUpValue = 0;
        signUpInputElement.forEach((inputElement) => {

            if(inputElement.value == ""){
                signUpInputValueCounter = 1;
            }
            else{
                signUpInputValueCounter = 0;
            };

            signUpValue += signUpInputValueCounter;

        })

        let signUpErrorValueCounter = 0;
        let signUpErrorValue = 0;
        signUpInputElement.forEach((inputElement) => {

            if(!inputElement.classList.contains("combination-error")){
                signUpErrorValueCounter = 0;
            }
            else{
                signUpErrorValueCounter = 1;
            };

            signUpErrorValue += signUpErrorValueCounter;
        });

        if(signUpValue != 0 || signUpErrorValue != 0){
            setFormMessage(signUp,"error","Enter the correct details");            
        }
        else{
            alertBox("Account has been created. Go to Sign In !!");
        };

    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        let loginInputValueCounter = 0;        
        let loginValue = 0;
        loginInputElement.forEach((inputElement) => {

            if(inputElement.value == ""){
                loginInputValueCounter = 1;
            }
            else{
                loginInputValueCounter = 0;
            };

            loginValue += loginInputValueCounter;

        })

        let loginErrorValueCounter = 0;
        let loginErrorValue = 0;
        loginInputElement.forEach((inputElement) => {

            if(!inputElement.classList.contains("combination-error")){
                loginErrorValueCounter = 0;
            }
            else{
                loginErrorValueCounter = 1;
            };

            loginErrorValue += loginErrorValueCounter;
        });

        if(loginValue != 0 || loginErrorValue != 0){
            setFormMessage(loginForm,"error","Invalid username/Wrong password");            
        }
        else{
            alertBox("No such Account available. Create an account or go to forgot password !!");
        };

    });

});