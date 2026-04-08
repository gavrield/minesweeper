'use strict'

const EASY_LEVEL = {
    level: 'easy',
    SIZE: 4, MINES: 2
}
const MEDIUM_LEVEL = {
    level: 'medium',
    SIZE: 8, MINES: 14
}

const HARD_LEVEL = { 
    level: 'hard',
    SIZE: 12, MINES: 32
}


var gLevel = EASY_LEVEL
var gElPickedLevel

function onLevelPick(elLevel) {
    const level = elLevel.innerText
    switch (level) {
        case 'Easy':
            if (gLevel === EASY_LEVEL) return
            gLevel = EASY_LEVEL
            break
        case 'Medium':
            if (gLevel === MEDIUM_LEVEL) return
            gLevel = MEDIUM_LEVEL
            break
        case 'Hard':
            if (gLevel === HARD_LEVEL) return
            gLevel = HARD_LEVEL
            break
    }

    gElPickedLevel.classList.remove('level-picked')
    elLevel.classList.add('level-picked')
    gElPickedLevel = elLevel
}

function getClassLevelSelector() {
    if (gLevel === EASY_LEVEL) return '.easy'
    if (gLevel === MEDIUM_LEVEL) return '.medium'
    if (gLevel === HARD_LEVEL) return '.hard'
}
