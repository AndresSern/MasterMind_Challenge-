import { genCode } from './utils/genCode.js';

const onevsone = document.getElementById('onevsone');
export const btnMultiplayer = async function () {
  const btnMul = document.createElement('div');
  btnMul.className = 'submit multiplayer';
  btnMul.innerText = 'Create room';

  let count = 0;
  btnMul.addEventListener('click', async () => {
    console.log(count);
    if (count === 0) { /* Cambie esto == por === */
      const code = await genCode();
      console.log(code);

      const linkRoom = document.createElement('a');
      linkRoom.href = `/${code}`;
      linkRoom.innerText = 'Join Room';
      onevsone.append(linkRoom);

      count = 1;
    }
  });

  return btnMul;
};
