//Creating tetromino objects from ritangle clues
const t1s1 = new Square([
    false, false, false, true
], 0, 0);
const t1s2 = new Square([
    true, true, false, false
], 1, 0);
const t1s3 = new Square([
    false, false, true, true
], 2, 0);
const t1s4 = new Square([
    false, true, false, false
], 0, -1);
const t1 = new Tetromino([t1s1, t1s2, t1s3, t1s4], "green");


const t2s1 = new Square([
    true, false, false, false
], 0, 0);
const t2s2 = new Square([
    false, false, false, false
], 1, 0);
const t2s3 = new Square([
    false, false, false, false
], 0, -1);
const t2s4 = new Square([
    false, false, false, false
], 1, -1);
const t2 = new Tetromino([t2s1, t2s2, t2s3, t2s4], "brown");


const t3s1 = new Square([
    false, true, false, false
], 0, 0);
const t3s2 = new Square([
    false, false, false, true
], 1, 0);
const t3s3 = new Square([
    false, true, false, false
], 1, -1);
const t3s4 = new Square([
    false, false, false, true
], 2, -1);
const t3 = new Tetromino([t3s1, t3s2, t3s3, t3s4], "orange");


const t4s1 = new Square([
    false, false, false, true
], 0, 0);
const t4s2 = new Square([
    true, false, false, false
], 1, 0);
const t4s3 = new Square([
    false, false, false, false
], 2, 0);
const t4s4 = new Square([
    false, true, false, false
], 3, 0);
const t4 = new Tetromino([t4s1, t4s2, t4s3, t4s4], "blue");


const t5s1 = new Square([
    true, false, false, false
], 0, 0);
const t5s2 = new Square([
    false, false, false, false
], 1, 0);
const t5s3 = new Square([
    false, true, false, false
], 2, 0);
const t5s4 = new Square([
    false, false, false, true
], 3, 0);
const t5 = new Tetromino([t5s1, t5s2, t5s3, t5s4], "yellow");


const t6s1 = new Square([
    false, false, false, false
], 0, 0);
const t6s2 = new Square([
    false, false, false, false
], 1, 0);
const t6s3 = new Square([
    false, false, true, false
], 2, 0);
const t6s4 = new Square([
    false, false, false, false
], 0, -1);
const t6 = new Tetromino([t6s1, t6s2, t6s3, t6s4], "purple");



const tetrominos = [t1, t2, t3, t4, t5, t6];