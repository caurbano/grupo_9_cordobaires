// Validaciones para register y para userEdit
window.addEventListener('load', function () {
    let form = document.querySelector('form.form');
    let firstNameField = document.querySelector('input#firstName')
    let lastNameField = document.querySelector('input#lastName')
    let emailField = document.querySelector('input#email')
    let phoneField = document.querySelector('input#phone')
    let passwordField = document.querySelector('input#password')
    let confirm_passwordField = document.querySelector('input#confirm_password')
    let imgField = document.querySelector('input#img')


        firstNameField.focus();

    form.addEventListener('submit', function(event){

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
            errors.push("El campo teléfono debe contener 10 dígitos.")
        }

        //expresión regular para validar password. Al menos: 8 caracteres, 1 mayúscula, 1 núm.
        let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/

        if(passwordField.value == "") {
            errors.push("Debe ingresar una contraseña.")
        } else if (!regexPass.test(passwordField.value)) {
            errors.push("La contraseña debe tener al menos 8 caracteres y contener algún número y letra mayúscula.")
        } 

        if(confirm_passwordField.value != passwordField.value) {
            errors.push("La constraseña no coincide con la anteriormente ingresada.")
        }
        
        if(imgField.value != "" && imgField.value.search(/jpg$|jpeg$|png$/m) == -1) {
            errors.push("Formato de imagen no válido.")
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