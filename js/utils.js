function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}


function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}




// function createMat(ROWS, COLS) {
//     var mat = []
//     for (var i = 0; i < ROWS; i++) {
//         var row = []
//         for (var j = 0; j < COLS; j++) {
//             row.push('')
//         }
//         mat.push(row)
//     }
//     return mat
// }


// // function renderCell(location, value) {
// //     var cellSelector = '.' + getClassName(location)
// //     var elCell = document.querySelector(cellSelector);
// //     elCell.innerHTML = value;
// // }

// // function getEmptyCells() {
// //     for (var i = 0; i < gBoard.length; i++) {
// //         for (var j = 0; j < gBoard[0].length; j++) {
// //             console.log('KKK')
// //         }
// //     }
// // }



