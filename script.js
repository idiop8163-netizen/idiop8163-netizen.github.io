const button = document.querySelector('[data-action="toggle"]');
const status = document.querySelector('[data-status]');

if (button && status) {
  button.addEventListener('click', () => {
    const nextText = status.textContent === 'Ready to explore.'
      ? 'The experience is now refreshed.'
      : 'Ready to explore.';

    status.textContent = nextText;
    button.textContent = nextText === 'Ready to explore.' ? 'Refresh mood' : 'Reset mood';
  });
}
