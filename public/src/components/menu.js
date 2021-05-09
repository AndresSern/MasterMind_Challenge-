// import {genCode} from "./utils/genCode.js";
import { btnMultiplayer } from './btnMultiplayer.js';

const start = document.querySelector('.start');
const rules = document.querySelector('.rules');
const content = document.querySelector('.content');
const close = document.querySelector('.close');
const submit = document.querySelector('.submit');
// let code_breaker = document.querySelector('.code_breaker');
const onevsone = document.getElementById('onevsone');
const onevsbot = document.getElementById('onevsbot');

start.addEventListener('click', () => {
  start.style.visibility = 'hidden';
  rules.style.visibility = 'hidden';
  content.style.visibility = 'visible';
  submit.style.visibility = 'visible';
  submit.style.transition = '.5s ease-out';
  // code_breaker.style.visibility = "visible";
  // code_breaker.style.transition = ".5s ease-out";
});

close.addEventListener('click', () => {
  start.style.visibility = 'visible';
  rules.style.visibility = 'visible';
  content.style.visibility = 'hidden';
  submit.style.visibility = 'hidden';
  submit.style.transition = 'none';
  // code_breaker.style.visibility = "hidden";
  // code_breaker.style.transition = "none";
});

let count = 0;
onevsone.addEventListener('click', () => {
  // alert("hola");
  async function showGameModes () {
    const multiplayer = await btnMultiplayer();
    onevsone.append(multiplayer);
  }
  if (count === 0) {
    showGameModes();
    count = 1;
  }
});

onevsbot.addEventListener('click', () => {
  const brline = document.createElement('br');
  onevsbot.append(brline);
  const room = document.createElement('a');
  room.href = '../../games2.html';
  room.innerText = 'Play';
  onevsbot.append(room);
});
