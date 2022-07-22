function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}


function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


