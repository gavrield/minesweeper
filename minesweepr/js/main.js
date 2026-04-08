'use strict'


const gSymbols = {
    GAME_IS_ON: '🙂',
    GAME_OVER: '😔',
    WINNER: '😎',
    RED_FLAG: '🚩'
}

var gBoard
var gGame

function onInit() {
    gGame = {
        isOn: false,
        hintIsOn: false,
        revealedCount: 0,
        markedCount: 0,
        timeShowingInterval: 0,
        secPassed: 0,
        lives: 3,
        emptyCells: null,
        mineCells: null,
        elShowTimePassing: null,
        elFlagCount: null,
        elGameModeButton: null,
        elLivesCountSpan: null
    }
    gGame.elLivesCountSpan = document.querySelector('h2 span')
    gGame.elLivesCountSpan.innerText = gGame.lives
    const elButtons = document.querySelector('.buttons')
    elButtons.querySelector('.time').innerText = '000'
    elButtons.querySelector('.game-mode').innerHTML = gSymbols.GAME_IS_ON
    gGame.elFlagCount = elButtons.querySelector('.mine-count')
    gGame.elFlagCount.innerText = gLevel.MINES
    gElPickedLevel = elButtons.querySelector(getClassLevelSelector())
    gElPickedLevel.classList.add('level-picked')
    gGame.elGameModeButton = elButtons.querySelector('.game-mode')
    gGame.elGameModeButton.innerText = gSymbols.GAME_IS_ON
    gGame.elShowTimePassing = elButtons.querySelector('.time')
    initHints()
    initBestScore()
    createBoard()
    renderBoard(gBoard, '.board')
}

function startGame(cellLocation) {
    gGame.isOn = true
    setMinesOnBoard(cellLocation)
    setNeighborsCount()
    revealCells(cellLocation)
    
    gGame.timeShowingInterval = setInterval(() => {
        if (!gGame.isOn)
            clearInterval(gGame.timeShowingInterval)
        gGame.elShowTimePassing.innerText = ++gGame.secPassed
    }, 1_000)
}

function onReset() {
    gGame.isOn = false
    clearInterval(gGame.timeShowingInterval)
    onInit()
}

function createBoard() {
    gBoard = []
    gGame.emptyCells = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j] = createCell()
            gGame.emptyCells.push({ i: i, j: j })
        }
    }
}

function createCell() {
    return {
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false
    }
}

function setMinesOnBoard(exceptLoc) {
    var i = 0
    gGame.mineCells = []
    while (i < gLevel.MINES) {
        var idx = getRandomInt(0, gGame.emptyCells.length)
        var loc = gGame.emptyCells.splice(idx, 1)[0]
        if (loc.i === exceptLoc.i && loc.j === exceptLoc.j) {
            gGame.emptyCells.push(loc)
            continue
        }
        gBoard[loc.i][loc.j].isMine = true
        gGame.mineCells.push(loc)
        i++
    }
}

function setNeighborsCount() {
    for (var i = 0; i < gBoard.length; i++)
        for(var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].minesAroundCount = countNeighborMines(i,j)
        }
}


function countNeighborMines(indexY, indexX) {
    if (gBoard[indexY][indexX].isMine) return
    var count = 0
    for (var i = indexY - 1; i <= indexY + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = indexX - 1; j <= indexX + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === indexY && j === indexX) continue
            if (gBoard[i][j].isMine) 
                count++
        }
    } 
    return count
}

function cellClicked(elCell) {
    var cellLoc = { i: +elCell.dataset.i, j: +elCell.dataset.j }
    if (gBoard[cellLoc.i][cellLoc.j].isRevealed) return
    if (!gGame.isOn && gGame.secPassed === 0) {
        startGame(cellLoc)
    } else if (gGame.hintIsOn) {
        revealHint(cellLoc)
        return
    } else if (gGame.isOn){
        if (gBoard[cellLoc.i][cellLoc.j].isMine) {
            gBoard[cellLoc.i][cellLoc.j].isRevealed = true
            onMineClick(cellLoc)
            return
        } else revealCells(cellLoc)
    }
    checkGameWin()
    renderBoard(gBoard)
}

function revealCells(cellLoc) {
    const modelCell = gBoard[cellLoc.i][cellLoc.j]
    if (modelCell.isRevealed || modelCell.isMine) return
    if (modelCell.minesAroundCount === 0) {
        for (var i = cellLoc.i - 1; i <= cellLoc.i + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue
            for (var j = cellLoc.j - 1; j <= cellLoc.j + 1; j++) {
                if (j < 0 || j >= gBoard[0].length) continue
                if (i === cellLoc.i && j === cellLoc.j) {
                    gGame.revealedCount++
                    modelCell.isRevealed = true
                } else revealCells({i: i, j: j})
            }
        }
    } else {
        gBoard[cellLoc.i][cellLoc.j].isRevealed = true
        gGame.revealedCount++
    }
}

function onRightClickCell(elCell, e) {
    e.preventDefault()
    var cellLoc = {i: +elCell.dataset.i, j: +elCell.dataset.j}
    var modelCell = gBoard[cellLoc.i][cellLoc.j]
    if (modelCell.isMarked) {
        modelCell.isMarked = false
        gGame.markedCount--
    } else {
        modelCell.isMarked = true
        gGame.markedCount++
    }
    gGame.elFlagCount.innerText = gLevel.MINES - gGame.markedCount
    checkGameWin()
    renderBoard(gBoard)
}

function onMineClick(cellLoc) {
    if (gGame.lives === 0)
        gameOver(cellLoc)
    else {
        const modelCell = gBoard[cellLoc.i][cellLoc.j]
        gGame.lives--
        gGame.elLivesCountSpan.innerText = gGame.lives
        modelCell.isRevealed = true
        renderBoard(gBoard,cellLoc)
        setTimeout(() => {
            modelCell.isRevealed = false
            renderBoard(gBoard)
        }, 1_500)
    }
}

function gameOver(cellLoc) {
    console.log('GAME OVER')
    gGame.isOn = false
    clearInterval(gGame.timeShowingInterval)
    revealMines()
    gGame.elGameModeButton.innerText = gSymbols.GAME_OVER
    renderBoard(gBoard, cellLoc)
}

function checkGameWin() {
    if (gGame.revealedCount >= gGame.emptyCells.length
        && gGame.markedCount === gGame.mineCells.length) {
            gGame.isOn = false
            clearInterval(gGame.timeShowingInterval)
            gGame.elGameModeButton.innerText = gSymbols.WINNER
            storeBestScore()
            revealAllEmpty()
        }
}


function revealMines() {
    for (var i = 0; i < gGame.mineCells.length; i++) {
        gBoard[gGame.mineCells[i].i][gGame.mineCells[i].j].isRevealed = true
    }
}

function revealAllEmpty() {
    console.log('game won')
    for(var i = 0; i < gGame.emptyCells.length; i++) {
        gBoard[gGame.emptyCells[i].i][gGame.emptyCells[i].j].isRevealed = true
    }
    renderBoard(gBoard)
}
