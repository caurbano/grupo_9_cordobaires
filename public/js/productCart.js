window.addEventListener('load', function () {
    if(sessionStorage.getItem("cart") && JSON.parse(sessionStorage.getItem("cart")).length > 0){
        let products = JSON.parse(sessionStorage.getItem("cart"));
        products.forEach(element => {
            document.querySelector(`#cant${element.id}`).value = element.cant;
        });
        let total = 0;
        for (let index = 0; index < products.length; index++) {
            if(document.querySelector(`#discount${products[index].id}`)){
                total += parseFloat(document.querySelector(`#discount${products[index].id}`).innerHTML) * products[index].cant;
            }else{
                total += parseInt(document.querySelector(`#price${products[index].id}`).innerHTML) * products[index].cant;
            }
        }
        document.querySelector(`#total`).innerHTML = total;

        for (let index = 0; index < products.length; index++) {
            document.querySelector(`#cant${products[index].id}`).addEventListener('change', event => {
                products[index].cant = parseInt(document.querySelector(`#cant${products[index].id}`).value);
                sessionStorage.setItem("cart", JSON.stringify(products));
                total = 0;
                for (let index = 0; index < products.length; index++) {
                    if(document.querySelector(`#discount${products[index].id}`)){
                        total += parseFloat(document.querySelector(`#discount${products[index].id}`).innerHTML) * parseInt(document.querySelector(`#cant${products[index].id}`).value);
                    }else{
                        total += parseInt(document.querySelector(`#price${products[index].id}`).innerHTML) * parseInt(document.querySelector(`#cant${products[index].id}`).value);
                    }
                }
                document.querySelector(`#total`).innerHTML = total? total : 0;
            });
        }
        
        for (let index = 0; index < products.length; index++) {
            document.querySelector(`#delete${products[index].id}`).addEventListener('submit', event => {
                products = products.filter(element => element.id != products[index].id);
                sessionStorage.setItem("cart", JSON.stringify(products));
            });
        }

        document.querySelector(`.form`).addEventListener('submit', event => {
            let boolean = true;
            products.forEach(element => {
                if(parseInt(document.querySelector(`#cant${element.id}`).value) > 0){
                    boolean = false;
                }
            })
            if(boolean){
                event.preventDefault();
                alert('No hay productos en el carrito.');
            }else{
                // let requestOptions = {
                //     method: "POST",
                //     body: JSON.stringify(products),
                //     headers: {"Content-type": "application/json; charset=UTF-8"}
                // };
                  
                // fetch(window.origin+"/api/createcart", requestOptions)
                // .then(response => response.text())
                // .then(result => console.log(result))
                // .catch(error => console.log('error', error));
                sessionStorage.removeItem("cart");
                // window.location.href = window.origin;
            }
        })

    }

})