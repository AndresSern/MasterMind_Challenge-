let start = document.querySelector('.start');
let rules = document.querySelector('.rules');
let content = document.querySelector('.content');
let close = document.querySelector('.close');
let submit = document.querySelector('.submit');
let code_breaker = document.querySelector('.code_breaker');
let onevsone = document.getElementById('onevsone');
let onevsbot = document.getElementById('onevsbot');

//import {genCode} from "./utils/genCode.js";
import {btnMultiplayer} from "./btnMultiplayer.js";

start.addEventListener('click', ()=> {
	start.style.visibility = "hidden";
	rules.style.visibility = "hidden";
	content.style.visibility = "visible";
	submit.style.visibility = "visible";
	submit.style.transition = ".5s ease-out";
	//code_breaker.style.visibility = "visible";
	//code_breaker.style.transition = ".5s ease-out";
});

close.addEventListener('click', ()=> {
	start.style.visibility = "visible";
	rules.style.visibility = "visible";
	content.style.visibility = "hidden";
	submit.style.visibility = "hidden";
	submit.style.transition = "none";
	//code_breaker.style.visibility = "hidden";
	//code_breaker.style.transition = "none";
});

let count = 0;
onevsone.addEventListener('click', () => {
	//alert("hola");
	async function showGameModes() {
		const multiplayer = await btnMultiplayer();
		onevsone.append(multiplayer);
	}
	if (count === 0) {
		showGameModes()
		count = 1;
	}
});

onevsbot.addEventListener('click', ()=> {
	const brline = document.createElement("br");
	onevsbot.append(brline);
	const room = document.createElement("a");
	room.href = "../../games2.html";
	room.innerText = "Play";
	onevsbot.append(room);
})