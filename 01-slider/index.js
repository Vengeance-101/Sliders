let target = 0;
let current = 0;
let ease = 0.075;

const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider-wrapper");
const slides = document.querySelectorAll(".slide");
let maxscroll = sliderWrapper.offsetWidth - window.innerWidth;
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function updateScaleAndPosition() {
  console.log(slider.length);
  for (var i = 0, len = slides.length; i < len; i++) {
    const rect = slides[i].getBoundingClientRect();
    const centerPosition = (rect.left + rect.right) / 2;
    const distanceFromCenter = centerPosition - window.innerWidth / 2;

    let scale, offsetX;
    if (distanceFromCenter > 0) {
      scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth);
      offsetX = (scale - 1) * 300;
    } else {
      scale = Math.max(
        0.5,
        1 - Math.abs(distanceFromCenter) / window.innerWidth
      );
      offsetX = 0;
    }

    gsap.set(slides[i], {
      scale: scale,
      x: offsetX,
    });
  }
}
function update() {
  current = lerp(current, target, ease);
  gsap.set(".slider-wrapper", {
    x: -current,
  });

  updateScaleAndPosition();

  requestAnimationFrame(update);
}
update();
window.addEventListener("resize", () => {
  maxscroll = sliderWrapper.offsetWidth - window.innerWidth;
});
window.addEventListener("wheel", (e) => {
  target += e.deltaY;
  target = Math.max(0, target);
  target = Math.min(maxscroll, target);
  console.log(target);
  console.log(e.deltaY);
});

let next = document.querySelector(".next-btn");
let prev = document.querySelector(".previous-btn");

next.addEventListener("click", () => {
  target -= 900 / 2;
});
prev.addEventListener("click", () => {
  target += 900 / 2;
});
