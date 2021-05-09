import {changeCurrentRow2, genColorCode, checkWin, showCode, updatePegs, checkRow} from "./utils/core.js"
// import {...} from "./utils/core.js"

$(document).ready(function(){

    const socket = io();
    let room_code = document.URL.split('/')[3];
    socket.emit('join room', room_code);

    var currentColor = "white";
    var currentPegCells = ["peg40", "peg41", "peg42", "peg43"]
    var currentRow = 11;
    var possibleColors = ["blue", "green", "red", "yellow", "orange", "pink"];
    var hasWon = false;

    var cell1Color, cell2Color, cell3Color, cell4Color;

  //dictionary of colors
  var colors = {
      "rgb(0, 128, 0)": "green",
      "rgb(255, 255, 0)": "yellow",
      "rgb(255, 0, 0)": "red",
      "rgb(0, 0, 255)": "blue",
      "rgb(255, 192, 203)": "pink",
      "rgb(255, 165, 0)": "orange"
  }

    var code = genColorCode(possibleColors);
    console.log(code);

    let divCode = $("#code")

    for(let i = 0; i < 4; i++){
      let cellCode = "<div class=\"boardCell\" id=code"+i+"></div>"
      divCode.append(cellCode);}

    $("#btnSubmitCode").click(function () {
        let code0 = $("#code0");
        let code1 = $("#code1");
        let code2 = $("#code2");
        let code3 = $("#code3");

        let c0 = colors[code0.css("background-color")];
        let c1 = colors[code1.css("background-color")];
        let c2 = colors[code2.css("background-color")];
        let c3 = colors[code3.css("background-color")];

        if (undefined === c0 || undefined === c1 || undefined === c2 || undefined === c3) {
            alert("The code is not complete.");
            } else {
                socket.emit('player code', {row: [c0, c1, c2, c3]}, room_code);
                $(".masterMind").css("display", "none") 
            }
            })

  /* const socket = io.connect('5000'); */
//   const socket = io();
//   let room_code = document.URL.split('/')[3];
//   socket.emit('join room', room_code);
  // let comb_code= document.getElementById('comb_code');
  // let room_code = document.getElementById('room_code');
  // let btn = document.getElementById('send');

  // btn.addEventListener('click', function() {
  //     socket.emit('player', {
  //         room: room_code.value,
  //         comb_code: comb_code.value
  //     })
  // });

  // socket.on('server_msg', function (data) {
  //     console.log(data);
  // });

var currentBoardCells = ["board40", "board41", "board42", "board43"];

let btn = document.getElementById('btnSubmit');
btn.addEventListener('click', function() {
    let cell1 = $("#"+currentBoardCells[0]);
    let cell2 = $("#"+currentBoardCells[1]);
    let cell3 = $("#"+currentBoardCells[2]);
    let cell4 = $("#"+currentBoardCells[3]);

    let c1 = colors[cell1.css("background-color")];
    let c2 = colors[cell2.css("background-color")];
    let c3 = colors[cell3.css("background-color")];
    let c4 = colors[cell4.css("background-color")];

    socket.emit('player comb', {row: [c1, c2, c3, c4]}, room_code);
});

socket.on('test', (comb) => {
    console.log(comb);
})

socket.on('test1', (masterCode) => {
    code = masterCode.row
    console.log("new", masterCode.row);
})

socket.on('server_msg', function (data) {
  console.log(data);
});	

  //create the cells and add them to the board
  for(let i = 0; i < 44; i++){
      let cell = "<div class=\"boardCell\" id=board"+i+"></div>"
      $(".board").append(cell);
  }

  //create cells for the pegs
  for(let i = 0; i < 44; i++){
      let cell = "<div class=\"pegCell\" id=peg"+i+"></div>"
      $(".pegs").append(cell);
  }

  //change the style of the board so you can view the rows
  $(".board").css("grid-template-rows", "repeat(11,73.18px)");
  $(".board").css("grid-template-columns", "repeat(4,73.18px)");
  $(".boardCell").css("border", "1px solid black");
  $(".boardCell").css("border-radius", "50%");
  $(".boardCell").css("background-color", "white");

  //change the style of the pegs
  $(".pegs").css("grid-template-rows", "repeat(22,36.59px)");
  $(".pegs").css("grid-template-columns", "repeat(2,36.59px");
  $(".pegCell").css("border", "1px solid black");
  $(".pegCell").css("border-radius", "50%")
  $(".pegCell").css("background-color", "gray")

  //add colors to the color board
  $(".color").each(function(){
      //set the color of the cell to its ID
      let color = $(this).attr("id");
      $(this).css("background-color", color);
  });

  //change the current color when the user clicks on the color board
  $(".color").click(function(){
      let color = $(this).attr("id");
      currentColor = color;
      $(".currentColor").css("background-color", color);
  });

  //change the color of a board cell on click
  $(".boardCell").click(function(){
      var id = $(this).attr("id");

      if(isValid(id) || id.substring(0, 4) === "code"){
          $(this).css("background-color", currentColor);
      } 
  });

  //do actions when the submit button is clicked
  $("#btnSubmit").click(function(){

    let validRow = checkRow(currentBoardCells, colors, cell1Color, cell2Color, cell3Color, cell4Color);

    if (validRow) {
        [cell1Color, cell2Color, cell3Color, cell4Color] = updatePegs(currentBoardCells, colors, currentPegCells, code, cell1Color, cell2Color, cell3Color, cell4Color)
        hasWon = checkWin(hasWon, code, cell1Color, cell2Color, cell3Color, cell4Color);
        showCode(hasWon, code);
        [currentRow, currentBoardCells, currentPegCells] = changeCurrentRow2(currentRow, 4);
    } else {
        alert("The code is not complete.");
    }
  });

  //check whether the cell clicked on is valid
  function isValid(id){
      if(currentBoardCells.includes(id) && hasWon === false){
          return true;
      }
      return false;
  }

});
