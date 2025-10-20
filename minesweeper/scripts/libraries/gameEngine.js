import GameBoard from "../modules/gameBoard.js";
import GameInput from "../modules/gameInput.js";
import GameLogic from "../modules/gameLogic.js";

class GameEngine {

    constructor() {
        // Initializing Game
        this.statusEl = document.querySelector('#game-status');
        this.statusEl.textContent = "Initializing Game";

        this.gameBoard = new GameBoard(this.statusEl);
        this.gameLogic = new GameLogic(this.gameBoard, this.statusEl);
        this.gameInput = new GameInput(this.gameLogic);

        this.statusEl.textContent = "Game is Ready to Start";
    }

}

export default GameEngine;