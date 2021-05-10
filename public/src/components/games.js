import {
	changeCurrentRow2,
	genColorCode,
	checkWin,
	showCode,
	updatePegs,
	checkRow,
} from "./utils/core.js";

import { gameOver } from "./gameOver.js";

$(document).ready(function () {
	const socket = io();
	const room_code = document.URL.split("/")[3];

	if (room_code === "games.html") {
		$(".masterMind").css("display", "none");
	} else {
		$(".masterMind").css("display", "block");
		$(".masterMind").css("z-index", "30");
		$(".masterMind").css("position", "absolute");
		$(".masterMind").css("top", "30%");
		$(".masterMind").css("left", "45%");
		$(".content").css("display", "none");
		$("#actualRoom").css("display", "block");
		$("#actualRoom").append(room_code);
	}
	socket.emit("join room", room_code);

	let currentColor = "white";
	let currentPegCells = ["peg40", "peg41", "peg42", "peg43"];
	let currentRow = 11;
	const possibleColors = ["blue", "green", "red", "yellow", "orange", "pink"];
	let hasWon = false;

	let cell1Color, cell2Color, cell3Color, cell4Color;

	const colors = {
		"rgb(0, 128, 0)": "green",
		"rgb(255, 255, 0)": "yellow",
		"rgb(255, 0, 0)": "red",
		"rgb(0, 0, 255)": "blue",
		"rgb(255, 192, 203)": "pink",
		"rgb(255, 165, 0)": "orange",
	};

	let code = genColorCode(possibleColors);
	/* console.log(code); */

	const divCode = $("#code");

	for (let i = 0; i < 4; i++) {
		const cellCode =
			'<div class="boardCell checkPlayerCode" id=code' + i + "></div>";
		divCode.append(cellCode);
	}

	$("#btnSubmitCode").click(function () {
		$(".colorBoard").css("visibility", "hidden");
		const code0 = $("#code0");
		const code1 = $("#code1");
		const code2 = $("#code2");
		const code3 = $("#code3");

		const c0 = colors[code0.css("background-color")];
		const c1 = colors[code1.css("background-color")];
		const c2 = colors[code2.css("background-color")];
		const c3 = colors[code3.css("background-color")];

		if (
			undefined === c0 ||
			undefined === c1 ||
			undefined === c2 ||
			undefined === c3
		) {
			alert("The code is not complete.");
		} else {
			socket.emit("player code", { row: [c0, c1, c2, c3] }, room_code);
			$(".masterMind").css("display", "none");
			$(".content").css("display", "block");
		}
	});

	let currentBoardCells = ["board40", "board41", "board42", "board43"];

	const btn = document.getElementById("btnSubmit");
	btn.addEventListener("click", function () {
		const cell1 = $("#" + currentBoardCells[0]);
		const cell2 = $("#" + currentBoardCells[1]);
		const cell3 = $("#" + currentBoardCells[2]);
		const cell4 = $("#" + currentBoardCells[3]);

		const c1 = colors[cell1.css("background-color")];
		const c2 = colors[cell2.css("background-color")];
		const c3 = colors[cell3.css("background-color")];
		const c4 = colors[cell4.css("background-color")];

		socket.emit("player comb", { row: [c1, c2, c3, c4] }, room_code);
	});

	socket.on("test", (comb) => {
		console.log(comb);
	});

	socket.on("test1", (masterCode) => {
		code = masterCode.row;
		console.log("new", masterCode.row);
	});

	socket.on("server_msg", function (data) {
		console.log(data);
	});

	socket.on("youLoose", (msg) => {
		gameOver(true, msg);
	});

	for (let i = 0; i < 4; i++) {
		let random = Math.floor(Math.random() * (80 - 20) + 20);
		let cell = '<div class="secret" id=secretColor' + i + "></div>";
		$(".combination").append(cell);
		$("#secretColor" + i).css(
			"border-radius",
			`${random}% ${random}% 38% ${random}% / 48% 60% 45% 42%`
		);
	}
	/* create the cells and add them to the board */
	for (let i = 0; i < 44; i++) {
		let random = Math.floor(Math.random() * (80 - 20) + 20);
		let cell = '<div class="boardCell" id=board' + i + "></div>";
		$(".board").append(cell);
		$("#board" + i).css(
			"border-radius",
			`${random}% ${random}% 38% ${random}% / 48% 60% 45% 42%`
		);
	}

	/* create cells for the pegs */
	for (let i = 0; i < 44; i++) {
		let cell = '<div class="pegCell" id=peg' + i + "></div>";
		$(".pegs").append(cell);
		$("#peg" + i).css("border-radius", $("#board" + i).css("border-radius"));
	}

	/* change the style of the board so you can view the rows */
	$(".board").css("grid-template-rows", "repeat(11,9.3%)");
	$(".board").css("grid-template-columns", "repeat(4,22%)");
	$(".boardCell").css("width", "35%");
	$(".boardCell").css("height", "35%");
	$(".boardCell").css("margin-left", "70%");
	$(".boardCell").css("margin-top", "7%");
	$(".boardCell").css("border", "3px solid #2d2d2d");
	$(".boardCell").css("background-color", "white");
	$(".checkPlayerCode").css("margin-left", "20%");
	$(".checkPlayerCode").css("margin-top", "20%");
	$(".checkPlayerCode").css("border-radius", $("#board0").css("border-radius"));

	/* change the style of the pegs */
	$(".pegs").css("grid-template-rows", "repeat(11, 9.3%)");
	$(".pegs").css("grid-template-columns", "repeat(4, 20%");
	$(".pegCell").css("background-color", "gray");
	$(".pegCell").css("width", "40%");
	$(".pegCell").css("height", "45%");
	$(".pegCell").css("margin-left", "50%");
	$(".pegCell").css("margin-top", "10%");
	$(".pegCell").css("border", "2px solid #2d2d2d");

	/* change the style of the pegs */
	$(".combination").css("grid-template-rows", "repeat(1, 50%)");
	$(".combination").css("grid-template-columns", "repeat(4, 20%");
	$(".secret").css("background-color", "gray");
	$(".secret").css("width", "23%");
	$(".secret").css("height", "83%");
	$(".secret").css("border", "2px solid #2d2d2d");
	$(".secret").css("margin-top", "12%");
	$(".secret").css("margin-left", "90%");

	/* add colors to the color board */
	$(".color").each(function () {
		/* set the color of the cell to its ID */
		const color = $(this).attr("id");
		$(this).css("background-color", color);
	});

	$(".color").click(function () {
		let color = $(this).attr("id");
		currentColor = color;
	});

	/* change the color of a board cell on click */
	$(".boardCell").click(function (e) {
		$(".colorBoard").css("visibility", "visible");
		var id = $(this).attr("id");
		if (isValid(id) || id.substring(0, 4) === "code") {
			$(".colorBoard").css({
				left: e.pageX - 35,
				top: e.pageY + 5,
			});
			$(this).css("background-color", currentColor);
		}
	});

	/* do actions when the submit button is clicked */
	$("#btnSubmit").click(function () {
		$(".colorBoard").css("visibility", "hidden");
		const validRow = checkRow(
			currentBoardCells,
			colors,
			cell1Color,
			cell2Color,
			cell3Color,
			cell4Color
		);

		if (validRow) {
			[cell1Color, cell2Color, cell3Color, cell4Color] = updatePegs(
				currentBoardCells,
				colors,
				currentPegCells,
				code,
				cell1Color,
				cell2Color,
				cell3Color,
				cell4Color
			);
			hasWon = checkWin(
				hasWon,
				code,
				cell1Color,
				cell2Color,
				cell3Color,
				cell4Color
			);
			showCode(hasWon, code);
			gameOver(hasWon, "¡Congrats, You are the winner🥳🥳");

			if (hasWon) {
				socket.emit("gameOver", "Sorry, You have lost😥😥", room_code);
			}

			[currentRow, currentBoardCells, currentPegCells] = changeCurrentRow2(
				currentRow,
				4
			);
		} else {
			alert("The code is not complete.");
		}
	});

	/* check whether the cell clicked on is valid */
	function isValid(id) {
		if (currentBoardCells.includes(id) && hasWon === false) {
			return true;
		}
		return false;
	}
});
