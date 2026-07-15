// Mood button toggle
const button = document.querySelector('[data-action="toggle"]');
const status = document.querySelector('[data-status]');

if (button && status) {
  button.addEventListener('click', () => {
    const nextText = status.textContent === 'Ready to explore.'
      ? 'The experience is now refreshed.'
      : 'Ready to explore.';

    status.textContent = nextText;
    button.textContent = nextText === 'Ready to explore.' ? 'Refresh mood' : 'Reset mood';
    
    button.style.animation = 'none';
    setTimeout(() => {
      button.style.animation = '';
    }, 10);
  });
}

// Pyramid level tooltips
const pyramidLevels = document.querySelectorAll('.pyramid-level');
pyramidLevels.forEach(level => {
  level.addEventListener('mouseenter', (e) => {
    const tooltip = level.getAttribute('data-tooltip');
    if (tooltip) {
      level.title = tooltip;
    }
  });
});

// Image Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function goToSlide(n) {
  currentSlide = (n + totalSlides) % totalSlides;
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Carousel button controls
const prevBtn = document.querySelector('[data-direction="prev"]');
const nextBtn = document.querySelector('[data-direction="next"]');

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Dot controls
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    goToSlide(index);
  });
});

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

// Gallery items zoom on click
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    this.style.animation = 'none';
    setTimeout(() => {
      this.style.animation = '';
      this.style.transform = 'scale(1.15)';
      setTimeout(() => {
        this.style.transform = 'scale(1.08)';
      }, 100);
    }, 10);
  });
});

// Fade in animation on load
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card, .spec-card, .compare-item, .gallery-item');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    setTimeout(() => {
      card.style.transition = 'all 400ms ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50);
  });
});
