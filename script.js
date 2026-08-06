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

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const rootElement = document.documentElement;

if (themeToggle) {
  const savedTheme = localStorage.getItem('preferredTheme') || 'dark';
  rootElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === 'light' ? 'Dark' : 'Light';

  themeToggle.addEventListener('click', () => {
    const nextTheme = rootElement.dataset.theme === 'light' ? 'dark' : 'light';
    rootElement.dataset.theme = nextTheme;
    localStorage.setItem('preferredTheme', nextTheme);
    themeToggle.textContent = nextTheme === 'light' ? 'Dark' : 'Light';
  });
}

// Ambient audio toggle
const audioToggle = document.getElementById('audioToggle');
const ambientAudio = document.createElement('audio');
ambientAudio.src = 'https://cdn.pixabay.com/download/audio/2022/03/25/audio_2cb9ce4a7b.mp3?filename=calm-ambient-11253.mp3';
ambientAudio.loop = true;
ambientAudio.volume = 0.18;
let audioOn = false;

if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    audioOn = !audioOn;
    audioToggle.textContent = audioOn ? 'Pause ambiance' : 'Play ambiance';
    if (audioOn) {
      ambientAudio.play().catch(() => {});
    } else {
      ambientAudio.pause();
    }
  });
}

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

function revealOnScroll() {
  const sections = document.querySelectorAll('.animate-on-scroll');
  const threshold = window.innerHeight * 0.85;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < threshold) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  revealOnScroll();
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
    summary: 'Bright and confident, this match brings together freshness and lasting power.',
    description: 'Perfect match for a modern, energetic style. This profile features citrus top notes with a robust woody base.',
    notes: 'Suggested notes: Bergamot, Ambroxan, Cedarwood'
  },
  'bold-daily-spicy-long': {
    title: 'Warm Spicy Adventure',
    summary: 'A bold, spicy signature scent for confident daily wear.',
    description: 'This profile leans into spicy warmth and strong projection, ideal for people who want a memorable fragrance.',
    notes: 'Suggested notes: Pepper, Amber, Sandalwood'
  },
  'elegant-evening-woody-long': {
    title: 'Evening Elegance',
    summary: 'A refined, woody scent built for sophisticated night events.',
    description: 'Ideal for evening wear, this match brings deep base notes and elegant florals together.',
    notes: 'Suggested notes: Cedarwood, Lavender, Tonka Bean'
  },
  'fresh-outdoor-citrus-moderate': {
    title: 'Fresh Outdoor Glow',
    summary: 'Light and invigorating with just enough persistence for daytime wear.',
    description: 'A great choice for active days outside. It balances citrus brightness with moderate depth.',
    notes: 'Suggested notes: Lemon, Jasmine, Mint'
  },
  'bold-outdoor-spicy-long': {
    title: 'Bold Active Energy',
    summary: 'Striking and energetic, designed for outdoor adventures and strong presence.',
    description: 'This match pairs warm spice with durable base notes for a bold, active impression.',
    notes: 'Suggested notes: Amber, Cedarwood, Pepper'
  },
  'elegant-daily-woody-long': {
    title: 'Classic Daytime Luxury',
    summary: 'An elegant, woody daytime scent for polished everyday style.',
    description: 'Perfect for daily wear with a sophisticated edge. It combines refined woody notes with subtle floral accents.',
    notes: 'Suggested notes: Sandalwood, Rose, Vanilla'
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
      summary: 'A versatile choice with strong performance and broad appeal.',
      description: 'Based on your preferences, Sauvage offers an excellent balance of freshness, longevity, and versatility for most personality types.',
      notes: 'Suggested notes: Bergamot, Ambroxan, Cedarwood'
    };
  }
  
  return recommendation;
}

function showResults() {
  const result = getRecommendation();
  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-text').textContent = result.summary;
  document.getElementById('result-description').textContent = result.description;
  document.getElementById('result-notes').textContent = result.notes;
  
  document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
  document.getElementById('quiz-result').classList.add('show');
  document.getElementById('save-quiz-result').style.display = 'inline-flex';
  document.getElementById('try-again-btn').style.display = 'inline-flex';
  document.getElementById('compare-card').innerHTML = renderCompareCard(result);
  addMatchToHistory(result);
  
  document.getElementById('prev-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
}

function resetQuiz() {
  currentQuestion = 1;
  Object.keys(quizAnswers).forEach(key => delete quizAnswers[key]);
  
  document.querySelectorAll('.quiz-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('quiz-result').classList.remove('show');
  document.getElementById('save-quiz-result').style.display = 'none';
  document.getElementById('try-again-btn').style.display = 'none';
  document.getElementById('compare-card').innerHTML = '';
  document.getElementById('next-btn').style.display = 'block';
  
  showQuestion(1);
}

function saveQuizResult() {
  const resultTitle = document.getElementById('result-title').textContent;
  const resultNotes = document.getElementById('result-notes').textContent;
  if (!resultTitle) return;

  const savedMatch = {
    title: resultTitle,
    notes: resultNotes,
    date: new Date().toLocaleDateString(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const existingMatches = JSON.parse(localStorage.getItem('savedFragranceMatches') || '[]');
  const matching = existingMatches.find(match => match.title === savedMatch.title && match.notes === savedMatch.notes);
  if (!matching) {
    existingMatches.unshift(savedMatch);
    localStorage.setItem('savedFragranceMatches', JSON.stringify(existingMatches.slice(0, 5)));
  }

  const saveButton = document.getElementById('save-quiz-result');
  if (saveButton) {
    saveButton.textContent = 'Saved ✓';
  }

  renderSavedMatches();
}

function renderSavedMatches() {
  const savedMatches = JSON.parse(localStorage.getItem('savedFragranceMatches') || '[]');
  const savedMatchesCard = document.getElementById('saved-matches');
  if (!savedMatchesCard) return;

  if (!savedMatches.length) {
    savedMatchesCard.innerHTML = '<div class="saved-card"><strong>Saved quiz matches</strong><p>No saved matches yet. Your top matches will appear here after you save them.</p></div>';
    return;
  }

  savedMatchesCard.innerHTML = `
    <div class="saved-card saved-list">
      <strong>Saved quiz matches</strong>
      ${savedMatches.map(match => `<div class="saved-list-item"><p><strong>${match.title}</strong><br>${match.notes}</p><small>Saved ${match.date} at ${match.timestamp}</small></div>`).join('')}
    </div>
  `;
}

function renderSavedBlends() {
  const savedBlends = JSON.parse(localStorage.getItem('savedPerfumeBlends') || '[]');
  const savedBlendsCard = document.getElementById('saved-blends');
  if (!savedBlendsCard) return;

  if (!savedBlends.length) {
    savedBlendsCard.innerHTML = '<div class="saved-card"><strong>Saved blends</strong><p>Your custom perfume creations will appear here after you save them.</p></div>';
    return;
  }

  savedBlendsCard.innerHTML = `
    <div class="saved-card saved-list">
      <strong>Saved blends</strong>
      ${savedBlends.map(blend => `<div class="saved-list-item"><p><strong>${blend.title}</strong><br>${blend.blendText}</p><small>Saved ${blend.date}</small></div>`).join('')}
    </div>
  `;
}

function savePerfumeBlend() {
  const top = document.getElementById('topNote').value;
  const middle = document.getElementById('middleNote').value;
  const base = document.getElementById('baseNote').value;
  const favorite = document.getElementById('favoriteNote').value;
  const title = document.querySelector('#perfume-result h3')?.textContent;
  const blendText = document.querySelector('#perfume-result p')?.textContent;
  if (!title || !blendText) return;

  const savedBlends = JSON.parse(localStorage.getItem('savedPerfumeBlends') || '[]');
  const savedBlend = {
    title,
    blendText: `${blendText} ${top} + ${middle} + ${base} (${favorite})`,
    date: new Date().toLocaleDateString()
  };
  savedBlends.unshift(savedBlend);
  localStorage.setItem('savedPerfumeBlends', JSON.stringify(savedBlends.slice(0, 5)));

  const saveButton = document.getElementById('save-perfume-blend');
  if (saveButton) saveButton.textContent = 'Saved ✓';
  renderSavedBlends();
}

function restoreSavedBlend() {
  renderSavedBlends();
  const savedBlends = JSON.parse(localStorage.getItem('savedPerfumeBlends') || '[]');
  const saveButton = document.getElementById('save-perfume-blend');
  if (saveButton) {
    saveButton.textContent = savedBlends.length ? 'Saved ✓' : 'Save this blend';
  }
}

function updatePageViews() {
  const pageViewsElement = document.getElementById('pageViews');
  if (!pageViewsElement) return;
  const count = Number(localStorage.getItem('pageViewCount') || '0') + 1;
  localStorage.setItem('pageViewCount', count);
  pageViewsElement.textContent = count;
}

function setupFeedbackForm() {
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackStatus = document.getElementById('feedback-status');
  if (!feedbackForm || !feedbackStatus) return;

  feedbackForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('feedback-name').value.trim();
    const email = document.getElementById('feedback-email').value.trim();
    const message = document.getElementById('feedback-message').value.trim();

    if (!message) {
      feedbackStatus.textContent = 'Please share at least a few words in your message.';
      feedbackStatus.classList.add('feedback-error');
      return;
    }

    const submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
    submissions.unshift({ name: name || 'Anonymous', email: email || 'Not provided', message, date: new Date().toLocaleDateString() });
    localStorage.setItem('feedbackSubmissions', JSON.stringify(submissions.slice(0, 10)));

    feedbackStatus.textContent = 'Thanks for the feedback! It is saved locally for this demo.';
    feedbackStatus.classList.remove('feedback-error');
    feedbackStatus.classList.add('feedback-success');
    feedbackForm.reset();
  });
}

function setupGlossaryModal() {
  const openGlossary = document.getElementById('openGlossary');
  const glossaryModal = document.getElementById('glossaryModal');
  const closeGlossary = document.getElementById('closeGlossary');
  if (!openGlossary || !glossaryModal || !closeGlossary) return;

  const toggleModal = visible => {
    glossaryModal.setAttribute('aria-hidden', !visible);
    glossaryModal.classList.toggle('open', visible);
    document.body.classList.toggle('modal-open', visible);
  };

  openGlossary.addEventListener('click', () => toggleModal(true));
  closeGlossary.addEventListener('click', () => toggleModal(false));

  glossaryModal.addEventListener('click', event => {
    if (event.target === glossaryModal) toggleModal(false);
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && glossaryModal.classList.contains('open')) {
      toggleModal(false);
    }
  });
}

function renderCompareCard(result) {
  return `
    <div class="compare-card-inner">
      <h4>Your match vs Dior Sauvage</h4>
      <p><strong>Your match:</strong> ${result.title}</p>
      <p><strong>Profile:</strong> ${result.notes}</p>
      <p><strong>Compared to Dior Sauvage:</strong> similar freshness with extra personalization in mood and note balance.</p>
    </div>
  `;
}

const quizHistory = [];

function addMatchToHistory(result) {
  quizHistory.push({
    title: result.title,
    notes: result.notes,
    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  });
  const historyCard = document.getElementById('match-history');
  if (historyCard) {
    historyCard.innerHTML = `
      <div class="history-card">
        <h4>Match history</h4>
        ${quizHistory.slice(-3).map(entry => `<p>• ${entry.timestamp}: ${entry.title}</p>`).join('')}
      </div>
    `;
  }
}

function tryAnotherMood() {
  resetQuiz();
  const historyCard = document.getElementById('match-history');
  if (historyCard) {
    historyCard.classList.add('visible');
  }
}

function setupMixer() {
  const notes = document.querySelectorAll('.note-chip');
  const slots = document.querySelectorAll('.mixer-slot');

  notes.forEach(note => {
    note.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', note.textContent);
      e.dataTransfer.setData('category', note.dataset.category);
    });
  });

  slots.forEach(slot => {
    slot.addEventListener('dragover', e => e.preventDefault());
    slot.addEventListener('drop', e => {
      e.preventDefault();
      const note = e.dataTransfer.getData('text/plain');
      const category = e.dataTransfer.getData('category');
      if (slot.dataset.slot === category && note) {
        slot.textContent = `${slot.dataset.label}: ${note}`;
        slot.dataset.selected = note;
        syncMixerWithSelects();
      }
    });
  });

  const clearMixerBtn = document.getElementById('clearMixerBtn');
  if (clearMixerBtn) {
    clearMixerBtn.addEventListener('click', () => {
      slots.forEach(slot => {
        slot.textContent = slot.dataset.label ? `${slot.dataset.label}: Drop ${slot.dataset.label.toLowerCase()} here` : 'Drop note here';
        delete slot.dataset.selected;
      });
      document.getElementById('topNote').value = 'Bergamot';
      document.getElementById('middleNote').value = 'Rose';
      document.getElementById('baseNote').value = 'Vanilla';
      renderPerfumeResult();
    });
  }
}

const notePalette = {
  Bergamot: '#fde68a',
  Lemon: '#fef08a',
  Orange: '#fb923c',
  Mint: '#34d399',
  Rose: '#f9a8d4',
  Jasmine: '#fcd34d',
  Lavender: '#c4b5fd',
  Lily: '#e9d5ff',
  Vanilla: '#fef3c7',
  Sandalwood: '#d8b4a6',
  Cedarwood: '#c084fc',
  Amber: '#f59e0b'
};

function syncMixerWithSelects() {
  const top = document.querySelector('.mixer-slot[data-slot="top"]').dataset.selected;
  const middle = document.querySelector('.mixer-slot[data-slot="middle"]').dataset.selected;
  const base = document.querySelector('.mixer-slot[data-slot="base"]').dataset.selected;

  if (top) document.getElementById('topNote').value = top;
  if (middle) document.getElementById('middleNote').value = middle;
  if (base) document.getElementById('baseNote').value = base;
  renderPerfumeResult();
  updateMixerPreview();
}

function updateMixerPreview() {
  const preview = document.getElementById('mixer-preview');
  if (!preview) return;

  const top = document.querySelector('.mixer-slot[data-slot="top"]').dataset.selected;
  const middle = document.querySelector('.mixer-slot[data-slot="middle"]').dataset.selected;
  const base = document.querySelector('.mixer-slot[data-slot="base"]').dataset.selected;
  const labels = [top, middle, base].filter(Boolean);

  if (!labels.length) {
    preview.innerHTML = `<h4>Live scent preview</h4><p>Drop notes into each slot to see your perfume blend come alive.</p>`;
    preview.style.background = 'rgba(255, 255, 255, 0.08)';
    preview.style.color = 'var(--muted)';
    preview.classList.remove('updated');
    return;
  }

  const colors = labels.map(note => notePalette[note] || '#d1d5db');
  preview.innerHTML = `
    <h4>Live scent preview</h4>
    <p><strong>${labels.join(' • ')}</strong></p>
    <div class="preview-badges">
      ${labels.map(note => `<span class="preview-badge" style="background:${notePalette[note] || '#d1d5db'}">${note}</span>`).join('')}
    </div>
  `;
  preview.style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
  preview.style.color = '#07111f';
  preview.classList.add('updated');
  setTimeout(() => preview.classList.remove('updated'), 400);
}

document.addEventListener('DOMContentLoaded', setupMixer);

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

// Custom perfume builder
const createPerfumeBtn = document.getElementById('createPerfumeBtn');
const perfumeResult = document.getElementById('perfume-result');

function getPerfumeStyle(top, middle, base, favorite) {
  if (['Lemon', 'Orange', 'Mint'].includes(top) && ['Rose', 'Jasmine'].includes(middle)) {
    return {
      title: 'Bright Floral Freshness',
      description: `A vivid opening with ${top.toLowerCase()} and a floral heart, grounded by ${base.toLowerCase()} for a polished finish.`,
      highlight: `Fresh, uplifting, and elegant with ${favorite.toLowerCase()} at the heart.`
    };
  }

  if (['Bergamot', 'Lemon'].includes(top) && ['Lavender', 'Lily'].includes(middle)) {
    return {
      title: 'Crisp Aromatic Comfort',
      description: `A refined fragrance with citrus clarity and green floral softness resting on ${base.toLowerCase()}.`,
      highlight: `Versatile and wearable every day, enriched by ${favorite.toLowerCase()}.`
    };
  }

  if (['Amber', 'Sandalwood', 'Cedarwood'].includes(base)) {
    return {
      title: 'Warm Woods & Depth',
      description: `Rich base notes of ${base.toLowerCase()} give this blend a long-lasting, sophisticated finish.`,
      highlight: `Cozy, elegant, and memorable with ${favorite.toLowerCase()} adding a personal touch.`
    };
  }

  return {
    title: 'Balanced Signature Blend',
    description: `A harmonious combination of ${top.toLowerCase()}, ${middle.toLowerCase()}, and ${base.toLowerCase()} for a beautifully balanced fragrance.`,
    highlight: `Fresh, elegant, and easy to love, with ${favorite.toLowerCase()} as the signature note.`
  };
}

function renderPerfumeResult() {
  const top = document.getElementById('topNote').value;
  const middle = document.getElementById('middleNote').value;
  const base = document.getElementById('baseNote').value;
  const favorite = document.getElementById('favoriteNote').value;
  const profile = getPerfumeStyle(top, middle, base, favorite);

  perfumeResult.innerHTML = `
    <h3>${profile.title}</h3>
    <p>${profile.description}</p>
    <p><strong>Your blend:</strong> ${top} + ${middle} + ${base}</p>
    <p><strong>Favorite note:</strong> ${favorite}</p>
    <p class="blend">${profile.highlight}</p>
  `;
}

if (createPerfumeBtn) {
  createPerfumeBtn.addEventListener('click', () => {
    renderPerfumeResult();
    const savePerfumeBtn = document.getElementById('save-perfume-blend');
    if (savePerfumeBtn) savePerfumeBtn.style.display = 'inline-flex';
  });
}

const saveQuizBtn = document.getElementById('save-quiz-result');
if (saveQuizBtn) {
  saveQuizBtn.addEventListener('click', saveQuizResult);
  saveQuizBtn.style.display = 'none';
}

const resetQuizBtn = document.getElementById('reset-quiz-btn');
if (resetQuizBtn) {
  resetQuizBtn.addEventListener('click', resetQuiz);
}

const tryAgainBtn = document.getElementById('try-again-btn');
if (tryAgainBtn) {
  tryAgainBtn.addEventListener('click', tryAnotherMood);
}

const savePerfumeBtn = document.getElementById('save-perfume-blend');
if (savePerfumeBtn) {
  savePerfumeBtn.addEventListener('click', savePerfumeBlend);
  savePerfumeBtn.style.display = 'none';
}

window.addEventListener('load', () => {
  restoreSavedBlend();
  renderSavedMatches();
  renderSavedBlends();
  setupFeedbackForm();
  setupGlossaryModal();
  updatePageViews();
});

document.querySelectorAll('.quiz-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const question = this.closest('.quiz-question').dataset.question;
    selectAnswer(this, question);
  });
});

