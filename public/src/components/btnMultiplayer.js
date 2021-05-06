import {genCode} from "./utils/genCode.js";

const app = document.getElementById("app");

export const btnMultiplayer = async function () {
	const btnMul = document.createElement("div");
	btnMul.className = "submit multiplayer";
	btnMul.innerText = "Multiplayer";

	btnMul.addEventListener("click", async () => {
		const code = await genCode()
		console.log(code)
	
		const codeText = document.createElement("p");
		codeText.innerText = "Room's code: " + code;
		app.append(codeText)

		const linkRoom = document.createElement("a");
		linkRoom.href = `/${code}`
		linkRoom.innerText = "Room link"
		app.append(linkRoom)
	});
	
	return btnMul;
}
