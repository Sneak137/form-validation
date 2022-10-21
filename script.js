const firstname = document.getElementById("firstName");
const lastname = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeatpassword = document.getElementById("repeatPassword");
const terms = document.getElementById("terms");
const form = document.getElementById("validationForm");
let formErrors = [];

class User {
    constructor(firstname, lastname, email, password, repeatpassword, terms){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.repeatpassword = repeatpassword;
        this.terms = terms;
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    formErrors = [];

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');
    errorDisplay.textContent = message;
    errorDisplay.classList.remove('d-none')
    formErrors.push(element.getAttribute('id'));
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
    formErrors.filter((id) => element.getAttribute('id'));
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const repeatpasswordValue = repeatpassword.value.trim();

    if(firstnameValue === '' && firstnameValue.length >= 2){
        setError(firstname, 'firstname is required');
    } else {
        setSuccess(firstname);
    }

    if(lastnameValue === ''){
        setError(lastname, 'lastname is required');
    } else {
        setSuccess(lastname);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 6 ) {
        setError(password, 'Password must be at least 6 character.')
    } else {
        setSuccess(password);
    }

    if(repeatpasswordValue === '') {
        setError(repeatpassword, 'Please confirm your password');
    } else if (repeatpasswordValue !== passwordValue) {
        setError(repeatpassword, "Passwords doesn't match");
    } else {
        setSuccess(repeatpassword);
    }

    if (!terms.checked) {
        setError(terms, "You must agree to the terms.");
    } else {
        setSuccess(terms);
    }

    console.log(formErrors)
    console.log(formErrors.length)
    if (formErrors.length === 0) {
        console.log("Form is valid");
        const User = {
            firstName: firstnameValue,
            lastName: lastnameValue,
            email: emailValue,
            password: passwordValue
        };

        console.log(User);
    }
};