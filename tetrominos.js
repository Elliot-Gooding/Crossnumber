//Object for each square in the tetromino
class Square{
    constructor(booleanBorderValues, x, y){
        [this.top, this.right, this.bottom, this.left] = booleanBorderValues;
        //X and Y coordinates of square
        //0, 0 is the top left corner of the tetromino
        this.x = x;
        this.y = y;
    }

    rotate(angle){
        const n = angle/90 //Number of 90 deg rotations (clockwise)
        for (let i = 0; i<n; i++){
            //Rotate by cycling border states by 1
            [this.top, this.right, this.bottom, this.left] = [this.left, this.top, this.right, this.bottom] 
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
            //Performing 90 deg rotation on each square
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
        //Checks if all squares are inside the rectangle     
        const minX = Math.min(...this.squareArr.map( square => square.x)) + offset[0];
        const maxX = Math.max(...this.squareArr.map( square => square.x)) + offset[0];

        const minY = Math.min(...this.squareArr.map( square => square.y)) + offset[1];
        const maxY = Math.max(...this.squareArr.map( square => square.y)) + offset[1];

        if (
            (minX >= 0) && (minY >= 0) &&
            (maxX < nColumns) && (maxY < nRows)
        ) {
            return true;  //Inside rectangle:  VALID
        } else {
            return false; //Outside rectangle: INVALID
        }
    }

    testOverlap(filledSquares, offset) {
        const tetrominoSquares = this.calcFilledSquares(offset)

        //Checking if any squares are already filled
        for (const square of tetrominoSquares) {
            for (const filledSquare of filledSquares){
                if (JSON.stringify(square) === JSON.stringify(filledSquare)){
                    return true; //Overlap: INVALID
                }
            }
        }
        return false; //No overlap: VALID
    }


    testOutsideBorder(offset){
        //Checks if any squares have borders on the outside
        //Note the ! at the start of the return statement
        return !this.squareArr.some(s => {
            const x=s.x + offset[0];
            const y=s.y + offset[1];
            if (
                ( x === 0 && s.left   ) ||
                ( x === nColumns -1 && s.right  ) ||
                ( y === 0 && s.bottom ) ||
                ( y === nRows -1 && s.top    ) 
            ) {
                return true; //Outside border: INVALID
            }
            return false; //Inside border: VALID
        });
    }

    calcFilledSquares(offset){
        //Finds all the squares that are filled by the tetromino
        const rotatedTetromino = this.rotate(offset[2]);
        const squareCoords = rotatedTetromino.squareArr.map( square => {
            return [square.x + offset[0], square.y + offset[1]];
        });
        return squareCoords;
    }
}