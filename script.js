//Game board module
const gameBoard = (() => {
    //board array
    let board = ['','','','','','','','',''];

    // All possible win combos for any player
    const winCombos = [    
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];

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
        console.log(board);
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


    const playerFactory = (name,mark,turn) => {
        return {name,mark,turn}; 
    }

    // Player Objects
    const playerO = playerFactory('Player O', "O", true);
    const playerX = playerFactory('Player X', "X", false);


    const getCurrentPlayerSign = () => {
        return round%2 == 0 ? playerO.mark : playerX.mark;
    }


    const playRound = (cellID) =>{
        if (gameBoard.getCell(cellID) != "" || gameOver) return;
        gameBoard.setCell(cellID, getCurrentPlayerSign());


        round++;
    }


    return {playRound};
})();



// Display controller
const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    console.log(cells)

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
    }

    const resetBoard = function (){
        let cells = document.getElementsByClassName("cell");
        cells.forEach(cell => {
            cell.textContent = "";
        })
    }

    return {resetBoard};
})();



//MAIN




//FUNCTIONS 
// function initBoard(){      //initializes board
//     let board = gameBoard.board;
//     console.log(board);
//     let cell_idx = 1;
//     for (row in board){
//         for (element of board[row]){
//             let cell = document.getElementById("cell" + cell_idx);
//             cell.textContent = element;
//             cell_idx++;
//         }
//     }

//     const cells = document.querySelectorAll(".cell");
//     cells.forEach( (e) => {
//         e.addEventListener("click", console.log("click"))
//     });
//     return;
// }

