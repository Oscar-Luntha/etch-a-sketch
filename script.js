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

let currentMode = "click"; // TODO: user should be able to cycle through click and hover (i don't recommend this tho)
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

function toggleTheme() {
  isLightTheme = !isLightTheme;
  document.body.classList.toggle("light-theme", isLightTheme);
}

function rotateView() {
  const containers = document.querySelectorAll(".container");
  containers.forEach((container) => {
    container.style.transform =
      container.style.transform === "rotateY(180deg)"
        ? "rotateY(0deg)"
        : "rotateY(180deg)";
  });
}

// Game logic
modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    initLevel(currentLevel);
  });
});

clearBtn.addEventListener("click", () => {
  clearDrawingGrid();
});

checkBtn.addEventListener("click", () => {
  checkMatch();
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

function generatePattern(levelConfig) {
  const { gridSize, fillPercent, colors } = levelConfig;
  const totalCells = gridSize * gridSize;
  const cellsToFill = Math.floor((totalCells * fillPercent) / 100);
  const pattern = [];

  // init  all cells colors,
  for (let i = 0; i < totalCells; i++) {
    pattern.push({ r: 158, g: 153, b: 147 });
  }

  // Randomly fill cells with colors from predefined set
  const filledIndices = new Set();
  while (filledIndices.size < cellsToFill) {
    const randomIndex = Math.floor(Math.random() * totalCells);
    if (!filledIndices.has(randomIndex)) {
      filledIndices.add(randomIndex);
      const colorIndex = Math.floor(Math.random() * colors);
      pattern[randomIndex] = colorPalette[colorIndex];
    }
  }

  return pattern;
}

function drawGrid(container, data, isPattern = false) {
  container.innerHTML = "";
  const levelConfig = levels[currentLevel - 1];
  const gridSize = levelConfig.gridSize;
  const position = container.getBoundingClientRect();
  const boxWidth = (position.width - 4) / gridSize;
  const boxHeight = (position.height - 4) / gridSize;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const box = document.createElement("div");
    box.classList.add("gridBox");
    box.classList.add(isPattern ? "pattern-box" : "drawing-box");
    box.style.width = boxWidth + "px";
    box.style.height = boxHeight + "px";
    box.dataset.index = i;

    const color = data[i];
    box.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

    //  add soem border radious to top left, right, bottom left, right corners
    const totalCells = gridSize * gridSize;
    const topLeft = 0;
    const topRight = gridSize - 1;
    const bottomLeft = totalCells - gridSize;
    const bottomRight = totalCells - 1;

    if (i === topLeft) {
      box.style.borderTopLeftRadius = "6px";
    }
    if (i === topRight) {
      box.style.borderTopRightRadius = "6px";
    }
    if (i === bottomLeft) {
      box.style.borderBottomLeftRadius = "6px";
    }
    if (i === bottomRight) {
      box.style.borderBottomRightRadius = "6px";
    }

    if (!isPattern) {
      setupDrawingInteraction(box, container);
    }

    container.appendChild(box);
  }
}
function setupDrawingInteraction(box, container) {
  const paintBox = (element) => {
    const index = parseInt(element.dataset.index);

    const levelConfig = levels[currentLevel - 1];
    const availableColors = colorPalette.slice(0, levelConfig.colors);

    availableColors.push({ r: 158, g: 153, b: 147 });

    const currentColor = drawingData[index];
    let currentColorIndex = availableColors.findIndex(
      (c) =>
        c.r === currentColor.r &&
        c.g === currentColor.g &&
        c.b === currentColor.b,
    );

    currentColorIndex = (currentColorIndex + 1) % availableColors.length;
    const newColor = availableColors[currentColorIndex];

    drawingData[index] = newColor;
    element.style.backgroundColor = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
  };

  if (currentMode === "click") {
    box.addEventListener("click", () => paintBox(box));
  } else {
    let isDrawing = false;

    container.addEventListener("mousedown", () => (isDrawing = true));
    container.addEventListener("mouseup", () => (isDrawing = false));
    container.addEventListener("mouseleave", () => (isDrawing = false));

    box.addEventListener("mouseenter", () => {
      if (isDrawing) paintBox(box);
    });
    box.addEventListener("mousedown", () => paintBox(box));
  }
}

function clearDrawingGrid() {
  const levelConfig = levels[currentLevel - 1];
  const totalCells = levelConfig.gridSize * levelConfig.gridSize;
  drawingData = [];
  for (let i = 0; i < totalCells; i++) {
    drawingData.push({ r: 158, g: 153, b: 147 });
  }
  drawGrid(drawingGrid, drawingData, false);
}

function checkMatch() {
  let matches = 0;
  const totalCells = patternData.length;

  for (let i = 0; i < totalCells; i++) {
    const pattern = patternData[i];
    const drawing = drawingData[i];

    if (
      pattern.r === drawing.r &&
      pattern.g === drawing.g &&
      pattern.b === drawing.b
    ) {
      matches++;
    }
  }

  const accuracy = Math.round((matches / totalCells) * 100);

  if (matches === totalCells) {
    showModal(true, accuracy);
  } else {
    showModal(false, accuracy);
  }
}

function showModal(success, accuracy) {
  if (success) {
    modalTitle.textContent = "Perfect Match!";
    modalTitle.className = "modal-title success";
    modalMessage.textContent = `You matched all cells correctly! Accuracy: ${accuracy}%`;
    nextBtn.style.display = currentLevel < 5 ? "block" : "none";
    if (currentLevel === 5) {
      modalMessage.textContent = " You completed all levels! Play again?";
      nextBtn.textContent = "Play Again";
      nextBtn.style.display = "block";
    }
  } else {
    modalTitle.textContent = "Not Quite!";
    modalTitle.className = "modal-title error";
    modalMessage.textContent = `You matched ${accuracy}% of the cells. Try again!`;
    nextBtn.style.display = "none";
  }
  resultModal.classList.add("active");
}

function initLevel(level) {
  currentLevel = level;
  currentLevelDisplay.textContent = level;

  const levelConfig = levels[level - 1];
  difficultyBadge.textContent = levelConfig.name;
  difficultyBadge.className = `difficulty-badge difficulty-${levelConfig.name.toLowerCase().replace(" ", "")}`;

  const totalCells = levelConfig.gridSize * levelConfig.gridSize;

  patternData = generatePattern(levelConfig);
  drawingData = [];
  for (let i = 0; i < totalCells; i++) {
    drawingData.push({ r: 158, g: 153, b: 147 });
  }

  drawGrid(patternGrid, patternData, true);
  drawGrid(drawingGrid, drawingData, false);
}

// Initialize theme and game
document.querySelector(".menu-btn").addEventListener("click", toggleTheme);
document.querySelector(".rotate-btn").addEventListener("click", rotateView);

// Initialize the game
initLevel(1);
