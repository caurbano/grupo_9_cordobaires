window.addEventListener('load', function () {
    let menu = document.querySelector('#menu');
    let menuDropDown = document.querySelector('.menu-dd')
    let search = document.querySelector('#search');
    

    menu.addEventListener('click', function (event){
        menuDropDown.classList.toggle('block')
    })

    search.addEventListener('click', function(event){
        let searchForm = document.querySelector('.search_form')
        let searchInput = document.querySelector('.input_search')

        searchForm.classList.toggle('block')
        searchInput.focus();

    })
})

