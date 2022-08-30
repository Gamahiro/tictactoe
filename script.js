const gameBox = document.querySelector('#gameBox');

const playerTurn = (() => {
    'use strict';

    let currentPlayerTurn;

    return {

        swapPlayerTurn: function() {
            if (currentPlayerTurn == player1) {
                currentPlayerTurn = player2;
            }
            else if (currentPlayerTurn == player2) {
                currentPlayerTurn = player1;
            }
            else{
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


    playLoc: function(symbol, playedLoc) {
        if(gameArray[playedLoc] != " " ) {
            console.log('location is already populated');
        }
        else {
            gameArray[playedLoc] = symbol;
            console.log(symbol, playedLoc);
            gameModule.clearBoard();
            gameModule.updateBoard();
        }
        
    },

    initGame: function() {
        playerTurn.setPlayerTurn(player1);
        for(let i = 0; i < 9; i++) {
            gameArray.push(' ');
        }
        gameModule.updateBoard();
    },

    updateBoard: function() {
        for(let i = 0; i < gameArray.length; i++){
            const playBox = document.createElement('div');
            playBox.className = 'playBox';
            playBox.innerHTML =  '' + gameArray[i];



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

    clearBoard: function() {
        for (let i = 0; i < gameArray.length; i++) {
            
            gameBox.removeChild(gameBox.lastChild);
        }
        
    }
};

    
})();


const player = (name, symbol) => {

    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
};

function restartGame() {
    gameModule.clearBoard();
    gameModule.initGame();
}

const player1 = player('Player 1', 'X');
const player2 = player('Player 2', 'O');

gameModule.initGame();