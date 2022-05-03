"use strict";

//******************************** */
// Modal window
const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const logo = document.querySelector(".nav__logo");
//Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

//Slider
const dotContainer = document.querySelector(".dots");

//*************************************** */
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btnModal) => {
  btnModal.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Page Navigation



//Delegations event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //Mathching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Btn scroll -> learn more btn

btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

//Inserting cookies

const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML =
  ' We use cookies to improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
const btnCloseCookie = document.querySelector(".btn--close-cookie");

btnCloseCookie.addEventListener("click", function () {
  message.remove();
});

//style
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

const h1 = document.querySelector("h1");


//event delegation

tabsContainer.addEventListener("click", function (e) {
  const clickedBtn = e.target.closest(".operations__tab");
  if (!clickedBtn) return;
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clickedBtn.classList.add("operations__tab--active");

  tabsContent.forEach((tabContent) =>
    tabContent.classList.remove("operations__content--active")
  );

  document
    .querySelector(`.operations__content--${clickedBtn.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Menu fade animation

const handHover = function (e, opacity) {
  const clickedLink = e.target;
  const siblings = clickedLink.closest(".nav").querySelectorAll(".nav__link");
  const logo = clickedLink.closest(".nav").querySelector("img");
  siblings.forEach((el) => {
    if (el !== clickedLink) el.style.opacity = this;
  });
  logo.style.opacity = this;
};

///Sticky nav using Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//******************************************** */
//Reveal sections
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//********************************************* */

//Lazy loading

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  //Replace src with data-scr

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "+200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// **************************************************

//Slider
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const maxSlide = slides.length - 1;

//Btns Slider

//Slider Dots

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide ='${i}'></button>`
    );
  });
};
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const NextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(0);
  //-100% 0% 100% 200%
};

const PervSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide.length - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot();
  //-100% 0% 100% 200%
};

//Event Handler
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
//Left btn
btnLeft.addEventListener("click", PervSlide);
//Right btn
btnRight.addEventListener("click", NextSlide);

//Slider Component
document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") PervSlide();
  e.key === "ArrowRight" && NextSlide();
});

//Call funtions
createDots();
activateDot(0);
goToSlide(0);
