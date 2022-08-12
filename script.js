const gameBox = document.querySelector('#gameBox');


const gameModule = (() => {
'use strict';

let gameArray = [];

return {

    playLoc: function(symbol, playedLoc) {
        gameArray[playedLoc] = symbol;
        console.log(gameArray);
    },

    initGame: function() {
        for(let i = 0; i < 9; i++) {
            gameArray.push(' ');
        }
    },

    updateBoard: function() {
        for(let i = 0; i < gameArray.length; i++){
            const playBox = document.createElement('div');
            playBox.className = 'playBox';
            playBox.innerHTML =  '' + gameArray[i];
            gameBox.appendChild(playBox);
            console.log(gameArray[i]);
        }
       
    },

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

const player1 = player('Player 1', 'X');
const player2 = player('Player 2', 'O');

gameModule.initGame();
gameModule.playLoc(player1.getSymbol(), 5);
gameModule.playLoc(player2.getSymbol(), 3);
gameModule.updateBoard();
gameModule.clearBoard();
gameModule.playLoc(player1.getSymbol(), 1);
gameModule.playLoc(player2.getSymbol(), 4);
gameModule.updateBoard();
gameModule.playLoc(player1.getSymbol(), 6);
gameModule.clearBoard();
gameModule.updateBoard();