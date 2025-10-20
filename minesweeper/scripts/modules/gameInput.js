
class GameInput {

    constructor(gameLogic) {
        this.gameLogic = gameLogic;

        this.resetBtn = document.querySelector('#reset-button');
        

        this.AddEventListeners();
    }

    // Adds the event listeners to all the buttons
    AddEventListeners() {
        // Gets Board Container
        const container = this.gameLogic.gameBoard.boardEl;

        // Adds Event Listeners
        container?.addEventListener('mouseup', (event) => this.HandleButton(event));
        container?.addEventListener('mouseover', (event) => this.HoverOverButton(event));
        container?.addEventListener('mouseout', (event) => this.StopHoveringButton(event));

        this.resetBtn.addEventListener('click', () => this.gameLogic.ResetGame());
    }

    // Handles which function to go to when button is pressed
    HandleButton = event => {
        const cell = event.target.closest('.cell');
        // Does Nothing if Game is over or no cell
        if (!cell || this.gameLogic.gameOver) return;;
        const index = cell.dataset.index;

        // Starts Game if hasn't started
        if (!this.gameLogic.gameStarted) {
            this.gameLogic.gameStarted = true;
            this.gameLogic.StartGame(index);
        }

        if (event.button == 0 && this.gameLogic.gameStarted) { // Left Click - Reveals cell
            this.gameLogic.RevealCells(index);
        }
        else if (event.button == 2 && this.gameLogic.gameStarted) { // Right Click - Places flag
            this.gameLogic.PlaceFlag(index);
        }

        // Checks if all cells revealed except mines
        if (this.gameLogic.revealedCellsCount == 185) {
            this.gameLogic.WinGame();
        }
    }

    // Runs if player hovers over button
    HoverOverButton = event => {
        const cell = event.target.closest('.cell');
        // Calls function for hovered cell
        try {
            const index = cell.dataset.index;
            this.gameLogic.gameBoard.HoverOverCell(index, this.gameLogic.gameOver);
        } catch {};
    }

    // Runs if player stops hovering over button
    StopHoveringButton = event => {
        const cell = event.target.closest('.cell');
        // Calls function for hovered cell
        try {
            const index = cell.dataset.index;
            this.gameLogic.gameBoard.StopHoveringCell(index, this.gameLogic.gameOver);
        } catch { };
    }

}

export default GameInput;