window.addEventListener('load', function () {

    let topHover = document.querySelector('#top')
    let top2 = document.querySelector('#top2')

    
    topHover.addEventListener('mouseover', function(event){
        
        top2.classList.toggle('block')
        topHover.classList.toggle('none')
        
    })

    topHover.addEventListener('mouseout', function(event){
        
        top2.classList.toggle('block')
        topHover.classList.toggle('none')
        
    })
})