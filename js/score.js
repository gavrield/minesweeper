'use strict'

function initBestScore() {
    const currerntLevel = gLevel.level
    const elBestScore = document.querySelector('.best-score')
    const elLevelSpan = elBestScore.querySelector('.level-span')
    const elScoreSpan = elBestScore.querySelector('.score-span')

    var bestScore = localStorage.getItem('best ' + currerntLevel)
    if (bestScore) {
        elBestScore.hidden = false
        elLevelSpan.innerText = currerntLevel.toUpperCase()
        elScoreSpan.innerText = bestScore
    } else elBestScore.hidden = true
}

function storeBestScore() {
    const currerntLevel = gLevel.level
    var bestTime = +localStorage.getItem('best ' + currerntLevel)
    if (bestTime && bestTime < gGame.secPassed)
        localStorage.setItem('best ' + currerntLevel, bestTime)
    else localStorage.setItem('best ' + currerntLevel, gGame.secPassed)
}

