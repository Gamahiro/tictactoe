const gameBox = document.querySelector('#gameBox');
const body = document.querySelector('body');

const playerTurn = (() => {
    'use strict';

    let currentPlayerTurn;

    return {

        swapPlayerTurn: function () {
            if (currentPlayerTurn == player1) {
                currentPlayerTurn = player2;
            }
            else if (currentPlayerTurn == player2) {
                currentPlayerTurn = player1;
            }
            else {
                currentPlayerTurn = player1;
            }
        },

        getPlayerTurn: function () {
            return currentPlayerTurn;
        },

        setPlayerTurn: function (player) {
            currentPlayerTurn = player;
        }
    }

})();

const gameModule = (() => {
    'use strict';

    let gameArray = [];


    return {

        getArray: function () {
            return gameArray;
        },

        playLoc: function (symbol, playedLoc) {
            if (gameArray[playedLoc] != " ") {
                console.log('location is already populated');
            }
            else {
                gameArray[playedLoc] = symbol;
                gameModule.clearBoard();
                gameModule.updateBoard();
                this.checkWin();
            }

        },

        initGame: function () {
            playerTurn.setPlayerTurn(player1);
            gameArray.length = 0;
            for (let i = 0; i < 9; i++) {
                gameArray.push(' ');
                console.log(gameArray.length)
            }
            
            gameModule.updateBoard();
        },

        updateBoard: function () {
            for (let i = 0; i < gameArray.length; i++) {
                const playBox = document.createElement('div');
                playBox.className = 'playBox';
                playBox.innerHTML = '' + gameArray[i];



                playBox.addEventListener('click', () => {
                    let playerClicked = playerTurn.getPlayerTurn();
                    this.playLoc(playerClicked.getSymbol(), [i]);
                    playerTurn.swapPlayerTurn();
                });
                gameBox.appendChild(playBox);
            }

        },

        clearBoard: function () {
            for (let i = 0; i < gameArray.length; i++) {

                gameBox.removeChild(gameBox.lastChild);
            }

        },

        checkWin: function () {

            let winCase1 = gameArray[0] + gameArray[1] + gameArray[2];
            let winCase2 = gameArray[0] + gameArray[3] + gameArray[6]; 
            let winCase3 = gameArray[0] + gameArray[4] + gameArray[8];
            let winCase4 = gameArray[1] + gameArray[4] + gameArray[7];
            let winCase5 = gameArray[2] + gameArray[4] + gameArray[6];
            let winCase6 = gameArray[2] + gameArray[5] + gameArray[8];
            let winCase7 = gameArray[3] + gameArray[4] + gameArray[5];
            let winCase8 = gameArray[6] + gameArray[7] + gameArray[8];


            let player1Symbol = player1.getSymbol();
            let player2Symbol = player2.getSymbol();
            let freeSpaces = gameArray.length;

            for (let i = 1; i <= 8; i++) {

                

                switch (eval('winCase' + i)) {
                    case player1Symbol + player1Symbol + player1Symbol:
                        this.gameEnd(player1)
                        break;
                    case player2Symbol + player2Symbol + player2Symbol:
                        this.gameEnd(player2)

                        break;
                    default:

                }

                if (gameArray[i] != ' ') {
                    freeSpaces--;
                }
                if(freeSpaces == 1) {
                    this.gameEnd(player1, player2);
                }
            }


        },
        gameEnd: function(player1, player2) {

            gameModule.clearBoard();


            const endGamePopup = document.createElement('div');
            let firstPlayer = player1.getName();
            let gameOverMsg;

            if(arguments.length == 1) {
                gameOverMsg = firstPlayer + ' wins!!'
            }

            else {
            let secondPlayer = player2.getName();
                gameOverMsg = firstPlayer + ' has tied with ' + secondPlayer + '!';
            }
            
            endGamePopup.className = 'gameOverPopup';
            endGamePopup.innerHTML = `<div class="gameOverTitle">GAME OVER</div><div class="gameOverMsg">${gameOverMsg}</div><button class="playAgainBtn">Play again?</button>`;

            body.appendChild(endGamePopup);

            const playAgainBtn = document.querySelector('.playAgainBtn');

            playAgainBtn.addEventListener('click', () => {
                this.initGame();
                endGamePopup.removeChild(playAgainBtn);
                body.removeChild(endGamePopup);
                console.log(gameArray);
            });

        }
    };


})();


const player = (name, symbol) => {

    if(name == null || name == '') {
        name = 'Undefined Player';
    }

    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
};


const player1 = player(prompt('Enter player 1 Name: '), 'X');

const player2 = player(prompt('Enter player 2 Name: '), 'O');


gameModule.initGame();
