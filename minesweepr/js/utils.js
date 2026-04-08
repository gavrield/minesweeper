'use strict'

function renderBoard(modelBoard, loc=null) {
    const selector='.board'
    var strHtml = `<tbody>`
    for (var i = 0; i < modelBoard.length; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < modelBoard[0].length; j++) {
            var cell = modelBoard[i][j]
            if (!cell.isRevealed) {
                strHtml += `<td class="cell" onclick="cellClicked(this)" oncontextmenu="onRightClickCell(this,event)" data-i=${i} data-j=${j}>`
                if (cell.isMarked) {
                    strHtml += gSymbols.RED_FLAG
                }
            } else {
                strHtml += `<td class="cell revealed"`
                if (!cell.isMine) {
                    switch(+cell.minesAroundCount) {
                        case 0:
                            strHtml += `>`
                            break
                        case 1:
                            strHtml += ' style="color: blue;">1'
                            break
                        case 2:
                            strHtml += ' style="color: green;">2'
                            break
                        case 3:
                            strHtml += ` style="color: red;">3`
                            break
                        case 4:
                            strHtml += ` style="color: purple;">4`
                            break
                        case 5:
                            strHtml += ` style="color: brown;">5`
                            break
                        case 6:
                            strHtml += ` style="color: turquoise;">6`
                            break
                        case 7:
                            strHtml += ` style="color: black;">7`
                            break
                        case 8:
                            strHtml += ` style="color: grey;">8`
                            break
                    }
                } else if (loc && loc.i === i && loc.j === j)
                    strHtml += ` style="background-color: red;">${getMine()}`
                else
                    strHtml += `>${getMine()}`
            }
            strHtml += `</td>`
        }
        strHtml += `</tr>`
    }
    strHtml += '</tbody>'
    const elTable =  document.querySelector(selector)
    elTable.innerHTML = strHtml
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getMine() {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="15" height="15" viewBox="0 0 100 100" enable-background="new 0 0 97.6 100" xml:space="preserve"><path d="M94.001,58.432l-3.209-1.687c0.349-2.197,0.533-4.45,0.533-6.745c0-2.981-0.308-5.89-0.89-8.697l3.124-1.832  c4.895-2.87,4.261-5.035-1.408-4.809l-3.618,0.145c-1.868-4.893-4.611-9.352-8.039-13.187l1.795-3.158  c2.803-4.933,1.172-6.489-3.625-3.458l-3.068,1.939c-3.982-3.242-8.562-5.776-13.548-7.417l-0.025-3.62  c-0.037-5.674-2.229-6.207-4.867-1.184l-1.687,3.209c-2.197-0.35-4.45-0.534-6.745-0.534c-2.982,0-5.891,0.308-8.698,0.89  l-1.833-3.124c-2.87-4.895-5.033-4.261-4.808,1.409l0.145,3.618c-4.893,1.868-9.352,4.611-13.187,8.04l-3.158-1.795  c-4.933-2.804-6.489-1.173-3.458,3.624l1.939,3.069c-3.242,3.984-5.777,8.563-7.417,13.549l-3.621,0.024  c-5.673,0.037-6.206,2.229-1.183,4.867l3.209,1.687c-0.35,2.197-0.534,4.45-0.534,6.746c0,2.98,0.308,5.89,0.89,8.696l-3.124,1.832  c-4.895,2.87-4.262,5.035,1.408,4.809l3.618-0.145c1.868,4.893,4.611,9.352,8.039,13.187l-1.794,3.158  c-2.804,4.933-1.174,6.49,3.624,3.458l3.07-1.938c3.982,3.241,8.562,5.776,13.547,7.417l0.024,3.62  c0.038,5.674,2.229,6.207,4.868,1.184l1.687-3.209c2.197,0.349,4.45,0.533,6.747,0.533c2.98,0,5.889-0.308,8.698-0.89l1.83,3.124  c2.87,4.895,5.033,4.261,4.809-1.408l-0.145-3.618c4.893-1.868,9.352-4.611,13.187-8.039l3.158,1.795  c4.931,2.803,6.488,1.172,3.458-3.625l-1.938-3.068c3.241-3.982,5.776-8.562,7.417-13.549l3.62-0.023  C98.491,63.262,99.023,61.069,94.001,58.432z"/></svg>`
}
