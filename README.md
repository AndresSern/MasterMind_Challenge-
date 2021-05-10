# Mastermind game :large_blue_circle: :red_circle: :white_circle: :black_circle:
From Wikipedia: Mastermind or Master Mind is a code-breaking game. It is known to be played with two players. The modern game with pegs was invented in 1970 by Mordecai Meirowitz, an Israeli postmaster and telecommunications expert.

The two players decide in advance how many games they will play, which must be an even number. One player becomes the codemaker, the other the codebreaker. The codemaker chooses a pattern of four code pegs. Duplicates and blanks are allowed depending on player choice, so the player could even choose four code pegs of the same color or four blanks. In the instance that blanks are not elected to be a part of the game, the codebreaker may not use blanks in order to establish the final code. The chosen pattern is placed in the four holes covered by the shield, visible to the codemaker but not to the codebreaker.[3]

The codebreaker tries to guess the pattern, in both order and color, within eight to twelve turns. Each guess is made by placing a row of code pegs on the decoding board. Once placed, the codemaker provides feedback by placing from zero to four key pegs in the small holes of the row with the guess. A colored or black key peg is placed for each code peg from the guess which is correct in both color and position. A white key peg indicates the existence of a correct color code peg placed in the wrong position.[

Screenshot of software implementation (ColorCode) illustrating the example.
If there are duplicate colours in the guess, they cannot all be awarded a key peg unless they correspond to the same number of duplicate colours in the hidden code. For example, if the hidden code is red-red-blue-blue and the player guesses red-red-red-blue, the codemaker will award two colored key pegs for the two correct reds, nothing for the third red as there is not a third red in the code, and a colored key peg for the blue. No indication is given of the fact that the code also includes a second blue.

Once feedback is provided, another guess is made; guesses and feedback continue to alternate until either the codebreaker guesses correctly, or all rows of the decoding boards are full.

# Our Mastermind game version :checkered_flag:
Knowing the basics about this game, we decided to build a digital version of Mastermind. So two players can play against each other. The difference with our version rules are the followings:
- You have to guess which is the correct combination of 4 colors.
- You have to win 2 out of 3 rounds to win the game.
- Once the game starts you can start guessing the correct combination.
- You only have 11 tries in each turn.
- 1 vs bot: you will loose a round if you spend the 11 tries without guessing the combination.
- 1 vs 1: you will win a round if you guess the correct combination of 4 colors before the other player does.
- 1 vs 1: if there is a tie in the third round, both will go to sudden death until having a unique winne

## Environment :computer:
So we can offer a web experience without the need of installation, this game was deployed using:
- Goorm: Cloud IDE service where we used a container.
- Express: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
Used technologies:
- HTML, CSS, and Javascript.

## File descriptions :open_file_folder:
- `index.js:` Javascript script to initialize the web server.
- `package-lock.json`: json file containing dependencies to initialize the web server.
- `package.json:` json file containing dependencies to initialize the web server.
- `public:` directory containing the base code.
- `public/index.html:`HTML file for the landing page.
- `public/games2.html:` HTML file for the game page.
- `public/test.html:` HTML for testing the web server
- `public/src:` directory containing the logic and css resources.
- `public/src/components:` directory containing the logic built in Javascript.
- `public/src/css:` directory containing css resources as style.css file, font types, and images.
- `public/src/styles:` directory containing css files for the corresponding HTML pages.
- `README.md`-

## Usage :arrow_forward:
For playing a local version:
- type in your terminal
 ```sh
 git clone https://github.com/AndresSern/MasterMind_Challenge-.git
 cd MasterMid_Challenge-.git
 npm install
 npm start
 ```
- open your favorite browser an type: `localhost:5000`
- enjoy!

For online version:
- https://mastermind.run-us-west2.goorm.io


## Bugs
When selecting a circle, you have to select the color and then select the circle again to paint the circle. That should not happen, it should be painted once you selected the preferred color.

## Authors :busts_in_silhouette:
- [Estefania Carvajal](https://www.linkedin.com/in/estephaniacalvoc/)
- [Adrian Vides](https://www.linkedin.com/in/adrianvides56/)
- [Andres Campo](https://www.linkedin.com/in/campoandres98/)
- [Andres Gonzalez](https://www.linkedin.com/in/andresgfranco/)

# License
Public domain. No copyright protection.

