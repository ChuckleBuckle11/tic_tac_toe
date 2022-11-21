//Game board module

const gameBoard = (() => {
    //board array
    let board = [];

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
        board[index] = sign;
    }

    return {board, turns, getCell, setCell}; //module exports
})();

//Game Controller
const gameController = (() => {

    let round = 1;
    let gameOver = false;
    const playerFactory = (name,mark,turn) => {
        return {name,mark,turn}; 
    }

    // Player Objects
    const playerO = playerFactory('Player O', "O", true);
    const playerX = playerFactory('Player X', "X", false);


    const getCurrentPlayerSign = () => round%2 === 0 ? playerO.mark : playerX.mark;

    const playRound = (cell) => {
        if (gameOver || gameBoard.getCell(cell) !== '') return;
    }

    return {playRound, reset};
})();

// Display controller


const displayController = (() => {
    console.log("ASDF")
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener('click', (e) =>{

        })
    })


    

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

