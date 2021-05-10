import { genCode } from "./utils/genCode.js";

const create_room = document.getElementById("create_room");
export const btnMultiplayer = async function () {
	const code = await genCode();
	window.location.href = document.URL + code;

};
