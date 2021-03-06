export function changeCurrentRow2 (currentRow, mult) {
  const row = currentRow - 1;
  const columns = [4, 3, 2, 1];
  const currentBoardCells = columns.map(function (n) {
    return 'board' + (row * mult - n);
  });

  const currentPegCells = columns.map(function (n) {
    return 'peg' + (row * mult - n);
  });

  return [row, currentBoardCells, currentPegCells];
}

export function genColorCode (possibleColors) {
  const columns = [4, 3, 2, 1];
  const code = columns.map(function () {
    return possibleColors[Math.floor(Math.random() * 6)];
  });
  return code;
}

export function checkWin (hasWon, code, cell1Color, cell2Color, cell3Color, cell4Color) {
  if (code[0] === cell1Color &&
        code[1] === cell2Color &&
        code[2] === cell3Color &&
        code[3] === cell4Color) {
    hasWon = true;
    /* alert('Congratulations, you have won!\nThe code will now be displayed.'); */
  }
  return hasWon;
}

export function showCode (hasWon, code) {
  if (hasWon) {
    $('#secretColor1').css('background-color', code[0]);
    $('#secretColor2').css('background-color', code[1]);
    $('#secretColor3').css('background-color', code[2]);
    $('#secretColor4').css('background-color', code[3]);
  }
}

export function checkRow (currentBoardCells, colors, cell1Color, cell2Color, cell3Color, cell4Color) {
  const [c1, c2, c3, c4] = getCells(currentBoardCells);

  cell1Color = colors[c1.css('background-color')];
  cell2Color = colors[c2.css('background-color')];
  cell3Color = colors[c3.css('background-color')];
  cell4Color = colors[c4.css('background-color')];

  if (undefined === cell1Color ||
        undefined === cell2Color ||
        undefined === cell3Color ||
        undefined === cell4Color) {
    return false;
  } else {
    return true;
  }
}

export function getCells (currentBoardCells) {
  const columns = [0, 1, 2, 3];
  const cells = currentBoardCells.map(function (cellId) {
    return $('#' + cellId);
  });
  return cells;
}

export function updatePegs (currentBoardCells, colors, currentPegCells, code, cell1Color, cell2Color, cell3Color, cell4Color) {
  const [c1, c2, c3, c4] = getCells(currentBoardCells);

  cell1Color = colors[c1.css('background-color')];
  cell2Color = colors[c2.css('background-color')];
  cell3Color = colors[c3.css('background-color')];
  cell4Color = colors[c4.css('background-color')];

  const peg1 = $('#' + currentPegCells[0]);
  const peg2 = $('#' + currentPegCells[1]);
  const peg3 = $('#' + currentPegCells[2]);
  const peg4 = $('#' + currentPegCells[3]);

  const pegs = [peg1, peg2, peg3, peg4];

  // array of pegs that have been filled
  const filledPegs = [];
  // array of cells that have already been accounted for
  const chosenCells = [];
  // create copy of the code array
  const codeCopy = [...code];

  // if the colors are in the correct positions,
  //  change the pegs to red
  if (code[0] === cell1Color) {
    // choose a random peg that has not yet been filled
    const num = randomNum14(filledPegs);
    filledPegs.push(num);

    // remove the color from codeCopy because it has
    //  already been accounted for
    const index = codeCopy.indexOf(cell1Color);
    if (index > -1) {
      codeCopy.splice(index, 1);
    }

    // add number to choseCells to state that this cell
    //  has now been accounted for
    chosenCells.push(1);

    // fill the according peg
    pegs[num - 1].css('background-color', 'red');
  }
  if (code[1] === cell2Color) {
    const num = randomNum14(filledPegs);
    filledPegs.push(num);

    // remove the color from codeCopy because it has
    //  already been accounted for
    const index = codeCopy.indexOf(cell2Color);
    if (index > -1) {
      codeCopy.splice(index, 1);
    }

    chosenCells.push(2);

    pegs[num - 1].css('background-color', 'red');
  }
  if (code[2] === cell3Color) {
    const num = randomNum14(filledPegs);
    filledPegs.push(num);

    // remove the color from codeCopy because it has
    //  already been accounted for
    const index = codeCopy.indexOf(cell3Color);
    if (index > -1) {
      codeCopy.splice(index, 1);
    }

    chosenCells.push(3);

    pegs[num - 1].css('background-color', 'red');
  }
  if (code[3] === cell4Color) {
    const num = randomNum14(filledPegs);
    filledPegs.push(num);

    // remove the color from codeCopy because it has
    //  already been accounted for
    const index = codeCopy.indexOf(cell4Color);
    if (index > -1) {
      codeCopy.splice(index, 1);
    }

    chosenCells.push(4);

    pegs[num - 1].css('background-color', 'red');
  }

  // if the code copy includes the colors of the four cells
  //  then change the pegs to white because the code copy
  //  now only includes colors that have not been accounted
  //  for

  if (codeCopy.includes(cell1Color) && !chosenCells.includes(1)) {
    // choose a random peg that has not yet been filled
    const num = randomNum14(filledPegs);
    filledPegs.push(num);

    // fill the according peg
    pegs[num - 1].css('background-color', 'white');
  }
  if (codeCopy.includes(cell2Color) && !chosenCells.includes(2)) {
    // choose a random peg that has not yet been filled
    const num = randomNum14(filledPegs);
    filledPegs.push(num);

    // fill the according peg
    pegs[num - 1].css('background-color', 'white');
  }
  if (codeCopy.includes(cell3Color) && !chosenCells.includes(3)) {
    // choose a random peg that has not yet been filled
    const num = randomNum14(filledPegs);
    filledPegs.push(num);

    // fill the according peg
    pegs[num - 1].css('background-color', 'white');
  }
  if (codeCopy.includes(cell4Color) && !chosenCells.includes(4)) {
    // choose a random peg that has not yet been filled
    const num = randomNum14(filledPegs);
    filledPegs.push(num);

    // fill the according peg
    pegs[num - 1].css('background-color', 'white');
  }
  return [cell1Color, cell2Color, cell3Color, cell4Color];
}

export function randomNum14 (nums) {
  // generate a number from 1-4
  let num = Math.floor(Math.random() * 4) + 1;
  // while that number has already been chosen
  //  choose another one
  while (nums.includes(num)) {
    num = Math.floor(Math.random() * 4) + 1;
  }
  return num;
}
