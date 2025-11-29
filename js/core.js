export function checkMatch(drawingData, patternData) {
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
    return { success: true, accuracy: accuracy };
  } else {
    return { success: false, accuracy: accuracy };
  }
}

export function drawGrid(
  container,
  drawingData,
  levels,
  currentLevel,
  colorPalette,
  currentPaintMode,
  isPattern = false,
) {
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

    const color = drawingData[i];

    box.style.backgroundColor = `rgb(${color.r}, ${color.g},  ${color.b})`;

    // add some border radius to top left, right, bottom left, right corners
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
      setupDrawingInteraction(
        box,
        container,
        levels,
        currentLevel,
        colorPalette,
        drawingData,
        currentPaintMode,
      );
    }

    container.appendChild(box);
  }
}

function setupDrawingInteraction(
  box,
  container,
  levels,
  currentLevel,
  colorPalette,
  drawingData,
  currentPaintMode,
) {
  const paintBox = (element) => {
    const index = parseInt(element.dataset.index);

    const levelConfig = levels[currentLevel - 1];

    const availableColors = colorPalette.slice(0, levelConfig.colors);

    // TODO: isolate the default color for future reuse
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

  if (currentPaintMode === "click") {
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

export function generatePattern(levelConfig, colorPalette) {
  const { gridSize, fillPercent, colors } = levelConfig;

  const totalCells = gridSize * gridSize;
  const cellsToFill = Math.floor((totalCells * fillPercent) / 100);

  const pattern = [];

  //initialize all cells colors
  for (let i = 0; i < totalCells; i++) {
    // TODO: isolate this default color
    pattern.push({ r: 158, g: 153, b: 147 });
  }

  // Randomly fill cells with colors from a predefined set
  //
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

export function clearDrawingGrid(
  levels,
  drawingData,
  drawingGrid,
  currentLevel,
  currentPaintMode,
  colorPalette,
) {
  const levelConfig = levels[currentLevel - 1];
  const totalCells = levelConfig.gridSize * levelConfig.gridSize;

  drawingData = [];

  for (let i = 0; i < totalCells; i++) {
    drawingData.push({ r: 158, g: 153, b: 147 });
  }

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
