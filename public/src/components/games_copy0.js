import { changeCurrentRow2, genColorCode, checkWin, showCode, updatePegs, checkRow } from './utils/core.js';
import { gameOver } from './gameOver.js';

$(document).ready(function () {
  const socket = io();
  const room_code = document.URL.split('/')[3];
  socket.emit('join room', room_code);

  let currentColor = 'white';
  let currentPegCells = ['peg40', 'peg41', 'peg42', 'peg43'];
  let currentRow = 11;
  const possibleColors = ['blue', 'green', 'red', 'yellow', 'orange', 'pink'];
  let hasWon = false;

  let cell1Color, cell2Color, cell3Color, cell4Color;

  const colors = {
    'rgb(0, 128, 0)': 'green',
    'rgb(255, 255, 0)': 'yellow',
    'rgb(255, 0, 0)': 'red',
    'rgb(0, 0, 255)': 'blue',
    'rgb(255, 192, 203)': 'pink',
    'rgb(255, 165, 0)': 'orange'
  };

  let code = genColorCode(possibleColors);
  console.log(code);

  const divCode = $('#code');

  for (let i = 0; i < 4; i++) {
    const cellCode = '<div class="boardCell" id=code' + i + '></div>';
    divCode.append(cellCode);
  }

  if (room_code === 'games2.html') {
    $('.masterMind').css('display', 'none');
  }

  $('#btnSubmitCode').click(function () {
    const code0 = $('#code0');
    const code1 = $('#code1');
    const code2 = $('#code2');
    const code3 = $('#code3');

    const c0 = colors[code0.css('background-color')];
    const c1 = colors[code1.css('background-color')];
    const c2 = colors[code2.css('background-color')];
    const c3 = colors[code3.css('background-color')];

    if (undefined === c0 || undefined === c1 || undefined === c2 || undefined === c3) {
      alert('The code is not complete.');
    } else {
      socket.emit('player code', { row: [c0, c1, c2, c3] }, room_code);
      $('.masterMind').css('display', 'none');
    }
  });

  let currentBoardCells = ['board40', 'board41', 'board42', 'board43'];

  const btn = document.getElementById('btnSubmit');
  btn.addEventListener('click', function () {
    const cell1 = $('#' + currentBoardCells[0]);
    const cell2 = $('#' + currentBoardCells[1]);
    const cell3 = $('#' + currentBoardCells[2]);
    const cell4 = $('#' + currentBoardCells[3]);

    const c1 = colors[cell1.css('background-color')];
    const c2 = colors[cell2.css('background-color')];
    const c3 = colors[cell3.css('background-color')];
    const c4 = colors[cell4.css('background-color')];

    socket.emit('player comb', { row: [c1, c2, c3, c4] }, room_code);
  });

  socket.on('test', (comb) => {
    console.log(comb);
  });

  socket.on('test1', (masterCode) => {
    code = masterCode.row;
    console.log('new', masterCode.row);
  });

  socket.on('server_msg', function (data) {
    console.log(data);
  });

  socket.on('youLoose', (msg) => {
    gameOver(true, msg);
  });

  /* create the cells and add them to the board */
  for (let i = 0; i < 44; i++) {
    const cell = '<div class="boardCell" id=board' + i + '></div>';
    $('.board').append(cell);
  }

  /* create cells for the pegs */
  for (let i = 0; i < 44; i++) {
    const cell = '<div class="pegCell" id=peg' + i + '></div>';
    $('.pegs').append(cell);
  }

  /* change the style of the board so you can view the rows */
  $('.board').css('grid-template-rows', 'repeat(11,73.18px)');
  $('.board').css('grid-template-columns', 'repeat(4,73.18px)');
  $('.boardCell').css('border', '1px solid black');
  $('.boardCell').css('border-radius', '50%');
  $('.boardCell').css('background-color', 'white');

  /* change the style of the pegs */
  $('.pegs').css('grid-template-rows', 'repeat(22,36.59px)');
  $('.pegs').css('grid-template-columns', 'repeat(2,36.59px');
  $('.pegCell').css('border', '1px solid black');
  $('.pegCell').css('border-radius', '50%');
  $('.pegCell').css('background-color', 'gray');

  /* add colors to the color board */
  $('.color').each(function () {
    /* set the color of the cell to its ID */
    const color = $(this).attr('id');
    $(this).css('background-color', color);
  });

  /* change the current color when the user clicks on the color board */
  $('.color').click(function () {
    const color = $(this).attr('id');
    currentColor = color;
    $('.currentColor').css('background-color', color);
  });

  /* change the color of a board cell on click */
  $('.boardCell').click(function () {
    const id = $(this).attr('id');

    if (isValid(id) || id.substring(0, 4) === 'code') {
      $(this).css('background-color', currentColor);
    }
  });

  /* do actions when the submit button is clicked */
  $('#btnSubmit').click(function () {
    const validRow = checkRow(currentBoardCells, colors, cell1Color, cell2Color, cell3Color, cell4Color);

    if (validRow) {
      [cell1Color, cell2Color, cell3Color, cell4Color] = updatePegs(currentBoardCells, colors, currentPegCells, code, cell1Color, cell2Color, cell3Color, cell4Color);
      hasWon = checkWin(hasWon, code, cell1Color, cell2Color, cell3Color, cell4Color);
      showCode(hasWon, code);
      gameOver(hasWon, "¡Congratulations, You are the winner!");
      /* createHasWon(hasWon, "Ganaste");
      const msg = "Ganaste";
       if(hasWon) {
        const winnerMsg = '<h3>' + msg + '</h3>' + '<br>';
        const plaAgain = '<div class="submit"><a href="' + document.URL + '">Play Again</a></div>';
        const backToHome = '<div class="submit"><a href="/">Back To Home</a></div>'
        $('#hasWon').append(winnerMsg);
        $('#hasWon').append(plaAgain);
        $('#hasWon').append(backToHome);
        $('#hasWon').css('display', 'block');
      } */
      if (hasWon) {
        socket.emit('gameOver', "Sorry, You have lost", room_code);
      }

      [currentRow, currentBoardCells, currentPegCells] = changeCurrentRow2(currentRow, 4);
    } else {
      alert('The code is not complete.');
    }
  });

  /* if (hasWon) {
    socket.emit('gameOver', "Sorry, You have lost", room_code);
  }
  socket.on('youLoose', (msg) => {
    gameOver(haswon, msg);
  }); */

  // check whether the cell clicked on is valid
  function isValid (id) {
    if (currentBoardCells.includes(id) && hasWon === false) {
      return true;
    }
    return false;
  }
});
