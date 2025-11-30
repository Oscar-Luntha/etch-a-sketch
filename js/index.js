import {
  clearDrawingGrid,
  generatePattern,
  checkMatch,
  drawGrid,
} from "./core.js";

import { showModal } from "./utils.js";

const drawingGrid = document.getElementById("drawingGrid");
const patternGrid = document.getElementById("patternGrid");
const checkBtn = document.getElementById("checkBtn");
const clearBtn = document.getElementById("clearBtn");
const currentLevelDisplay = document.getElementById("currentLevel");
const difficultyBadge = document.getElementById("difficultyBadge");
const modeBtns = document.querySelectorAll(".mode-btn");
const resultModal = document.getElementById("resultModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const retryBtn = document.getElementById("retryBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playButton")
const menuBtn = document.getElementById("menu-btn")
const visibilityToggle = [playBtn , menuBtn]

let currentPaintMode = "click"; // TODO: user should be able to cycle through click and hover (i don't recommend this tho)
let currentLevel = 1;
let patternData = [];
let drawingData = [];
let isLightTheme = false;

const levels = [
  {
    level: 1,
    name: "Easy",
    gridSize: 4,
    fillPercent: 30,
    colors: 2,
  },
  {
    level: 2,
    name: "Medium",
    gridSize: 6,
    fillPercent: 35,
    colors: 3,
  },
  {
    level: 3,
    name: "Hard",
    gridSize: 8,
    fillPercent: 40,
    colors: 4,
  },
  {
    level: 4,
    name: "Very Hard",
    gridSize: 10,
    fillPercent: 45,
    colors: 5,
  },
  {
    level: 5,
    name: "Insane",
    gridSize: 12,
    fillPercent: 50,
    colors: 6,
  },
];

const colorPalette = [
  { r: 239, g: 68, b: 68 }, // Red
  { r: 59, g: 130, b: 246 }, // Blue
  { r: 16, g: 185, b: 129 }, // Green
  { r: 245, g: 158, b: 11 }, // Yellow
  { r: 168, g: 85, b: 247 }, // Purple
  { r: 236, g: 72, b: 153 }, // Pink
  // TODO: add more colors
];

// toggle the main theme for the game
function toggleTheme() {
  isLightTheme = !isLightTheme;
  document.body.classList.toggle("light-theme", isLightTheme);
}

// rotate the container and grids
function rotateView() {
  const containers = document.querySelectorAll(".container");
  containers.forEach((container) => {
    container.style.transform =
      container.style.transform === "rotateY(180deg)"
        ? "rotateY(0deg)"
        : "rotateY(180deg)";
  });
}

// cycle through click and hover mode
modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentPaintMode = btn.dataset.mode;
    initLevel(currentLevel);
  });
});

visibilityToggle.map(btn => {
  btn.addEventListener('click', () => {
  const gameContent = document.querySelector(".game-content")
  const menuScreen = document.querySelector(".menu-screen")
  if (gameContent.style.display === "none") {
    gameContent.style.display = "block";
    menuScreen.style.display = "none"
    initLevel(currentLevel);
   } else {
     gameContent.style.display = "none";
     menuScreen.style.display = "flex"
   }
  })
})

clearBtn.addEventListener("click", () => {
  clearDrawingGrid(
    levels,
    drawingData,
    drawingGrid,
    currentLevel,
    currentPaintMode,
    colorPalette,
  );
});

checkBtn.addEventListener("click", () => {
  const { success, accuracy } = checkMatch(drawingData, patternData);

  console.log("check Match: ", checkMatch(drawingData, patternData));

  console.log("success: ", success);
  console.log("accuracy: ", accuracy);

  showModal(
    success,
    accuracy,
    modalTitle,
    modalMessage,
    nextBtn,
    resultModal,
    currentLevel,
  );
});

retryBtn.addEventListener("click", () => {
  resultModal.classList.remove("active");
  initLevel(currentLevel);
});

nextBtn.addEventListener("click", () => {
  resultModal.classList.remove("active");
  if (currentLevel < 5) {
    currentLevel++;
    initLevel(currentLevel);
  } else {
    currentLevel = 1;
    initLevel(currentLevel);
  }
});

function initLevel(level) {
  currentLevel = level;
  currentLevelDisplay.textContent = level;

  const levelConfig = levels[level - 1];
  difficultyBadge.textContent = levelConfig.name;
  difficultyBadge.className = `difficulty-badge difficulty-${levelConfig.name.toLowerCase().replace(" ", "")}`;

  const totalCells = levelConfig.gridSize * levelConfig.gridSize;

  patternData = generatePattern(levelConfig, colorPalette);

  drawingData = [];
  for (let i = 0; i < totalCells; i++) {
    drawingData.push({ r: 158, g: 153, b: 147 });
  }

  drawGrid(
    patternGrid,
    patternData,
    levels,
    currentLevel,
    colorPalette,
    currentPaintMode,
    true,
  );
  drawGrid(
    drawingGrid,
    drawingData,
    levels,
    currentLevel,
    colorPalette,
    currentPaintMode,
    false,
  );
}

// Initialize theme and game
document.querySelector(".menu-btn").addEventListener("click", toggleTheme);
document.querySelector(".rotate-btn").addEventListener("click", rotateView);

// initLevel(1);
