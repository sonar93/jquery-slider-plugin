$( document ).ready(() => {
    $('.slider').slide({slideShow: true, interval: 5000})
});


jQuery.fn.slide = ({slideShow, interval, animation}) => {
    let x = 0
    let timing;
    var pagenNumber;
    this.slideShow = slideShow
    this.interval = interval
    this.animation = animation

    //adding slidashow interval

    if(slideShow){
        timing = setInterval(() => next(), interval)

        $('.slider__item').on('mouseenter', () => {
            clearInterval(timing)
        })
        $('.slider__item').on('mouseleave', () => {
            timing = setInterval(() => next(), interval)
        })

    }

    // Setting data attr-s as slider items

    let list = $('.slider__item');
    let indicatorPanel = `<div class='slider__indicator'></div>`
    $('.slider').append(indicatorPanel)
    for (let i = 0; i < list.length; i++){
        let src = list[i].getAttribute('data-url')
        if(list[i].getAttribute('data-type') === 'image'){
            list[i].innerHTML += `<img class = 'slider__item--img' src = ${src}/>`
        } else if(list[i].getAttribute('data-type') === 'video') {
            list[i].innerHTML += `<video class='slider__item--video' controls='true' src = ${src}> </video>`
        }   

        // attaching indicators
        let indicator = `<div class='slider__indicator--item'></div>`
        $('.slider__indicator ').append(indicator)
        let indicatorItem = $('.slider__indicator--item')
        indicatorItem[0].classList.add('slider__indicator--active')

        // adding indcator clicks
        $(indicatorItem[i]).click(() => {
            let currentSlide = i*100
            $('.slider__item').css('transform', `translateX(${-(currentSlide)}%)`)
            activeIndicator(i*100)
            $('video').trigger('pause')
            clearInterval(timing)
        })
    }

    //setting active class to indicator

    let activeIndicator = (active) => {
        let indicatorItem = $('.slider__indicator--item')
        indicatorItem[0].classList.add('slider__indicator--active')
        for(let i=0; i < indicatorItem.length; i++){
            indicatorItem[i].classList.remove('slider__indicator--active')
        }
        indicatorItem[active/100].classList.add('slider__indicator--active')
    }
    
    
    // creating Next/Previous buttons

    let nextBtn = `<div class="slider__btn--next"><i class="material-icons slider__btn--icon">
    navigate_next
    </i></div>`
    let prevBtn = `<div class="slider__btn--prev"><i class="material-icons slider__btn--icon">
    navigate_before
    </i></div>`
    $('.wrap').append(nextBtn)
    $('.wrap').append(prevBtn)


    // Next functionality (reusable)

    let next = () => {
        x = x < ($('.slider__item').length-1) * 100 ? x+100 : 0
        $('.slider__item').css('transform', `translateX(${-x}%)`)
        activeIndicator(x)
        $('video').trigger('pause')
    }

    // Prev button click 

    $(`.slider__btn--prev`).click(() => {
        x = x >= 100 ? x-100 : ($('.slider__item').length-1) * 100
        $('.slider__item').css('transform', `translateX(${-x}%)`)
        activeIndicator(x)
        $('video').trigger('pause')
        clearInterval(timing)
    })

     // Next button click 
    
    $(`.slider__btn--next`).click(() => {
            next()
            clearInterval(timing)
    })
}