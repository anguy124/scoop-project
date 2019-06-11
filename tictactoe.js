var originalBoard;
const humanPlayer = '0';
const computerPlayer = 'X';
const winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
]

const cells = document.querySelectorAll('.cell');
startGame();


function startGame(){
    document.querySelector(".endgame").style.display = "none";
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
    originalBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(box){
    if (typeof originalBoard[box.target.id] == 'number'){
        turn(box.target.id, humanPlayer);
        if (!checkTie()) turn(bestSpot(), computerPlayer);
    }
}

function turn(boxID, player){
    originalBoard[boxID] = player;
    document.getElementById(boxID).innerText = player;
    let gameWon = checkWin(originalBoard,player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board,player){
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    let plays = board.reduce((a,e,i) => 
        (e === player) ? a.concat(i) : a,[]);
    let gameWon = null; 

    for (let [index,win] of winningCombo.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
            }
        }
    return gameWon;
}

function emptyBoxes(){
    return originalBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
    return emptyBoxes()[0];
}

function checkTie(){
    if (emptyBoxes().length == 0){
        for (var i = 0; i<cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

function gameOver(gameWon){
    for (let index of winningCombo[gameWon.index]){
        document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == humanPlayer ? "YOU WIN!" : "YOU LOSE!");
}

function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}



