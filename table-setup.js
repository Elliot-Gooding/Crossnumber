const table = document.getElementById("displayTable");
const output = document.getElementById("output");


const nRows = 8;
const nColumns = 3;

const overflow = 3; //Number of cells to add to each side of the table
//Overflow is used to allow tetrominos to rotate outside the table without causing an error

//
//Creating table
//
const cells = [];
for (let row = 0; row< nRows + 2*overflow; row++){
    const currentRow = table.insertRow(0);
    for (let column = 0; column < nColumns + 2*overflow; column++){
        const cell = currentRow.insertCell(0);
        cell.id = nColumns - (column-overflow+1)+","+(row-overflow)
        cell.row = row;
        cell.column = column
        cells.push(cell);
    }
}

function clearScreen(){
    cells.forEach(cell => {
        //Setting cell to white
        cell.style.backgroundColor = "";
        cell.style.borderTop       = "";
        cell.style.borderRight     = "";
        cell.style.borderBottom    = "";
        cell.style.borderLeft      = "";
        if (
            (cell.row > overflow-1 && cell.row <= nRows+overflow-1) &&
            (cell.column > overflow-1 && cell.column <= nColumns+overflow-1)
        ){
            cell.style.backgroundColor = "rgb(0,100,255)"; //Setting default colour of cells in rectangle to light blue
        }
    });
}

function displayTetromino(tetromino, offset, clear=false){
    if (clear){
        clearScreen();
    }
    const newTetromino = tetromino.rotate(offset[2]); //Rotate tetromino
    newTetromino.squareArr.forEach((square, i) => {
        //Get x and y coordinates of square
        const x = square.x + offset[0];
        const y = square.y + offset[1];
        const cell = document.getElementById(x+","+y); //Get cell at x,y
        //Set cell borders
        if (square.top)    { cell.style.borderTop    =  "5px solid #FF0000" }
        if (square.right)  { cell.style.borderRight  =  "5px solid #FF0000" }
        if (square.bottom) { cell.style.borderBottom =  "5px solid #FF0000" }
        if (square.left)   { cell.style.borderLeft   =  "5px solid #FF0000" }
        if (!hideColours)  { cell.style.backgroundColor = tetromino.colour  } //Set cell colour
    });
}


//
// UI code
//
let resultNum = 0;
let valid = "INVALID";
document.addEventListener('keydown', (event) => {
    if      (event.key === 'ArrowRight' && resultNum < crossNumberCombinations.length-1 )  { resultNum += 1 } 
    else if (event.key === 'ArrowLeft'  && resultNum > 0)  { resultNum -= 1 }
    
    //Specific to this instance of tetrominos
    if (resultNum >= 2 && resultNum <= 5){ valid = "VALID" } else { valid = "INVALID" }
});

document.getElementById("collape-borders").addEventListener("change", function() {
    table.classList.toggle('collapse-borders');
    let elements = table.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('collapse-borders');
    }
});

var hideColours = false
document.getElementById("hide-colours").addEventListener("change", function() {
    hideColours = !hideColours;
});