// Setting data attr-s as slider items
$( document ).ready(() => {
    setItems()
    nextBtn()
    prevBtn()
});

let setItems = () => {
    let list = $('.slider__item');
    for (let i = 0; i < list.length; i++){
        let src = list[i].getAttribute('data-url')
        if(list[i].getAttribute('data-type') === 'image'){
            list[i].innerHTML += `<img class = 'slider__item--img' src = ${src}/>`
        } else if(list[i].getAttribute('data-type') === 'video') {
            list[i].innerHTML += `<video class='slider__item--video' controls='true' src = ${src}> </video>`
        }    
    }
}

let x = 0;


let nextBtn = () => {
    $(`.slider__next`).click(() => {
        x = x < ($('.slider__item').length-1) * 100 ? x+100 : 0
        $('.slider__item').css('transform', `translateX(${-x}%)`)
    })
}

let prevBtn = () => {
    $(`.slider__prev`).click(() => {
        x = x >= 100 ? x-100 : ($('.slider__item').length-1) * 100
        $('.slider__item').css('transform', `translateX(${-x}%)`)
    })
}