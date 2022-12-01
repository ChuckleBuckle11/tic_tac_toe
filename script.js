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
    let draw = 0;
    let winner = null;
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

        if (getCurrentPlayerSign() == playerO.mark){
            playerOchoices.push(Number(cellID))
        }

        else if (getCurrentPlayerSign() == playerX.mark){
            playerXchoices.push(Number(cellID))
        }
        console.log(`ROUND ${round}`)

        checkWin();
        round++;
    }

    const resetRounds = () => {
        round = 1;
        gameOver = false;
        currentPlayer = "O";
        draw = 0;
        playerOchoices = [];
        playerXchoices = [];
    }

    checkWin = () => {
        //Draw!
        console.log(round)
        if (round >= 9){
            gameController.draw = 1;
            draw = 1;
            return;
        }

        // No player can win earlier than 5 rounds
        if (round >= 5){
            for (combo of winCombos){
                if (combo.every(el => playerOchoices.includes(el))){
                    gameController.winner = "O";
                    gameController.gameOver = 1;
                    gameOver = 1;
                    displayController.declareWinner(gameController.winner);
                }

                if (combo.every(el => playerXchoices.includes(el))){
                    gameController.winner = "X"
                    gameController.gameOver = 1;
                    gameOver = 1;
                    displayController.declareWinner(gameController.winner); 
                }
            }
        }
        
    }

    return {playRound, getCurrentPlayerSign, resetRounds, draw, gameOver};
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
        console.log(gameController.draw)
        for (i = 0; i < gameBoard.board.length; i++ ) {
            cells[i].textContent = gameBoard.board[i];
        }
        if (gameController.gameOver) return;
        if (gameController.draw){
            updateMessage(`Draw!`);
            return;
        }
        updateMessage(`It's ${gameController.getCurrentPlayerSign()}'s turn!`);
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

    const updateMessage = (string) => {
        const currentPlayer = gameController.getCurrentPlayerSign();
        messageCtn.textContent = string;
    }

    const declareWinner = (winner) =>{
        console.log(`${winner} wins!`)
        updateMessage(`${winner} wins!`)
    }


    resetBtn.addEventListener('click',resetBoard);

    return {resetBoard, updateMessage, declareWinner};
})();


