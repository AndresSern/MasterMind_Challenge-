export function gameOver(hasWon, msg) {
	if (hasWon) {
		$("#gameOverMessage").text(msg);
		$("a#playAgain").attr("href", document.URL);
		$("#btnSubmit").css("display", "none");
		$("#actualRoom").css("display", "none");
		$("#hasWon").css("display", "block");
	}
}
