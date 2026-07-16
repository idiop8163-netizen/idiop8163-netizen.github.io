function createPerfume() {
  const topNote = document.getElementById('topNote').value;
  const middleNote = document.getElementById('middleNote').value;
  const baseNote = document.getElementById('baseNote').value;
  const result = document.getElementById('result');

  const blendName = `${topNote} · ${middleNote} · ${baseNote}`;
  const description = `Your custom perfume combines ${topNote.toLowerCase()} as the bright top note, ${middleNote.toLowerCase()} at the heart, and ${baseNote.toLowerCase()} for a warm, lingering finish.`;

  result.innerHTML = `
    <h2>✨ Your Perfume is Ready! ✨</h2>
    <p>${description}</p>
    <p class="blend">Blend: ${blendName}</p>
  `;
}

document.getElementById('createButton').addEventListener('click', createPerfume);
