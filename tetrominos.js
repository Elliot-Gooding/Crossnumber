//Object for each 
class Square{
    constructor(booleanBorderValues, x, y){
        [this.top, this.right, this.bottom, this.left] = booleanBorderValues;
        this.x = x;
        this.y = y;
    }

    rotate(angle){
        const n = angle/90 //Number of 90 deg rotations (clockwise)
        for (let i = 0; i<n; i++){
            [this.top, this.right, this.bottom, this.left] = [this.left, this.top, this.right, this.bottom] //Cycle border states by 1
        }
    }
}

class Tetromino{
    constructor(squareArr, colour){
        this.squareArr = squareArr;
        this.colour = colour;
    }

    rotate(angle){
        const n = angle/90 //Number of 90 deg rotations (clockwise)
        let squareArr = _.cloneDeep(this.squareArr); //Preventing the mutation of original tetromino

        for (let i = 0; i<n; i++){
            squareArr = squareArr.map( square => {
                const x = square.x;
                const y = square.y;
                square.x = y;
                square.y = -x;
                square.rotate(90);
                return square;
            });
        }
        return new Tetromino(squareArr, this.colour);
    }

    testInsideRect(offset){        
        const minX = Math.min(...this.squareArr.map( square => square.x)) + offset[0];
        const maxX = Math.max(...this.squareArr.map( square => square.x)) + offset[0];

        const minY = Math.min(...this.squareArr.map( square => square.y)) + offset[1];
        const maxY = Math.max(...this.squareArr.map( square => square.y)) + offset[1];

        if (
            (minX >= 0) && (minY >= 0) &&
            (maxX < nColumns) && (maxY < nRows)
        ) {
            return true;
        } else {
            return false;
        }
    }

testOverlap(squares2, offset) {
    let squareArr = this.rotate(this).squareArr;
    const squares1 = this.calcFilledSquares(offset)

    for (const square of squares1) {
        for (const filledSquare of squares2){
            if (JSON.stringify(square) === JSON.stringify(filledSquare)){
                return true;
            }
        }
    }
    return false;
}


    testOutsideBorder(offset){
        return !this.squareArr.some((s, i) => {
            const x=s.x + offset[0];
            const y=s.y + offset[1];
            if (
                ( x === 0 && s.left   ) ||
                ( x === nColumns -1 && s.right  ) ||
                ( y === 0 && s.bottom ) ||
                ( y === nRows -1 && s.top    ) 
            ) {
                return true;
            }
            return false;
        });
    }

    calcFilledSquares(offset){
        const rotatedTetromino = this.rotate(offset[2]);
        const squareCoords = rotatedTetromino.squareArr.map( square => {
            return [square.x + offset[0], square.y + offset[1]];
        });
        return squareCoords;
    }
}