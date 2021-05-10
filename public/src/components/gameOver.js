export function gameOver(hasWon, msg) {
	if (hasWon) {
		$("#gameOverMessage").text(msg);
		$("a#playAgain").attr("href", document.URL);
		$("#hasWon").css("display", "block");
	}
}
