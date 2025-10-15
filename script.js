// ================================
// Image Overlay Simulation
// ================================

// When called, displays the element with ID 'output'
function simulateOverlay() {
    const output = document.getElementById('output');
    output.style.display = 'block';
}

// ================================
// Rotating Image Slideshow
// ================================

// Array of image element IDs
const images = [
    "images-image-1",
    "images-image-2",
    "images-image-3",
];

let currentIndex = 0;

// Function to cycle to the next image every 5 seconds
function changeImage() {
    // Remove 'active' class from current image
    const currentImage = document.getElementById(images[currentIndex]);
    currentImage.classList.remove('active');

    // Move to next image index (loop back to 0 at end)
    currentIndex = (currentIndex + 1) % images.length;

    // Add 'active' class to next image
    const nextImage = document.getElementById(images[currentIndex]);
    nextImage.classList.add('active');
}

// Automatically change image every 5 seconds
setInterval(changeImage, 5000);

// ================================
// Puzzle Game Logic
// ================================

const rows = 3;
const cols = 3;
const game = document.getElementById("game");
const positions = [];

// Lav alle koordinater (0,0), (0,1)...(2,2)
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    positions.push({ row: r, col: c });
  }
}

// Bland positionerne
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(positions);

// Lav felter med korrekt baggrund
positions.forEach((pos, index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.draggable = true;
  tile.dataset.position = `${pos.row}-${pos.col}`;

  // Positionér baggrunden for at vise korrekt udsnit
  tile.style.backgroundPosition = `-${pos.col * 120}px -${pos.row * 120}px`;

  game.appendChild(tile);
});

// Drag & drop logik
let currentTile = null;

document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("dragstart", function () {
    currentTile = this;
  });

  tile.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  tile.addEventListener("drop", function () {
    if (currentTile === this) return;

    // Swap baggrunde
    let temp = this.style.backgroundPosition;
    this.style.backgroundPosition = currentTile.style.backgroundPosition;
    currentTile.style.backgroundPosition = temp;
  });
});
