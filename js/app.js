// Funçoes do menu
const btnMenuEl = document.querySelector(".nav__burgue");
const menuMobileEl = document.querySelector(".nav__menu");
window.addEventListener("resize", () => {
  if (window.innerWidth > 840 && menuMobileEl.classList.contains("active")) {
    menuMobileEl.classList.remove("active");
  }
});
btnMenuEl.addEventListener("click", () => {
  menuMobileEl.classList.toggle("active");
});

///carrousel

const sliderEl = document.querySelector(".card__slider");
const sliderCardEl = document.querySelectorAll(".card__slider .card");
const sliderBtn = [
  document.querySelector(".btn__back"),
  document.querySelector(".btn__next"),
];

let sliderShow;
let sliderWidth;
let moveReal = 0;
let movetoLeft = 0;
const resize = () => {
  if (window.innerWidth < 550) {
    movetoLeft = 0;
    moveReal = 0;
    sliderShow = 1;
    sliderWidth =
      (sliderCardEl.length - sliderShow) * sliderCardEl[0].clientWidth;
  }
  if (window.innerWidth > 550 && window.innerWidth < 1020) {
    movetoLeft = 0;
    moveReal = 0;
    sliderShow = 1;
    sliderWidth =
      (sliderCardEl.length - sliderShow) * sliderCardEl[0].clientWidth;
  }
  if (window.innerWidth > 1020 && window.innerWidth < 1200) {
    movetoLeft = 0;
    moveReal = 0;
    sliderShow = 2;
    sliderWidth =
      (sliderCardEl.length - sliderShow) * sliderCardEl[0].clientWidth;
  }
  if (window.innerWidth > 1200 && window.innerWidth < 1400) {
    movetoLeft = 0;
    moveReal = 0;
    sliderShow = 3;
    sliderWidth =
      (sliderCardEl.length - sliderShow) * sliderCardEl[0].clientWidth;
  }
  if (window.innerWidth > 1400 && window.innerWidth < 2400) {
    moveReal = 0;
    sliderShow = 4;
    sliderWidth =
      (sliderCardEl.length - sliderShow) * sliderCardEl[0].clientWidth;
  }
};
window.addEventListener("load", () => {
  resize();
});
window.addEventListener("resize", () => {
  resize();
});

let sliderConfig = {
  marginRight: 30,
  sliderCount: sliderCardEl.length,
  cardWidth: sliderCardEl[0].clientWidth,
};

sliderCardEl.forEach((card) => {
  card.style.marginRight = `${sliderConfig.marginRight}px`;
});

const slide = {
  moveToNext() {
    countWidth = sliderConfig.marginRight + sliderConfig.cardWidth;
    if (moveReal == sliderWidth) {
      movetoLeft = movetoLeft;
      moveReal = sliderWidth;
    } else {
      movetoLeft += countWidth;
      moveReal += countWidth - sliderConfig.marginRight;
    }
    sliderEl.style.transform = "translateX( " + -movetoLeft + "px)";
  },
  moveToBack() {
    countWidth = sliderConfig.marginRight + sliderConfig.cardWidth;
    if (moveReal == 0) {
      movetoLeft = 0;
      moveReal = 0;
    } else {
      movetoLeft -= countWidth;
      moveReal -= countWidth - sliderConfig.marginRight;
    }
    sliderEl.style.transform = "translateX( " + -movetoLeft + "px)";
  },
};

sliderBtn[1].addEventListener("click", () => {
  slide.moveToNext();
});

sliderBtn[0].addEventListener("click", () => {
  slide.moveToBack();
});

let grabbing = false;
let positiveNumber = false;
sliderCardEl.forEach((card) => {
  card.addEventListener("wheel", (e) => {
    e.preventDefault();
    e.deltaY > 1 ? slide.moveToNext() : slide.moveToBack();
  });
});
sliderEl.addEventListener("wheel", (e) => {
  e.preventDefault();
  e.deltaY > 1 ? slide.moveToNext() : slide.moveToBack();
});

sliderEl.addEventListener("mousedown", () => {
  sliderEl.style.cursor = "grabbing";
  grabbing = true;
});

sliderEl.addEventListener("mouseleave", () => {
  grabbing = false;
});

sliderEl.addEventListener("mouseup", () => {
  sliderEl.style.cursor = "grabbing";
  grabbing = false;
});

sliderEl.addEventListener("mousemove", (e) => {
  if (grabbing == true) {
    if (e.movementX === -1) {
      slide.moveToNext();
      console.log("next numero é negativo");
    }
    if (e.movementX === 1) {
      slide.moveToBack();
      console.log("next numero é positivo");
    }
  }
});
