const table = document.getElementById("displayTable");
const output = document.getElementById("output");

const overflow = 3;
const nRows = 8;
const nColumns = 3;

const cells = [];
for (let row = 0; row< nRows + 2*overflow; row++){
    const currentRow = table.insertRow(0);
    for (let column = 0; column < nColumns + 2*overflow; column++){
        const cell = currentRow.insertCell(0);
        cell.id = nColumns - (column-overflow+1)+","+(row-overflow)
        cell.row = row;
        cell.column = column
        if (
            (row > overflow-1 && row <= nRows+overflow-1) &&
            (column > overflow-1 && column <= nColumns+overflow-1)
        ){
            cell.innerText = nColumns - (column-overflow+1)+","+(row-overflow);
        }
        cells.push(cell);
    }
}

function clearScreen(){
    cells.forEach(cell => {
        cell.style.backgroundColor = "";
        cell.style.borderTop    =  "" 
        cell.style.borderRight  =  "" 
        cell.style.borderBottom =  "" 
        cell.style.borderLeft   =  "" 
        if (
            (cell.row > overflow-1 && cell.row <= nRows+overflow-1) &&
            (cell.column > overflow-1 && cell.column <= nColumns+overflow-1)
        ){
            cell.style.backgroundColor = "rgb(200,200,200)";
        }
    });
}

function displayFromObj(tetromino, offset, clear=false){
    if (clear){
        clearScreen();
    }
    const colours = ["rgb(190, 20, 45)", "rgb(56, 35, 145)", "rgb(250, 100, 45)", "rgb(190, 240, 45)"]
    const newTetromino = tetromino.rotate(offset[2]);
    newTetromino.squareArr.forEach((square, i) => {
        const x = square.x + offset[0];
        const y = square.y + offset[1];
        const cell = document.getElementById(x+","+y);
        if (square.top)    { cell.style.borderTop    =  "5px solid #FF0000" }
        if (square.right)  { cell.style.borderRight  =  "5px solid #FF0000" }
        if (square.bottom) { cell.style.borderBottom =  "5px solid #FF0000" }
        if (square.left)   { cell.style.borderLeft   =  "5px solid #FF0000" }
        cell.style.backgroundColor = tetromino.colour;
        // cell.style.backgroundColor = colours[i];
    });
}



let resultNum = 0;
document.addEventListener('keydown', (event) => {
    if      (event.key === 'ArrowRight' && resultNum < crossNumberCombinations.length-1 )  { resultNum += 1 } 
    else if (event.key === 'ArrowLeft'  && resultNum > 0)  { resultNum -= 1 }
});

document.getElementById("collape-borders").addEventListener("change", function() {
    table.classList.toggle('collapse-borders');
    let elements = table.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('collapse-borders');
    }
});