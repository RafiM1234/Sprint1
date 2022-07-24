'use strict'

const MINE = '💣'
const EMPTY = ' '
const FLAG = '🚩'

var BOMB_IMG = '<img src="img/gamer.png" />'
var gLevel = { SIZE: SIZE, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gElSelectedSeat = null
var gBoard
var gFirstCell = false
var gFirstCellX
var gFirstCellY
var gLifeCount = 3
var gFirstClick = false
var SIZE = 4
var exeptedValue
var timer = 0.00
var timeResolution = 1
var gameInterval

function renderTimer() {
    if (gFirstClick) {
        timer += timeResolution
    }
    // timer += timeResolution
    //   console.log('Timer', timer)
    var elTimer = document.querySelector('.timer')
    elTimer.innerHTML = `Game Time: ${parseFloat(timer).toFixed(2)}sec`

}
function checkVictory() {
    var victurySize = SIZE * SIZE
    if (victurySize === gGame.markedCount + gGame.shownCount) {
        gGame.markedCount = 0
        gGame.shownCount = 0
        gGame.isOn = false
        var elPopup = document.querySelector('.popup1')
        elPopup.classList.remove('hide')
        elPopup = document.querySelector('.smile')
        elPopup.innerText = '😎'
    }

}

// function timer() {
//     var sec = 0
//     function pad(val) { return val > 9 ? val : "0" + val; }
//     setInterval(function () {
//         document.getElementById("seconds").innerHTML = ':' + pad(++sec % 60);
//         document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
//     }, 1000);
// }

function gameOver() {
    console.log('GameOver:!!!')
    var elPopup = document.querySelector('.popup2')
    elPopup.classList.remove('hide')
    elPopup = document.querySelector('.smile')
    elPopup.innerText = '🤯'
    gGame.markedCount = 0
    gGame.shownCount = 0
    console.log('elPopup.classList:', elPopup.classList)
    gGame.isOn = false
    gLifeCount = 3
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            gBoard[i][j].isShown = true
        }
    }
    renderBoard()
}

function initGame(gameSize) {
    exeptedValue = 1
    gFirstClick = false
    timer = 0.00

    var elPopup = document.querySelector('.popup1')
    elPopup.classList.add('hide')
    elPopup = document.querySelector('.popup2')
    elPopup.classList.add('hide')
    elPopup = document.querySelector('.smile')
    elPopup.innerText = '😃'
    gFirstCell = false
    gGame.markedCount = 0
    gGame.shownCount = 0
    gLifeCount = 3
    elPopup = document.querySelector('.smile')

    document.querySelector('h2 span').innerText = gLifeCount
    gLevel.SIZE = gameSize
    SIZE = gameSize
    console.log('gameSize:', gameSize)
    if (gameSize === 4) {
        gLevel.MINES = 2
    }
    if (gameSize === 8) {
        gLevel.MINES = 12
    }
    if (gameSize === 12) {
        gLevel.MINES = 30
    }
    gBoard = buildBoard()
    gBoard = setMinesNegsCount(gBoard)
    renderBoard()

}


function buildBoard() {
    console.log('buildBoard() gLevel.SIZE:', gLevel.SIZE)
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = {}
            cell.minesAroundCount = 0
            //cell.isShown = true
            cell.isShown = false
            cell.isMine = false
            cell.isMarked = false
            board[i][j] = cell
        }
    }
    if (gFirstCell) {
        setMine(board)
        board[gFirstCellX][gFirstCellY].isShown = true
        renderBoard()

    }
    return board
}



function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function setMine(board) {
    var xPos = []
    var yPos = []
    var mineCount = 0
    gGame.isOn = true
    console.log(' gLevel.MINES:', gLevel.MINES)
    console.log(' gLevel.SIZE:', gLevel.SIZE)
    var aMine = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        aMine.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            aMine[i][j] = 1
        }
    }
    aMine[gFirstCellX][gFirstCellY] = 0
    console.log('gFirstCellX:', gFirstCellX)
    console.log('gFirstCellY:', gFirstCellY)
    console.table(aMine)

    while (mineCount < gLevel.MINES) {
        xPos = getRandomInt(0, gLevel.SIZE)
        yPos = getRandomInt(0, gLevel.SIZE)
        if (aMine[xPos][yPos] = 1) {
            mineCount++
            board[xPos][yPos].isMine = true
            aMine[xPos][yPos] = 0
        }
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
            mat[k][l] = neighborsCount


        }

    }
    return board
}

function rightClicked(elCell, i, j) {
    if (gBoard[i][j].isShown) return
    if (!gFirstClick) {
        // timer()
        gameInterval = setInterval(renderTimer, 200)
        gFirstClick = true
        checkVictory()
    }
    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true
        gGame.markedCount++
        checkVictory()
    } else {
        gBoard[i][j].isMarked = false
        gGame.markedCount--

    }
    renderBoard()
}


function leftClicked(elCell, i, j) {
    if (gBoard[i][j].isMarked) return
    elCell
    elCell.classList.remove('floor')
    elCell.classList.add('click')
    if (!gFirstCell) {
        gFirstCell = true
        gFirstCellX = i
        gFirstCellY = j
        gBoard = buildBoard()
        gBoard = setMinesNegsCount(gBoard)
        gGame.shownCount++
        console.log(' gGame.shownCount', gGame.shownCount)
    } else {
        if (gBoard[i][j].isShown === false) {
            gBoard[i][j].isShown = true
            gGame.shownCount++
            console.log(' gGame.shownCount', gGame.shownCount)
            checkcell(i, j)
            checkVictory()

        }
    }
    if (!gFirstClick) {
        gameInterval = setInterval(renderTimer, 200)
        // timer()
        gFirstClick = true
    }
    renderBoard()
}

function checkcell(i, j) {
    if (gBoard[i][j].isMine === true) {
        updateLife()
        if (gLifeCount === 0) {
            gameOver()
        }
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

                        var cellRender = cell.minesAroundCount + ' '
                    } else {
                        var cellRender = EMPTY
                    }
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
            strHTML += `<td class="${className}" oncontextmenu="rightClicked(this, ${i}, ${j})"  onclick="leftClicked(this, ${i}, ${j})">${cellRender}</td>\n`
            const elBoard = document.querySelector('.board')
            elBoard.innerHTML = strHTML

        }

    }

    //Remove Default Right Click menu

}



//Remove Default Right Click menu
window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})




