
class GameLogic {

    // Sets Default Variables
    constructor(gameBoard, statusEl) {

        this.gameBoard = gameBoard
        this.statusEl = statusEl;

        this.gameStarted = false;
        this.gameOver = false;

        this.revealedCellsCount = 0;
        this.flagCount = 40;
        this.time = 0;
        this.highscore = 0;  

        this.flagCountEl = document.querySelector('#flag-count');
        this.highscoreEl = document.querySelector('#highscore');
        this.timerEl = document.querySelector('#timer');
    }

    // Starts Game
    StartGame = index => {
        this.statusEl.textContent = "Game Has Started";

        let surroundingCells = this.GetIndexOfSurroundingCells(index);

        let mineIndexes = []; // Holds current mine indexes to check for repeat
        const mine = "X";

        // Creates 40 Mines
        for (let i = 0; i < 40; i++) {
            
            let mineIndex = Math.floor(Math.random() * 225);

            // Loops if mines are already used or too close to where the user clicked
            while (mineIndex == index || mineIndexes.includes(mineIndex) || surroundingCells.includes(mineIndex)) {
                mineIndex = Math.floor(Math.random() * 225);
            }

            mineIndexes.push(mineIndex);
            this.gameBoard.board[mineIndex] = 'X';
        }

        // Starts Timer
        let interval = setInterval(() => {
            if (this.gameStarted) {
                this.time++;
                this.timerEl.textContent = "Timer : " + this.time;
            }
            else { // Stops timer if game has ended
                clearInterval(interval);
            }
        }, 1000);
    }

    // Reveals the Cell if it's not been revealed or flagged
    RevealCells = index => {

        // Checks if mine is clicked and its not flagged
        if (this.gameBoard.cells[index].textContent != "F" && this.gameBoard.board[index] == 'X') {
            this.LostGame();
            return;
        }

        // Runs if the clicked cell is open and not flagged
        if (this.gameBoard.board[index] === '' && this.gameBoard.cells[index].textContent != "F") {
            let surroundingCells = this.GetIndexOfSurroundingCells(index);  // Gets list of index of surrounding cells
            let count = 0   // Count of Mines around cell

            // Increases count if its a mine
            for (let i of surroundingCells) {
                if (this.gameBoard.board[i] == 'X') {
                    count++;
                }
            }

            // Sets board and cells
            this.gameBoard.RevealCell(index, count);
            this.revealedCellsCount++;

            if (count == 0) { // No mines surrounding cell
                this.gameBoard.cells[index].textContent = "";

                // Loops through surrounding cells, revealing cell if it hasnt been
                for (let x of surroundingCells) {
                    if (this.gameBoard.board[x] === '') {
                        this.RevealCells(x);
                    }
                }
            }
        }
    }

    // Places down flags
    PlaceFlag(index) {

        // Removes Flag if already flagged
        if (this.gameBoard.cells[index].textContent == "F") {

            this.gameBoard.ResetCell(index);
            this.flagCount++;
        }
        // Checks if avaible to put down flag
        else if ((this.gameBoard.board[index] === '' || this.gameBoard.board[index] == 'X') && this.flagCount > 0) {

            this.gameBoard.FlagCell(index);
            this.flagCount--;
        }

        // Updates flag count
        this.flagCountEl.textContent = "Flag Count : " + this.flagCount;
    }

    LostGame() {
        this.statusEl.textContent = "You've Lost :(";

        this.gameStarted = false;
        this.gameOver = true;

        this.ShowMinePlacements();

        // Lets user know and ask for reset
        setTimeout(() => {
            if (confirm("You lost >:((( Play Again?")) {
                this.ResetGame();
            }
        }, 200)
    }

    WinGame() {
        this.statusEl.textContent = "You Won :)";

        this.gameStarted = false;
        this.gameOver = true;

        this.ShowMinePlacements();

        // Lets user know and ask for reset
        setTimeout(() => {
            if (confirm("You won!!!!!!!! Play Again?")) {
                this.ResetGame();
            }
        }, 200)

        // Sets highscore if better than current highscore or isn't first won game     
        if (this.time < this.highscore || this.highscore == 0) {
            this.highscore = this.time;
            this.highscoreEl.textContent = "Highscore : " + this.highscore;
        }
    }

    // Shows mine placements
    ShowMinePlacements() {
        for (let i = 0; i < 225; i++) {
            if (this.gameBoard.board[i] == 'X') {
                this.gameBoard.ShowMine(i);
            }
        }
    }

    // Resets Variables, Board and Cells
    ResetGame() {
        this.statusEl.textContent = "Game is Ready to Start";

        this.gameBoard.board = Array(225).fill('');
        this.gameStarted = false;
        this.gameOver = false;

        // Clears cells
        this.gameBoard.ResetBoard();

        // Resets Elements
        this.timerEl.textContent = "Timer : " + 0;
        this.flagCountEl.textContent = "Flag Count : " + 40;

        // Resets counts
        this.revealedCellsCount = 0;
        this.flagCount = 40;
        this.time = 0;
    }

    // Gets the surrounding cell indexes of a cell
    GetIndexOfSurroundingCells = index => {
        let surroundingCellsIndexes = [];
        index = parseInt(index);

        // Get Cell Above
        if (index > 14) {
            surroundingCellsIndexes.push(index - 15);
            // Cell Above Left
            if ((index % 15) != 0) {
                surroundingCellsIndexes.push(index - 16);
            }
            // Cell Above Right
            if (((index + 1) % 15) != 0) {
                surroundingCellsIndexes.push(index - 14);
            }
        }
        // Get Cell Below
        if (index < 210) {
            surroundingCellsIndexes.push(index + 15);
            // Cell Below Left
            if ((index % 15) != 0) {
                surroundingCellsIndexes.push(index + 14);
            }
            // Cell Below Right
            if (((index + 1) % 15) != 0) {
                surroundingCellsIndexes.push(index + 16);
            }
        }
        // Get Cell to Left
        if ((index % 15) != 0) {
            surroundingCellsIndexes.push(index - 1);
        }
        // Get Cell to Right
        if (((index + 1) % 15) != 0) {
            surroundingCellsIndexes.push(index + 1);
        }
        return surroundingCellsIndexes;
    }
}

export default GameLogic;