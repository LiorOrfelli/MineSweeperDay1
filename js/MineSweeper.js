'use strict';

var gBoard;
var gMines;

//Creating a cell fuction
function createCell() {
    //Setting each cell to default values (the moment its inserted into the 2D array)
    //Each cell will be given ----another attribute---- of location which represents its
    //coordinates on the board
    var tableCell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false

    };
    return tableCell;
}

//As describes above - this function adds the location of each cell
//It will run under createGameJsMatrix
function addCellCoordinates(cell, xCord, yCord) {
    cell.location = { i: xCord, j: yCord };
    return cell;
}

//quadSize stands for the matrix length or height (equally long since the matrix is square)
//quadSize will receive the values of 4,8,12 representing 3 levels of diificulty
//This function will return a matrix of cell objects (+add their location as an attribute)
function createGameJsMatrix(quadSize) {

    var gameMatrix = [];
    for (var i = 0; i < quadSize; i++) {
        for (var j = 0; j < quadSize; j++) {
            gameMatrix.push(addCellCoordinates(createCell(), i, j));
        }
    }
    return gameMatrix;
}

//This function will set mines in random empty positions in the matrix
//It will place 2 mines in the first level, 12 on the second and 30 on the last one 
//based on the quadSize parameter
function setMines(quadSize) {

    var minesSet;
    switch (quadSize) {
        case 4:
            minesSet = 2;
        case 8:
            minesSet = 12;
        case 12:
            minesSet = 30;
    }
    while (minesSet>0){
        if(!gBoard[generateRandomNumber][generateRandomNumber].isMine){
            gameBoard[generateRandomNumber][generateRandomNumber].isMine=True;
            minesSet--;}
        }
}

//Checking if a cell isn't already occupied by a mine
function isAvailableCell(cell){
    
    return (Cell.isMine);
}

//Generating a random number
function generateRandomNumber(num){

    Math.floor(Math.random() * num);
    return num
}


//quadSize stands for the width/height of the generated matrix
//quadSize will be 4 on the first level, 8 on the second and 12 in the last one
function buildBoard(quadSize){

    var gameBoard =[];

    return gameBoard;

}

/* function findAllAvailableCells(){

    var availableCells = [];

} */
//This function will set all the mines defined per level
//in random available positions
/* fucntion setGameMines(){ */
