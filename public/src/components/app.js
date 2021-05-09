import { btnMultiplayer } from './btnMultiplayer.js';

const app = document.getElementById('app');

async function showGameModes () {
  const multiplayer = await btnMultiplayer();
  app.append(multiplayer);
}

showGameModes();
