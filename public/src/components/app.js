const app = document.getElementById("app");

import {btnMultiplayer} from "./btnMultiplayer.js";

async function showGameModes() {
	const multiplayer = await btnMultiplayer();
	app.append(multiplayer);
}

showGameModes()
