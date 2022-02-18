const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const navMenu = $('.nav__menu'),
      navClose = $('.nav__close'),
      navToggle = $('.nav__toggle')
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}
 // REMOVE MENU MOBILE 
const navLink = document.querySelectorAll('.nav__link')
function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    //  vì scope của navMenu 
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



//  OPENING AND CLOSING THE ABILITY    
const skillsContent = $$('.skills__content')
const skillsHeader = $$('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className
    console.log(itemClass)

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass == 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach(el => {
    el.addEventListener('click', toggleSkills);
})

//  dòng code này có thể hiểu đơn giản là 
//  ở ngoài mục work và education có 1 data-target là 2 id work và education
//  nếu click vào 1 cái thì const target = $() sẽ nhận được và get id của mục kia 
//  muc content sẽ có 2 id là work và education để target nhận 
//  nên khi console target thì sẽ được content của mục vừa click
const tabs = $$('[data-target]')
     tabContents = $$('[data-content]')
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
       const target = $(tab.dataset.target)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    
    })
})

// active modal 
const modalViews = $$('.services__modal'),
      modalBtns = $$('.services__button'),
      modalClose = $$('.services__modal-close')
modalBtns.forEach( (modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modalViews[i].classList.add('active__modal')
    })
})
modalClose.forEach(modalClose => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach(modalView => {
            modalView.classList.remove('active__modal')
        })
    })
})
// portfolio swiper 
let swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    //  nếu k có css mode thì khi next qua > sẽ lăn từ từ như trang giấy 
    //  nếu có thì sẽ chuyển qua luôn
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });
// testimonial swiper
let swiperTestimonial = new Swiper(".testimonial__container", {
    //  ở đây k có css mode vì thao tác là lăn từ  qua nhuw trang giaays 
    loop: true,
    grabCursor: true,
    //  hình bàn tay để cảm ứng lướt qua 
    spaceBetween: 48,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
        568:{
            slidesPerView: 2,
        }
    }
   
});
// active link

const sections = $$('section[id]')
function scrollActive(){
    const scrollY = window.pageYOffset
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        // console.log(sectionHeight)
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
// scroll Y > section top và điều kiện bên để thực hiện active link 
// nếu k tm 1 trong 2 dk này thì nó sẽ remove active link
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            
            // console.log(scrollY, sectionTop,sectionHeight)
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// =============================CHANGE BACKGROUND HEADER ====================================
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// ============================DARK/LIGHT THEME=====================================
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
