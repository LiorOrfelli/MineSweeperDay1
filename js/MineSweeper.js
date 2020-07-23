'use strict';

var gBoard;
var gMines;
var gLives;
var gClicksCounter;

//Creating a cell fuction
function createCell() {
    //Setting each cell to default values (the moment its inserted into the 2D array)
    //Each cell will be given ----another attribute---- of ID in the function below
    var tableCell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false

    };
    return tableCell;
}

//Thia function will attach each cell its on ID, which is a single number 
//between 1 and the matrix num of cells
function attachCellAnId(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            gBoard[i][j].id = i * gBoard.length + (j + 1);
        }
    }
}

//As its name clues - this function genertates an id 
//between 1 to the (matrix size)^2
function generateRandomCellId(quadricSize) {
    var id = Math.floor(Math.random() * (quadricSize * quadricSize)) + 1;
    return id;
}


function buildBoard(quadSize) {
    var gameBoard = [];
    for (var i = 0; i < quadSize; i++) {
        gameBoard[i] = []
        for (var j = 0; j < quadSize; j++) {
            gameBoard[i].push(createCell());
        }
    }
    return gameBoard;

}
//This function will seek for random available cells
//across the matrix and return an array of indexes of cells for mines to be generated into
//The number of the bombs depends on each level
//This function (and also other functions later will be using the genertate random number function)
function generateMinesLocations(quadricSize, numOfBombs) {
    var mineCells = [];
    var mineCellId;
    //This while loop will promise to make sure all bombs are set to different availbale cells
    while (mineCells.length < numOfBombs) {
        mineCellId = generateRandomCellId(quadricSize);
        //If the generated cell is not in the array, push it
        if (mineCells.indexOf(mineCellId) === -1) {
            mineCells.push(mineCellId);
        }

    }
    return mineCells;
}
//Asisting function
function getCellById(cellId) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.id === cellId)
                return currCell;
        }

    }
    return null;
}

//This function will place a mine in the cells intended for it
//that their id's were generated before
//in each iteration minesLocations[0] represents the next id of cell intended for bomb
function setMinesInPlace(minesLocations) {
    while (minesLocations.length > 0) {
        console.log(getCellById(minesLocations[0]));
        getCellById(minesLocations[0]).isMine = true;
        minesLocations.shift();
    }
}

//This function will rely on the "count the neigbors algorithm"
function countMinesAroundCell(cellI, cellJ, mat) {
    var neighborMinesSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) neighborMinesSum++;
        }
    }
    return neighborMinesSum;
}

function UpdateMinesAroundEachCell() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            gBoard[i][j].minesAroundCount = countMinesAroundCell(i, j, gBoard);
        }
    }
}

function renderBoard(board) {
    var result = `<table border=1>`;
    for (var i = 0; i < board[0].length; i++) {
        result += `<tr>`;
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].isMine) {
                result += `<td><button id = ${board[i][j].id} cellRow =${i} cellCol =${j} onclick="cellClicked(this,this.id,this.cellRow,this.cellCol)" class="covered"><img src="pics/mine.png"></button></td>`;
            }
            else if (board[i][j].minesAroundCount === 0) {
                result += `<td><button id = ${board[i][j].id} cellRow =${i} cellCol =${j} onclick="cellClicked(this,this.id,this.cellRow,this.cellCol)" class="covered"></button></td>`;
            }
            else {
                result += `<td><button id = ${board[i][j].id} cellRow =${i} cellCol =${j} onclick="cellClicked(this,this.id,this.cellRow,this.cellCol)" class="covered">${board[i][j].minesAroundCount}</button></td>`;
            }
        }
        result += "</tr>";
    }
    result += "</table>";

    var elMatrix = document.querySelector('.game-section');
    elMatrix.innerHTML += result;
}
/* function renderBoard(board) {
    var result = `<table border=1>`;
    for (var i = 0; i < board[0].length; i++) {
        result += `<tr>`;
        for (var j = 0; j < board.length; j++) {
                result += `<td><button id = ${board[i][j].id} onclick="cellClicked(this,this.id)"></button></td>`;
        }
        result += "</tr>";
    }
    result += "</table>";

    var elMatrix = document.querySelector('.game-section');
    elMatrix.innerHTML += result;
} */



function getNeiCellsId(row, col) {
    var aroundNeigIds = [];

    for (var x = row - 1; x <= row + 1; x++) {
        for (var y = col - 1; y <= col + 1; y++) {
          if (x >= 0 && x < gBoard.length && y >= 0 && y < gBoard.length) {
            aroundNeigIds.push(gBoard[x][y].id)
          }
        }
    }
          return aroundNeigIds;
}
 



function cellClicked(elCell) {
    //Need to do 2 things here - add each cell its content - (mine/blank(0)/number )
    //And toggle back to covered if blank or number is pressed again
    //if its a mine - game over!
    //recursive serch is embeded in a function inside it
    console.log(elCell);
    console.log(elCell.getAttribute("cellRow"));
    console.log(elCell.getAttribute("cellRow"));
    var cellX = elCell.getAttribute("cellRow");
    var cellY = elCell.getAttribute("cellCol");
    console.log(gBoard[cellX][cellY].id);
    console.log(getNeiCellsId(cellX,cellY));
}

/*     exposingCells(gBoard, elCell, cellX, cellY);
}
function exposingCells(matrix, elcell, rowId, colId) {
    if (matrix[rowId][colId].minesAroundCount === 0) {

    }
    var elCellId = elCell.getAttribute()

} */

//Checking
function printCellsAndTheirIds(gBoard) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            console.log(gBoard[i][j], gBoard.id)
        }
    }
}
function gameOver() {
    stopTimer();
    changeSmileytoSad();
}

function initGame() {

    gBoard = buildBoard(12);
    attachCellAnId(gBoard);
    gMines = generateMinesLocations(12, 30);
    setMinesInPlace(gMines);
    UpdateMinesAroundEachCell();
    renderBoard(gBoard);
    gLives = 3;
    gClicksCounter = 0;
}

