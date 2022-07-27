// Validaciones para login de usuario
window.addEventListener('load', function () {
    let formLogin = document.querySelector('form.form');
    let emailField = document.querySelector('input#email')
    let passwordField = document.querySelector('input#password')

    emailField.focus();

    formLogin.addEventListener('submit', function(event){
        let errors = []; 

         //expresión regular para validar email aa@bb.ccc
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(emailField.value == "") {
            errors.push("El campo email está vacío.")
        } else if (!regexEmail.test(emailField.value)) {
            errors.push("El email ingresado no es válido.")
        }

        if(passwordField.value == "") {
            errors.push("Debe ingresar una contraseña.")
        }

        if(errors.length > 0) {
            event.preventDefault();
        }
        
        let ulErrors = document.querySelector('.errors ul')


        ulErrors.innerHTML = ''

        for (let i = 0; i < errors.length; i++) {
            ulErrors.innerHTML += "<li class='errorMsg'>" + errors[i] + "</li>"
        }
    })

})