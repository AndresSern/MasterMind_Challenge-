import { genCode } from "./utils/genCode.js";

const create_room = document.getElementById("create_room");
export const btnMultiplayer = async function () {
	const btnMul = document.createElement("div");

	btnMul.style.display = "none";
	btnMul.className = "submit multiplayer";
	btnMul.innerText = "Create room";

	const code = await genCode();
	const linkRoom = document.createElement("a");
	linkRoom.style.display = "none";
	linkRoom.id = "link_join_room";
	linkRoom.href = `/${code}`;
	linkRoom.innerText = "Join Room";
	create_room.append(linkRoom);

	document.getElementById("link_join_room").click();
	return btnMul;
};
