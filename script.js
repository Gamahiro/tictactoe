const gameBox = document.querySelector('#gameBox');

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

// @todo create function to detect win
// @todo create player win popup
// @todo create restart game button


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
                console.log(symbol, playedLoc);
                console.log(gameArray[playedLoc])
                gameModule.clearBoard();
                gameModule.updateBoard();
                this.checkWin();
            }

        },

        initGame: function () {
            playerTurn.setPlayerTurn(player1);
            for (let i = 0; i < 9; i++) {
                gameArray.push(' ');
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
                    gameModule.clearBoard();
                    gameModule.updateBoard();
                    playerTurn.swapPlayerTurn();
                });
                gameBox.appendChild(playBox);
            }

        },

        /* clearBoard: function() {
            gameBox.replaceWith(gameBox.cloneNode(true));
        } */

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

            for (let i = 1; i <= 8; i++) {
                switch (eval('winCase' + i)) {
                    case player1Symbol + player1Symbol + player1Symbol:
                        console.log(player1.getName() + ' wins');
                        break;
                    case player2Symbol + player2Symbol + player2Symbol:
                        console.log(player2.getName() + ' wins');
                        break;
                    default:
                        console.log('no winner yet');
                        console.log(eval('winCase' + i));
                        console.log(player1Symbol);
                }
            }


        }
    };


})();


const player = (name, symbol) => {

    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
};

function restartGame() {
    gameModule.clearBoard();
    gameModule.initGame();
}

const player1 = player('Player 1', 'X');
const player2 = player('Player 2', 'O');

gameModule.initGame();

