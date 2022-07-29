const gameModule = (() => {
'use strict';

let gameArray = [];



return {
    getGameBoard: function() {

    },

    playLoc: function(symbol, playedLoc) {
        gameArray[playedLoc] = symbol;
        console.log(gameArray);
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

gameModule.playLoc(player1.getSymbol(), 0);
