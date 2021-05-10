import { btnMultiplayer } from "./btnMultiplayer.js";

const start = document.querySelector(".start");
const rules = document.querySelector(".rules");
const content = document.querySelector(".content");
const close = document.querySelector(".close");
const submit = document.querySelector(".submit");
const onevsone = document.getElementById("onevsone");
const onevsbot = document.getElementById("onevsbot");
let create_a_room = document.getElementById("create_room");
let join_a_room = document.querySelector(".join_a_room");
const inputCode = document.querySelector(".inputCode");
const joinRoombtn = document.getElementById("joinRoombtn");

start.addEventListener("click", () => {
	start.style.visibility = "hidden";
	rules.style.visibility = "hidden";
	content.style.visibility = "visible";
	submit.style.visibility = "visible";
	submit.style.transition = ".5s ease-out";
	onevsbot.style.visibility = "visible";
	onevsbot.style.transition = ".5s ease-out";
});

close.addEventListener("click", () => {
	start.style.visibility = "visible";
	rules.style.visibility = "visible";
	content.style.visibility = "hidden";
	submit.style.visibility = "hidden";
	submit.style.transition = "none";
	onevsone.style.transition = "none";
	onevsbot.style.visibility = "hidden";
	onevsbot.style.transition = "none";
	onevsone.style.display = "block";
	onevsbot.style.display = "block";
	join_a_room.style.display = "none";
	create_a_room.style.display = "none";
});

onevsone.addEventListener("click", () => {
	onevsone.style.display = "none";
	onevsbot.style.display = "none";
	join_a_room.style.display = "block";
	create_a_room.style.display = "block";
});

let count = 0;
create_room.addEventListener("click", () => {
	async function showGameModes() {
		await btnMultiplayer();
	}
	if (count === 0) {
		showGameModes();
		count = 1;
	}
});

onevsbot.addEventListener("click", () => {
	window.location.href = document.URL + 'games.html';
});

joinRoombtn.addEventListener("click", () => {
	const code = inputCode.value;
	window.location.href = document.URL + code;

})