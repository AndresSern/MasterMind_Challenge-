export function changeCurrentRow2(currentRow, mult){
    let row = currentRow - 1;
    let columns = [4, 3, 2, 1] 
    let currentBoardCells = columns.map(function(n) {
        return "board" + (row * mult - n) 
    })

    let currentPegCells = columns.map(function(n) {
        return "peg" + (row * mult - n)
    })

    return [row, currentBoardCells, currentPegCells]
}

export function genColorCode(possibleColors){
    let columns = [4, 3, 2, 1] 
    let code = columns.map(function () {
        return possibleColors[Math.floor(Math.random()*6)]
    })
    return code
};
