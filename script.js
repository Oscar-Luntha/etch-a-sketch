let container = document.querySelector(".container")
for(let i = 1; i<17; i++ ){
    for (let j=1; j<17; j++){
        let box = document.createElement("div")
        box.setAttribute("class","box")
        box.addEventListener("mouseover",() => {box.classList.add("paint")})
        container.appendChild(box)
    }
}