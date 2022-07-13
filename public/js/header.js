window.addEventListener('load', function () {
    let menu = document.querySelector('#menu');
    let menuDropDown = document.querySelector('.menu-dd')
    let search = document.querySelector('#search');
    let product = document.querySelectorAll('.see__dest a');

    menu.addEventListener('click', function (event){
        menuDropDown.classList.toggle('block')
    })

    search.addEventListener('click', function(event){
        let searchForm = document.querySelector('.search_form')
        let searchInput = document.querySelector('.input_search')

        searchForm.classList.toggle('block')
        searchInput.focus();

    })

    document.addEventListener('keyup', function(e){
        if(e.target.matches('.input_search')) {
            document.querySelectorAll('.see__dest a').forEach(prod =>
                prod.textContent.toLocaleLowerCase().includes(e.target.value))
                ? prod.classList.remove('filter')
                : prod.classList.add('filter')

            // console.log(test)
        }
        
    })
})

// prueba, seguir.