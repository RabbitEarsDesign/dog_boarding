// ONSCROLL ANIMATIONS
const scrollElements = document.querySelectorAll(".section-content");

document.addEventListener("onload", () => {
  scrollElements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(100%)";
  });
});

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  throttle(handleScrollAnimation, 250);
});

const squares = document.querySelectorAll(".square");

const squaresToArr = Array.apply(null, squares);

squaresToArr.forEach((square) => {
  square.addEventListener("click", squareClick);
});

// THROTTLE FOR ONSCROLL ANIMATIONS
// initialize throttleTimer as false
let throttleTimer = false;

const throttle = (callback, time) => {
  // dont run the function while throttleTimer is true
  if (throttleTimer) return;

  // first set throttle timer to true so the function doesnt run
  throttleTimer = true;

  setTimeout(() => {
    // call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed
    callback();
    throttleTimer = false;
  }, time);
};
