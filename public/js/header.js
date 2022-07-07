window.addEventListener('load', function () {
    let menu = document.querySelector('#menu');
    let search = document.querySelector('#search');

    menu.addEventListener('click', function (event){
        let menuDropDown = document.querySelector('.menu-dd')

        menuDropDown.classList.toggle('block')
    })

    search.addEventListener('click', function(event){
        let searchForm = document.querySelector('.search_form')
        let searchInput = document.querySelector('.input_search')

        searchForm.classList.toggle('block')
        searchInput.focus();

    })
})

// prueba, seguir.