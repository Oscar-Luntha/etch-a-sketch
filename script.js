let container = document.querySelector(".container")
let btn = document.querySelector("button")
let defaultGrid = 16;
btn.addEventListener("click", () => {
    getGridSize()
})
function getGridSize(){
    let userInput = prompt("Enter grid size in range 1 - 100");
    let gridSize = parseInt(userInput, 10)
    console.log(typeof(gridSize))
    if(gridSize < 1 || gridSize > 100){
        getGridSize()
    }
    drawGrid(gridSize)
    return gridSize;
}
function drawGrid(gridSize){
    let position = container.getBoundingClientRect()
    let containerWidth = position.width
    let containerHeight = position.height
    let boxWidth = containerWidth / gridSize
    let boxHeight = containerHeight / gridSize    
}
