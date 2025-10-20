class GameBoard {

    constructor(statusEl) {
        statusEl.textContent = "Loading Game";

        this.cells = [];    // Holds cell elements
        this.board = Array(225).fill(''); // Holds mine placements and keeps track of what is revealed
        this.boardEl = document.querySelector('#board');

        this.init();
    }

    // Initalizes the board
    init = () => {
        this.boardEl.innerHTML = '';

        // Creates each cell
        this.board.map((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index;

            // Adds cell to board and cells variable
            this.boardEl.append(cell);
            this.cells.push(cell);
        });
    };

    // Changes the colour darker when hovering over button
    HoverOverCell = (index, gameOver) => {
        // Mine buttons when game is over (Deep red)
        if (gameOver && this.board[index] == 'X') {
            this.cells[index].style.background = '#C76161';
        }
        // Flag buttons (Pink)
        else if (this.cells[index].textContent == "F") {
            this.cells[index].style.background = '#E5B6C6';
        }
        // Default buttons (white)
        else if (this.board[index] === '' || this.board[index] == 'X') {
            this.cells[index].style.background = '#E7E7E7';
        }
        // Button's already clicked (blue)
        else {
            this.cells[index].style.background = '#C5D9E0';
        }
    }

    // Returns to previous colour when done hovering
    StopHoveringCell = (index, gameOver) => {
        // Mine buttons when game is over
        if (gameOver && this.board[index] == 'X') {
            this.cells[index].style.background = '#FF474D';
        }
        // Flag buttons
        else if (this.cells[index].textContent == "F") {
            this.cells[index].style.background = '#FFB6C1';
        }
        // Non clicked buttons (white)
        else if (this.board[index] === '' || this.board[index] == 'X') {
            this.cells[index].style.background = '#FFFFFF';
        }
        // Button's already clicked (blue)
        else {
            this.cells[index].style.background = '#CAF0F8';
        }
    }

    // Changes the colour and text of the revealed cell
    RevealCell(index, text) {
        this.board[index] = text;
        this.cells[index].style.background = '#CAF0F8';
        this.cells[index].textContent = text;
    }

    // Changes the colour and text of the flagged cell
    FlagCell(index) {
        this.cells[index].style.background = '#FFB6C1';
        this.cells[index].textContent = "F";
    }

    // Changes colour and text of a cell that has a mine
    ShowMine(index) {
        this.cells[index].style.background = '#FF474D';
        this.cells[index].textContent = 'X';
    }
    
    // Clears cell visually
    ResetCell(index) {
        this.cells[index].style.background = '#FFFFFF';
        this.cells[index].textContent = "";
    }

    // Clears the whole board
    ResetBoard() {
        this.cells.forEach(cell => cell.style.background = '#FFFFFF');
        this.cells.forEach(cell => cell.textContent = "");
    }
}

export default GameBoard;