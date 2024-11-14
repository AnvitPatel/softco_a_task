// $(window).scroll(function () {
//     if ($(window).scrollTop() >= 73) {
//         $('.header_container').addClass('fixed-header');
//     }
//     else {
//         $('.header_container').removeClass('fixed-header');
//     }
// });
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
    startX,
    startScrollLeft;

arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const cardWidth = carousel.querySelector(".serve_card").offsetWidth;
        if (btn.id === "left") {
            // Scroll to the last element if at the first element
            if (carousel.scrollLeft === 0) {
                carousel.scrollLeft = carousel.scrollWidth - carousel.offsetWidth;
            } else {
                carousel.scrollLeft -= cardWidth;
            }
        } else {
            // Scroll to the first element if at the last element
            const val1 = Math.floor(carousel.scrollLeft) + carousel.offsetWidth ===
                carousel
                    .scrollWidth === true ? Math.floor(carousel.scrollLeft) + carousel
                        .offsetWidth :
                Math.floor(carousel.scrollLeft) + carousel.offsetWidth + 1;
            if (val1 === carousel.scrollWidth) {
                carousel.scrollLeft = 0;
            } else {
                carousel.scrollLeft += cardWidth;
            }
        }
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);