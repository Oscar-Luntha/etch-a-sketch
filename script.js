let container = document.querySelector(".container")
let btn = document.querySelector("button")
let defaultGrid = 16;
btn.addEventListener("click", () => {
    getGridSize()
})
function getGridSize(){
    gridSize = prompt("Enter grid size in range 1 - 100");
    console.log(gridSize)
    return gridSize;

}
