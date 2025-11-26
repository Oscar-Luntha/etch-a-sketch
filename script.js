let container = document.querySelector(".container")
drawGrid(1)
let btn = document.querySelector("button")
let defaultGrid = 16;
btn.addEventListener("click", () => {
    getGridSize()
})
function getGridSize(){
    let userInput = prompt("Enter grid size in range 1 - 100");
    let gridSize = parseInt(userInput, 10)
    if(gridSize < 1 || gridSize > 100){
        getGridSize()
    }else{
        drawGrid(gridSize)
    }

}
function drawGrid(gridSize){
    container.innerHTML = "";
    let position = container.getBoundingClientRect()
    let containerWidth = position.width
    let containerHeight = position.height
    let boxWidth =containerWidth / gridSize
    let boxHeight = containerHeight/ gridSize
    for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {  
        let box = document.createElement("div");
        box.classList.add("gridBox");
        box.style.width = boxWidth + "px";
        box.style.height = boxHeight+ "px";
        box.addEventListener("mouseover", () => {
            let red = Math.floor(Math.random() * 255)
            let green = Math.floor(Math.random() * 255)
            let blue = Math.floor(Math.random() * 255)
            box.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
        })
        container.appendChild(box);
        }
    }
}
