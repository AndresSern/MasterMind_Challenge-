export function gameOver (hasWon, msg) {
  if(hasWon) {
    const winnerMsg = '<h3>' + msg + '</h3>' + '<br>';
    const plaAgain = '<div class="submit"><a href="' + document.URL + '">Play Again</a></div>';
    const backToHome = '<div class="submit"><a href="/">Back To Home</a></div>'
    $('#hasWon').append(winnerMsg);
    $('#hasWon').append(plaAgain);
    $('#hasWon').append(backToHome);
    $('#hasWon').css('display', 'block');
  }
}