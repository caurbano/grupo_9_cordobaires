window.addEventListener('load', function () {
    let user = document.querySelector(".login_msg");
    let form = document.querySelector(".form");
    let button = document.querySelector(".agregarcarrito");
    let cant = document.querySelector(".cant");
    let max = document.querySelector(".max");
    let error = document.querySelector(".error");

    //Capturo el evento
    console.log(form);
    form.addEventListener('submit', function(event){
        
        error.innerHTML = "";
        //verifico si hay Stock
        if( cant.value <= parseInt(max.innerHTML) ){
            //Solo usuarios logeados
            if(user){
                //Verifico si es el primer producto del carrito 
                if(sessionStorage.getItem("cart") == null){    //Si es asi inicializo el carrito
                    let array = [{id: button.value, cant: parseInt(cant.value)}];
                    // console.log(array);
                    sessionStorage.setItem("cart", JSON.stringify(array));
                }else{                                         //Sino lo sumo al carrito
                    let array = JSON.parse(sessionStorage.getItem("cart"));
                    let index = array.findIndex(element => element.id == button.value);

                    //Verifico si es un producto ya agregado
                    if(index == -1){
                        array.push({id: button.value, cant: parseInt(cant.value)});
                    }else{
                        array[index].cant += parseInt(cant.value);
                    }
                    
                    // console.log(array);
                    sessionStorage.setItem("cart", JSON.stringify(array));

                }
            }
        }else{
            event.preventDefault();
            error.innerHTML = "No hay suficiente Stock";
        }
    })

})