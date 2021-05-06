export const genCode = async function () {
	let response = await fetch("/code")
	let code = await response.text();
	return code;
}
