function createPerfume(){

    let top = document.getElementById("topNote").value;
    let middle = document.getElementById("middleNote").value;
    let base = document.getElementById("baseNote").value;

    let names = [
        "Midnight Bloom",
        "Golden Dream",
        "Ocean Mist",
        "Royal Rose",
        "Velvet Secret",
        "Moonlight Kiss",
        "Crystal Garden",
        "Pure Elegance",
        "Sunset Glow",
        "Secret Blossom"
    ];

    let randomName = names[Math.floor(Math.random() * names.length)];

    document.getElementById("result").innerHTML = `
        <h2>✨ Your Perfume is Ready! ✨</h2>

        <p><strong>Name:</strong> ${randomName}</p>

        <p>🍋 Top Note: ${top}</p>

        <p>🌸 Middle Note: ${middle}</p>

        <p>🌿 Base Note: ${base}</p>

        <h3>Enjoy your unique fragrance!</h3>
    `;
}