// Validaciones para productEdit
window.addEventListener('load', function () {
    let form = document.querySelector('form.form');
    let nameField = document.querySelector('input#name')
    let descriptionField = document.querySelector('textarea#description')
    let imgField = document.querySelector('input#img')

    nameField.focus();

    form.addEventListener('submit', function(event){
            
        let errors = [];

        if(nameField.value == "") {
            errors.push("El campo nombre está vacío.")
        } else if (nameField.value.length < 5) {
            errors.push("El nombre del producto debe tener al menos 5 caracteres.")
        }

        if(descriptionField.value == "") {
            errors.push("El campo de descripción está vacío.")
        } else if (descriptionField.value.length < 20) {
            errors.push("La descripción del producto debe tener al menos 20 caracteres.")
        }

        if(imgField.value != "" && imgField.value.search(/jpg$|jpeg$|png$|mp4$/m) == -1) {
            errors.push("Formato de imagen no válido.")
        }

        if(errors.length > 0) {
            console.log('ok')
            event.preventDefault();
        }

        let ulErrors = document.querySelector('.errors ul')

        ulErrors.innerHTML = ''

        for (let i = 0; i < errors.length; i++) {
            ulErrors.innerHTML += "<li class='errorMsg'>" + errors[i] + "</li>"
        }
        
    })
})