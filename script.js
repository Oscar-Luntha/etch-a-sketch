let container = document.querySelector(".container")
let btn = document.querySelector("button")
let defaultGrid = 16;
btn.addEventListener("click", () => {
    getGridSize()
})
function getGridSize(){
    gridSize = prompt("Enter grid size in range 1 - 100");
    console.log(gridSize)
    drawGrid(gridSize)
    return gridSize;
}
function drawGrid(gridSize){
    let position = container.getBoundingClientRect()
    let containerWidth = position.width
    let containerHeight = position.height
    let boxWidth = containerWidth / gridSize
    let boxHeight = containerHeight / gridSize
    console.log(boxHeight, boxWidth)
}
