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
    button.setAttribute('aria-pressed', nextText !== 'Ready to explore.');
    
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

// ===== FRAGRANCE QUIZ =====
let currentQuestion = 1;
const totalQuestions = 4;
const quizAnswers = {};

const fragranceRecommendations = {
  'fresh-daily-citrus-long': {
    title: 'Dior Sauvage Eau de Parfum',
    description: 'Perfect match! Your profile matches Sauvage exactly - fresh, versatile, and long-lasting with citrus notes.'
  },
  'bold-daily-spicy-long': {
    title: 'Dior Sauvage (Bold Edition)',
    description: 'The woody-spicy profile of Sauvage is ideal for your bold personality and all-day wear.'
  },
  'elegant-evening-woody-long': {
    title: 'Premium Luxury Fragrance',
    description: 'Look for fragrances with woody and elegant notes for evening sophistication.'
  },
  'fresh-outdoor-citrus-moderate': {
    title: 'Sauvage or Fresh Alternatives',
    description: 'Sauvage is excellent for outdoor activities with its fresh citrus and moderate longevity.'
  },
  'bold-outdoor-spicy-long': {
    title: 'Bold Outdoor Fragrance',
    description: 'Choose fragrances with strong projection and warm spice notes for outdoor adventures.'
  },
  'elegant-daily-woody-long': {
    title: 'Classic Elegant Fragrance',
    description: 'Woody, long-lasting fragrances are perfect for sophisticated daily wear.'
  }
};

function showQuestion(qNum) {
  const questions = document.querySelectorAll('.quiz-question');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  questions.forEach(q => {
    q.classList.remove('active', 'prev');
    if (parseInt(q.dataset.question) === qNum) {
      q.classList.add('active');
    } else if (parseInt(q.dataset.question) < qNum) {
      q.classList.add('prev');
    }
  });
  
  document.getElementById('current-q').textContent = qNum;
  prevBtn.style.display = qNum === 1 ? 'none' : 'block';
  nextBtn.textContent = qNum === totalQuestions ? 'See Results' : 'Next →';
  
  currentQuestion = qNum;
}

function selectAnswer(btn, question) {
  const buttons = btn.parentElement.querySelectorAll('.quiz-btn');
  buttons.forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  quizAnswers[question] = btn.dataset.value;
}

function getRecommendation() {
  const key = `${quizAnswers[1]}-${quizAnswers[2]}-${quizAnswers[3]}-${quizAnswers[4]}`;
  let recommendation = fragranceRecommendations[key];
  
  if (!recommendation) {
    recommendation = {
      title: 'Dior Sauvage - A Great Choice!',
      description: 'Based on your preferences, Sauvage offers an excellent balance of freshness, longevity, and versatility for most personality types.'
    };
  }
  
  return recommendation;
}

function showResults() {
  const result = getRecommendation();
  document.getElementById('result-text').textContent = result.title;
  document.getElementById('result-description').textContent = result.description;
  
  document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
  document.getElementById('quiz-result').classList.add('show');
  
  document.getElementById('prev-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
}

function resetQuiz() {
  currentQuestion = 1;
  Object.keys(quizAnswers).forEach(key => delete quizAnswers[key]);
  
  document.querySelectorAll('.quiz-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('quiz-result').classList.remove('show');
  document.getElementById('next-btn').style.display = 'block';
  
  showQuestion(1);
}

document.getElementById('next-btn').addEventListener('click', () => {
  const currentQBtn = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
  const selected = currentQBtn.querySelector('.quiz-btn.selected');
  
  if (!selected) {
    alert('Please select an option!');
    return;
  }
  
  if (currentQuestion === totalQuestions) {
    showResults();
  } else {
    showQuestion(currentQuestion + 1);
  }
});

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentQuestion > 1) {
    showQuestion(currentQuestion - 1);
  }
});

document.querySelectorAll('.quiz-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const question = this.closest('.quiz-question').dataset.question;
    selectAnswer(this, question);
  });
});

function createPerfume() {
  const topNote = document.getElementById('topNote').value;
  const middleNote = document.getElementById('middleNote').value;
  const baseNote = document.getElementById('baseNote').value;
  const result = document.getElementById('perfume-result');

  const blendName = `${topNote} · ${middleNote} · ${baseNote}`;
  const description = `Your custom perfume combines ${topNote.toLowerCase()} as the bright top note, ${middleNote.toLowerCase()} at the heart, and ${baseNote.toLowerCase()} for a warm, lingering finish.`;

  result.innerHTML = `
    <h3>✨ Your Perfume is Ready!</h3>
    <p>${description}</p>
    <span class="blend">Blend: ${blendName}</span>
  `;
}

document.getElementById('createPerfumeBtn').addEventListener('click', createPerfume);
