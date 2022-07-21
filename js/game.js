'use strict'

const WALL = '#'
const MINE = '💣'
const FOOD = '.'
const SUPERFOOD = 'o'
const EMPTY = ' '
const DEAD = 'D'
const CHERRY = '%'
const SIZE = 4
const ONE = '1️⃣'
const FLAG = '🚩'


//var BOMB_IMG = '<img src="img/gamer.png" />'
//var BOMB_IMG = '<img src="img/bomb.png" />'
var BOMB_IMG = '<img src="img/gamer.png" />'

//var gBoard =



//console.log('hello')


var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }


var gElSelectedSeat = null
var gBoard
var gFirstCell = false
var gFirstCellX
var gFirstcellY
var gLifeCount = 3
var gFirstClick = false
// gBoard = buildBoard()
// gBoard = setMinesNegsCount(gBoard)
// renderBoard()
//console.log('gboard', gBoard)

//renderBoard()




// Done: initGame()
// Done: buildBoard()
// setMinesNegsCount(board)
// Done: renderBoard(board)
// cellClicked(elCell, i, j)
// cellMarked(elCell)
// checkGameOver()
// expandShown(board, elCell, i, j)

/// 


///Remove Default Right Click menu
window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

function Timer() {
    var sec = 0
    function pad(val) { return val > 9 ? val : "0" + val; }
    setInterval(function () {
        document.getElementById("seconds").innerHTML = ':' + pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    }, 1000);
}

function initGame() {
    gBoard = buildBoard()
    gBoard = setMinesNegsCount(gBoard)
    renderBoard()
    // gBoard = buildBoard()

    // gBoard = setMinesNegsCount(gBoard)
    // renderBoard()
    // renderBoard()
}


function buildBoard() {
    const board = []
    for (var i = 0; i < SIZE; i++) {
        board[i] = []
        for (var j = 0; j < SIZE; j++) {
            const cell = {}
            cell.minesAroundCount = 0
            //  cell.isShown = true
            cell.isShown = false
            cell.isMine = false
            cell.isMarked = false
            board[i][j] = cell
        }
    }
    if (gFirstCell) {
        //  board[i][j].isShown = true
        setMine(board)
        board[gFirstCellX][gFirstcellY].isShown = true
        renderBoard()
    }
    return board
}

function updateLife() {
    gLifeCount += -1
    document.querySelector('h2 span').innerText = gGame.score
}


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function setMine(board) {
    var xPos = []
    var yPos = []
    for (var i = 0; i < SIZE; i++) {
        xPos[i] = i
        yPos[i] = i
    }

    //console.log('xPos before', xPos)
    xPos.splice(gFirstCellX, 1)
    //console.log('xPos After', xPos)
    yPos.splice(gFirstcellY, 1)

    xPos = shuffle(xPos)
    yPos = shuffle(yPos)

    for (var i = 0; i < gLevel.MINES; i++) {
        board[xPos.pop()][yPos.pop()].isMine = true
    }
}


function setMinesNegsCount(board) {

    var mat = []
    for (var k = 0; k < SIZE; k++) {
        mat.push([])
        for (var l = 0; l < SIZE; l++) {
            var neighborsCount = 0;
            for (var i = k - 1; i <= k + 1; i++) {

                if (i < 0 || i >= SIZE) continue;
                for (var j = l - 1; j <= l + 1; j++) {
                    if (i === k && j === l) continue;
                    if (j < 0 || j >= SIZE) continue;
                    if (board[i][j].isMine === true) neighborsCount++

                }
            }
            board[k][l].minesAroundCount = neighborsCount
            // console.log(`board i:  ${k}  j: ${l}[1,1]:`, board[k][l].minesAroundCount)
            //  `<td class="cell ${className}"

            mat[k][l] = neighborsCount

            //console.log('board[1,1]:', neighborsCount)

        }

    }
    //console.table(mat)

    return board

}

function rightClicked(elCell, i, j) {
    if (gBoard[i][j].isShown) return
    console.log('elCell.classList: Before', elCell.classList)
    console.log('i:', i)
    console.log('j:', j)
    if (!gFirstClick) {
        Timer()
        gFirstClick = true
    }
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    console.log(`gBoard i:  ${i}  j: ${j} isMarked:`, gBoard[i][j].isMarked)
    renderBoard()
}


function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isMarked) return
    console.log('elCell.classList: Before', elCell.classList)
    console.log('i:', i)
    console.log('j:', j)
    elCell
    gBoard[i][j].isShown = true
    elCell.classList.remove('floor')
    elCell.classList.add('click')
    console.log('elCell.classList: After', elCell.classList)
    if (!gFirstCell) {
        gFirstCell = true
        gFirstCellX = i
        gFirstcellY = j
        gBoard = buildBoard()
        gBoard = setMinesNegsCount(gBoard)
    }
    if (!gFirstClick) {
        Timer()
        gFirstClick = true
    }
    checkcell(i, j)
    renderBoard()

}
function checkcell(i, j) {
    //  minesAroundCount: 4,
    // isShown: true, 
    // isMine: false, 
    // isMarked: true
    //     console.log('isMine I,J: ', gBoard[i][j].isMine)
    if (gBoard[i][j].isMine === true) {
        updateLife()
    }

}
function updateLife() {
    gLifeCount += -1
    document.querySelector('h2 span').innerText = gLifeCount
}

function renderBoard() {
    console.log('RenderBoard func:')
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        // strHTML += `<tr class="cinema-row" >\n`
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            // console.log(`gBoard i:  ${i}  j: ${j} Mines:`, gBoard[i][j].minesAroundCount)

            const cellTitle = `Cell: ${i}, ${j}`



            var className = ''

            if (cell.isShown) {
                className += ' click'
                if (cell.isMine) {
                    var cellRender = MINE
                } else {
                    if (cell.minesAroundCount > 0) {
                        //  console.log(`board i:  ${i}  j: ${j} MINS COUNT:`, cell.minesAroundCount)
                        //  console.log('minesAroundCount:>0', cell.minesAroundCount)
                        var cellRender = cell.minesAroundCount + ' '
                    } else {
                        var cellRender = EMPTY
                    }

                    // className = 'cell'
                    // className += ' floor'
                    // className += ' cimg'
                }
            } else {
                if (cell.isMarked) {
                    var cellRender = FLAG
                    className += ' floor'
                } else {
                    className += ' floor'
                    var cellRender = EMPTY
                }
            }
            //  var cellType = MINE
            className += ' pos-' + i + '-' + j
            // if (cell.isMarked) {
            //     console.log(`board i:  ${i}  j: ${j} FLAG:`, cell.isMarked)
            //     var cellRender = FLAG
            // }
            //  cellRender = FLAG
            // cellClicked(elCell, i, j)
            strHTML += `<td class="${className}" oncontextmenu="rightClicked(this, ${i}, ${j})"  onclick="cellClicked(this, ${i}, ${j})"     >${cellRender}</td>\n`
            // strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i}, ${j})" >\n`;


            const elSeats = document.querySelector('.board')
            elSeats.innerHTML = strHTML


            //OPtion 2

            // strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i}, ${j})" >\n`;

            // // TODO - change to switch case statement
            // if (currCell.gameElement === GAMER) {
            //     strHTML += GAMER_IMG;
            // } else if (currCell.gameElement === BALL) {
            //     strHTML += BALL_IMG;
            // }

            // strHTML += '\t</td>\n';
            // }
            // strHTML += '</tr>\n';
            // }

            // var elBoard = document.querySelector('.board');
            // elBoard.innerHTML = strHTML;




        }

    }

}



