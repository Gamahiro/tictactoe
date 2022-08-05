const gameBox = document.querySelector('#gameBox');

const gameModule = (() => {
'use strict';

let gameArray = [];

function initGame() {
    for(let i = 0; i < 9; i++) {
        gameArray.push('blank');
    }
}


return {
    getGameBoard: function() {

    },

    playLoc: function(symbol, playedLoc) {
        gameArray[playedLoc] = symbol;
        console.log(gameArray);
    },

    initGame 
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

