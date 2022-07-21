window.addEventListener('load', function () {
    let formRegister = document.querySelector('form.form');
    let firstNameField = document.querySelector('input#firstName')
    let lastNameField = document.querySelector('input#lastName')
    let emailField = document.querySelector('input#email')
    let phoneField = document.querySelector('input#phone')
    let passwordField = document.querySelector('input#password')
    let confirm_passwordField = document.querySelector('input#confirm_password')
    let imgField = document.querySelector('input#img')


        firstNameField.focus();

    formRegister.addEventListener('submit', function(event){

        let errors = [];   

        if(firstNameField.value == "") {
            errors.push("El campo nombre está vacío.")
        } else if (firstNameField.value.length < 2) {
            errors.push("El campo nombre debe tener al menos 2 caracteres.")
        }

        if(lastNameField.value == "") {
            errors.push("El campo apellido está vacío.")
        } else if (lastNameField.value.length < 2) {
            errors.push("El campo apellido debe tener al menos 2 caracteres.")
        }

        //borrar luego
        // if(emailField.value == "") {
        //     errors.push("El campo email está vacío.")
        // } else if (!emailField.value.search("@") && !emailField.value.search(".com")) {
        //     errors.push("El email ingresado no es válido.")
        // }

        //expresión regular para validar email aa@bb.ccc
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(emailField.value == "") {
            errors.push("El campo email está vacío.")
        } else if (!regexEmail.test(emailField.value)) {
            errors.push("El email ingresado no es válido.")
        }

       //expresión regular para validar teléfono de 10 díg.
        let regexPhone = /^\d{10}$/

        if(phoneField.value == "") {
            errors.push("El campo teléfono está vacío.")
        } else if (!regexPhone.test(phoneField.value)) {
            errors.push("El campo teléfono debe tener al menos 10 dígitos.")
        }

        //expresión regular para validar password. Al menos: 8 caracteres, 1 mayúscula, 1 núm.
        let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/

        if(passwordField.value == "") {
            errors.push("Debe ingresar una contraseña.")
        } else if (!regexPass.test(passwordField.value)) {
            errors.push("La contraseña debe tener al menos 8 caracteres y contener algún número y letra mayúscula.")
        } 

        // if(passwordField.value == "") {
        //     errors.push("Debe ingresar una contraseña.")
        // } else if (passwordField.value.length < 8) {
        //     errors.push("La contraseña debe tener al menos 8 caracteres.")
        // } else if (passwordField.value.search(/\d/) == -1) {
        //     errors.push("La contraseña debe tener al menos un número.")
        // } else if (passwordField.value.search(/[A-Z]/) == -1) {
        //     errors.push("La contraseña debe tener al menos una letra mayúscula.")
        // }

        if(confirm_passwordField.value != passwordField.value) {
            errors.push("La constraseña no coincide con la anteriormente ingresada.")
        }
        
        if(imgField.value != "" && imgField.value.search(/jpg$|jpeg$|png$/m) == -1) {
            errors.push("Formato de imagen no válido.")
        }

        if(errors.length > 0) {
            event.preventDefault();
        }
        

        //lo que falta es lograr que se reseteen los errores cuando ya no exista mas
        //tambien, decidir el estilo de estos elementos
        let ulErrors = document.querySelector('.errors ul')

        for (let i = 0; i < errors.length; i++) {
            ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
        }
    })
})