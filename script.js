//Game board module
const gameBoard = (() => {
    //board array
    let board = ['','','','','','','','',''];
    let winner = null;
    
    // Turn counter
    let turns = 0;

    // Module functions
    const getCell = (index) => {
        if (index > board.length) return;
        return board[index];
    }

    const setCell = (index, mark) => {
        if (index > board.length) return;
        board[index] = mark;
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        }
    }

    return {board, turns, winner, getCell, setCell, reset}; //module exports
})();

//Game Controller
const gameController = (() => {

    let round = 1;
    let gameOver = false;
    let currentPlayer = "O";
    let cells = document.querySelectorAll(".cell");
    // All possible win combos for any player
    const winCombos = [
        [0, 1, 2],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [0, 4, 8]
    ];

    playerOchoices = [];
    playerXchoices = [];

    const playerFactory = (name,mark,turn) => {
        return {name,mark,turn}; 
    }

    // Player Objects
    const playerO = playerFactory('Player O', "O", true);
    const playerX = playerFactory('Player X', "X", false);

    // Gets the current player sign
    const getCurrentPlayerSign = () => {
        return round%2 == 0 ? playerO.mark : playerX.mark;
    }

    // Logic for playing rounds
    const playRound = (cellID) =>{
        if (gameBoard.getCell(cellID) != "" || gameOver) return;
        gameBoard.setCell(cellID, getCurrentPlayerSign());


        //

        // checkWin();
        round++;
    }

    const resetRounds = () => {
        round = 1;
        gameOver = false;
        currentPlayer = "O";

    }

    checkWin = () => {
        if (round >= 9){
            //Draw!
            return;
        }


    }

    return {playRound, getCurrentPlayerSign, resetRounds};
})();



// Display controller
const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const messageCtn = document.querySelector(".messageCtn");
    const resetBtn = document.querySelector(".resetBtn");

    cells.forEach((cell) => {
        cell.addEventListener('click', (e) =>{      
            gameController.playRound(e.target["id"]);
            updateGameBoard();
        })
    })

    const updateGameBoard = function(){
        for (i = 0; i < gameBoard.board.length; i++ ) {
            cells[i].textContent = gameBoard.board[i];
        }
        updateMessaage();
    }

    const resetBoard = function(){
        let cells = document.getElementsByClassName("cell");
        Array.from(cells).forEach((cell) => {
            cell.textContent = "";
            gameBoard.reset();
            gameController.resetRounds();
            messageCtn.textContent = "Press on a tile to start playing!"
        })
    }

    const updateMessaage = function(){
        const currentPlayer = gameController.getCurrentPlayerSign();
        messageCtn.textContent = `It's ${currentPlayer}'s turn!`
    }

    resetBtn.addEventListener('click',resetBoard);

    return {resetBoard};
})();


