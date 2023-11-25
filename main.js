//Finds offsets of a tetromino where its inside the rectangle and no borders are on the outside
function findCombinations(tetromino){
    const combinations = [];
    for (let r = 0; r < 4; r++){
        const newTetromino = tetromino.rotate(r*90)
        for (let x = 0; x<nColumns; x++){
            for (let y = 0; y<nRows; y++){
                offset = [x,y];
                if(newTetromino.testInsideRect(offset) && newTetromino.testOutsideBorder(offset)){
                    combinations.push([x,y,r*90]);
                }
            }
        }
    }
    return combinations;
}

//
// Finding all independently valid tetromino offsets
//
const t1Combs = findCombinations(t1);
const t2Combs = findCombinations(t2);
const t3Combs = findCombinations(t3);
const t4Combs = findCombinations(t4);
const t5Combs = findCombinations(t5);
const t6Combs = findCombinations(t6);

allCombs = [t1Combs, t2Combs, t3Combs, t4Combs, t5Combs, t6Combs]
console.log("found combinations")




//
// Finding valid combinations of tetromino offsets
//

crossNumberCombinations = []
function checkCombinations(count, filledSquares, path){
    const limit = 6;
    if (count < limit){
        const t = tetrominos[count]
        allCombs[count].forEach( combination => {
            if (!t.testOverlap(filledSquares, combination)){
                const newPath = [...path];
                const newFilledSquares = filledSquares.concat(t.calcFilledSquares(combination));
                newPath.push(combination)
                const newCount = count + 1
                checkCombinations(newCount, newFilledSquares, newPath); //Recursively calling itself in order to check every combination of tetrominos
            }
        });
    } else {
        crossNumberCombinations.push(path);
    }
}
checkCombinations(0, [], []);
console.log("found crossnumbers")

//
// Displaying solutions
//
const loop = function(){
    clearScreen();
    crossNumberCombinations[resultNum].forEach( (offset, i) => {
        displayTetromino(tetrominos[i], offset, false);
        output.innerText = "Result " + (resultNum+1) + " out of " +crossNumberCombinations.length;
    });
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);