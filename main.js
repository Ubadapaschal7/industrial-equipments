document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target); // animate once
                }
            });
        },
        {
            threshold: 0.2 // triggers when 20% is visible
        }
    );

    revealElements.forEach(el => observer.observe(el));
});


// NAVBAR SCROLL
const navLinks = document.querySelector('.nav-links');
const navBtn = document.querySelector('.nav_btn');

navBtn.addEventListener('click', function () {
navLinks.classList.toggle('show-links')
});


// NAVBAR SCROLL
const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // switch button
const container = document.querySelector(".switch_btn");
const btns = document.querySelectorAll(".category_btn");
const articles = document.querySelectorAll(".content");

if (container) {
  container.addEventListener("click", function (e) {
    
    const button = e.target.closest(".category_btn");
    if (!button) return;

    const id = button.dataset.id;

    // remove active from all cards
    btns.forEach(btn => {
      btn.parentElement.classList.remove("active");
    });

    // add active to clicked card
    button.parentElement.classList.add("active");

    // hide all content
    articles.forEach(article => {
      article.classList.remove("active");
    });

    // show selected content
    const element = document.getElementById(id);
    if (element) element.classList.add("active");
  });
}




//   SLIDER
const track = document.querySelector('.review_track');
const cards = document.querySelectorAll('.single_review_card');
const dotsContainer = document.querySelector('.review_dots');

if (track && cards.length > 0 && dotsContainer) {
  
let index = 0;

/* create dots */
cards.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');

  dot.addEventListener('click', () => {
    index = i;
    updateSlider();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.review_dots span');

/* update slider */
function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

/* auto slide */
setInterval(() => {
  index++;
  if (index >= cards.length) index = 0;
  updateSlider();
}, 5000);
}