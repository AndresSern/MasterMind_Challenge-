export function changeCurrentRow2(currentRow, mult){
    let row = currentRow - 1;
    let columns = [4, 3, 2, 1] 
    let currentBoardCells = columns.map(function(n) {
        return "board" + (row * mult - n) 
    })

    let currentPegCells = columns.map(function(n) {
        return "peg" + (row * mult - n)
    })
    let r = [row, currentBoardCells, currentPegCells]
    // console.log(r)
    return r
    // return {currentBoardCell, currentPegcells}
    // currentBoardCells = [
    //     "board" + (row * mult - 4), 
    //     "board" + (currentRow*mult-3), 
    //     "board" + (currentRow*mult-2), 
    //     "board" + (currentRow*mult-1)];
    // currentPegCells = [
    //     "peg" + (currentRow*mult-4), 
    //     "peg" + (currentRow*mult-3), 
    //     "peg" + (currentRow*mult-2), 
    //     "peg" + (currentRow*mult-1)];
}