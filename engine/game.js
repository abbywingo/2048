export default class Game {
    constructor(x) {
        // calculates area of the board
        this.size = x;
        this.area = x * x;

        // sets up a gameState object
        this.gameState = {
            board: [],
            score: 0,
            won: false,
            over: false
        };

        // list callbacks
        this.mover = [];
        this.winner = [];
        this.loser = [];

        // starts a new game
        this.setupNewGame();
    }

    setupNewGame() {

        // sets up gameState object with board
        this.gameState = {
            board: new Array(this.area).fill(0),
            score: 0,
            won: false,
            over: false
        };

        // adds two random tiles
        addRandom(this.gameState.board);
        addRandom(this.gameState.board);
    }

    loadGame(gameState) {
        // loads gameState object
        this.gameState = gameState;
    }

    move(direction) {
        // shifts tiles & adds random tile
        // console.log("STARTING MOVE")

        let a = new Array(this.area).fill(0);
        let b = this.gameState.board;
        let c = [...this.gameState.board];

        if (direction == "left") {
            // console.log("LEFT KEY PRESS START");
            // loop through each row
            // console.log("adding")
            for (let i = 0; i < this.size; i++) {
                // loop through each tile in row
                let j = i * this.size;
                for (let c = 0; c < this.size; c++) {
                    // if tile and tile to the right are the same number
                    // and have not already been altered, add them together
                    for (let k = j + 1; k < this.size * (i + 1); k++) {
                        if (b[j] != b[k] && b[k] != 0) {
                            break;
                        }
                        if (b[j] == b[k] && a[j] != 1 && a[k] != 1 && b[j] != 0) {
                            // left tile becomes left+right
                            b[j] = b[j] + b[k];
                            // right tile becomes 0
                            b[k] = 0;
                            // mark these were altered
                            a[j] = 1;
                            a[k] = 1;
                            // update score
                            this.gameState.score += b[j];
                            // check if game has been won
                            if (b[j] == 2048) {
                                this.gameState.won = true;
                            }
                            break;
                        }
                    }
                    j++;
                }
            }
            // console.log("shifting")
            // after adding tiles together, need to shift all of them left
            // starting at top left corner
            for (let i = 0; i < this.size; i++) {
                let j = i * this.size;
                while (j < (i * this.size) + (this.size - 1)) {
                    // if tile = 0, remove it & add it to the end of the row
                    if (b[j] == 0) {
                        for (let k = j + 1; k < i * this.size + (this.size); k++) {
                            if (b[k] != 0) {
                                let temp = b[j];
                                b[j] = b[k];
                                b[k] = temp;
                                break;
                            }
                        }
                    }
                    j++;
                }
            }
            // console.log("LEFT KEY PRESS FINISH");
        }

        if (direction == "right") {
            // loop through each row starting at bottom right corner
            // console.log("RIGHT KEY PRESS START")
            // console.log("adding")
            for (let i = 0; i < this.size; i++) {
                // loop through each tile in row
                let j = this.area - 1 - (this.size * i)
                for (let c = 0; c < this.size - 1; c++) {
                    // if tile and tile to the right are the same number
                    // and have not already been altered, add them together
                    for (let k = j - 1; k >= this.area - 1 - (this.size * i) - (this.size - 1); k--) {
                        if (b[j] != b[k] && b[k] != 0) {
                            break;
                        }
                        if (b[j] == b[k] && a[j] != 1 && a[k] != 1 && b[j] != 0) {
                            // right tile becomes left+right
                            b[j] = b[j] + b[k];
                            // left tile becomes 0
                            b[k] = 0;
                            // mark these were altered
                            a[j] = 1;
                            a[k] = 1;
                            // update score
                            this.gameState.score += b[j];
                            // check if game has been won
                            if (b[j] == 2048) {
                                this.gameState.won = true;
                            }
                            break;
                        }
                    }
                    j--;
                }
            }
            // after adding tiles together, need to shift all of them right
            // starting at bottom right corner
            // console.log("shifting")
            for (let i = 0; i < this.size; i++) {
                let j = i * this.size + (this.size - 1);
                while (j > (i * this.size) ) {
                    // if tile = 0, remove it & add it to the end of the row
                    if (b[j] == 0) {
                        for (let k = j - 1; k >= i * this.size ; k--) {
                            if (b[k] != 0) {
                                let temp = b[j];
                                b[j] = b[k];
                                b[k] = temp;
                                break;
                            }
                        }
                    }
                    j--;
                }
            }
            // console.log("RIGHT KEY PRESS FINISH")
        }

        if (direction == "up") {
            // loop through each column
            // console.log("UP KEY PRESS START")
            // console.log("adding")
            for (let i = 0; i < this.size; i++) {
                // console.log("entering i for loop")
                // loop through each tile in column
                for (let j = i; j < this.area - (this.size - i); j += this.size) {
                    // console.log("entering j for loop: j = " + j)

                    // if tile and tile above are the same number
                    // and have not already been altered, add them together
                    if (b[j] != 0) {
                        for (let k = j + this.size; k <= this.area - (this.size - i); k += this.size) {
                            // console.log("entering k for loop")
                            if (b[j] != b[k] && b[k] != 0) {
                                break;
                            }
                            if (b[j] == b[k] && a[j] != 1 && a[k] != 1 && b[j] != 0) {
                                // above tile becomes above + below
                                b[j] = b[j] + b[k];
                                // below tile becomes 0
                                b[k] = 0;
                                // mark these were altered
                                a[j] = 1;
                                a[k] = 1;
                                // update score
                                this.gameState.score += b[j];
                                // check if game has been won
                                if (b[j] == 2048) {
                                    this.gameState.won = true;
                                }
                                break;
                            }
                            // console.log("exiting k for loop")
                        } 
                        // console.log("exiting j for loop")
                    }
                }
                // console.log("exiting i for loop")
            }
            // after adding tiles together, need to shift all of them up
            // starting at top left corner
            // console.log("shifting")
            for (let i = 0; i < this.size; i++) {
                let j = i;
                while (j <= this.area - (this.size - i)) {
                    // if tile = 0, remove it & add it to the end of the row
                    if (b[j] == 0) {
                        for (let k = j + this.size; k <= this.area - (this.size - i); k+=this.size) {
                            if (b[k] != 0) {
                                b[j] = b[k];
                                b[k] = 0;
                                break;
                            }
                        }
                    }
                    j+=this.size;
                }
            }
            // console.log("UP KEY PRESS FINSIH")
        }
        if (direction == "down") {
            // loop through each column
            // console.log("DOWN KEY PRESS START")
            // console.log("adding")
            for (let i = 0; i < this.size; i++) {
                // loop through each tile in column
                for (let j = this.area - 1 - i; j >= 0; j -= this.size) {
                    // if tile and tile below are the same number
                    // and have not already been altered, add them together
                    for (let k = j - this.size; k >= 0; k-= this.size) {
                        if (b[j] != b[k] && b[k] != 0) {
                            break;
                        }
                        if (b[j] == b[k] && a[j] != 1 && a[k] != 1) {
                            // below tile becomes above + below
                            b[j] = b[j] + b[k];
                            // above tile becomes 0
                            b[k] = 0;
                            // mark these were altered
                            a[j] = 1;
                            a[k] = 1;
                            // update score
                            this.gameState.score += b[j];
                            // check if game has been won
                            if (b[j] == 2048) {
                                this.gameState.won = true;
                            }
                            break;
                        }
                    }
                }
            }
            // after adding tiles together, need to shift all of them down
            // starting at bottom left corner
            // console.log("shifting")
            for (let i = 0; i < this.size; i++) {
                // loop through each tile in column
                for (let j = this.area - 1 - (this.size - i - 1); j >= 0; j -= this.size) {
                    // if tile = 0, find next tile in column that is not 0 and switch them
                    if (b[j] == 0) {
                        for (let k = j - this.size; k >= 0; k -= this.size) {
                            if (b[k] != 0) {
                                let temp = b[j];
                                b[j] = b[k];
                                b[k] = temp;
                                break;
                            }
                        }

                    }
                }
            }
            // console.log("DOWN KEY PRESS FINISH")
        }

        this.gameState.board = b;

        // loop through move callback function if move was made
        // add random tile if moves were made 
        // console.log("COMPARING ARRAYS")
        if (!compareArrays(b, c)) {
            addRandom(this.gameState.board);
            for (let i = 0; i < this.mover.length; i++) {
                this.mover.forEach(x => x(this.gameState));
            }
        }

        // console.log("CHECKING IF WON")
        // loop through won callback function if won if true
        if (this.gameState.won) {
            for (let i = 0; i < this.winner.length; i++) {
                this.winner.forEach(x => x(this.gameState));
            }
            // console.log("game won")
        }

        if (!this.gameState.board.includes(0)) {
            this.gameState.over = this.checkOver();
        }

        // console.log("CHECKING IF OVER")
        // loop through lose callback function if over is true
        if (this.gameState.over) {
            for (let i = 0; i < this.loser.length; i++) {
                this.loser.forEach(x => x(this.gameState));
            }
            // console.log("game over")
        }
    }

    checkOver() {
        let b = this.gameState.board;
        // loop through each tile on board
        for (let i = 0; i < this.size; i++) {
            console.log("i loop: i = " + i)
            for (let j = 0; j < this.size; j++) {
                let x = (i*this.size)+j
                console.log("j loop: x = " + x)
                // check right
                if (x+1 <= this.area && j < this.size - 1) {
                    if (b[x] == b[x+1]) {
                        console.log("x same as x + 1")
                        return false;
                    }
                }
                // check left
                if (x-1 >= 0 && j != 0) {
                    if (b[x] == b[x-1]) {
                        console.log("x same as x - 1")
                        return false
                    }
                }
                // check down
                if (x+this.size <= this.area) {
                    if (b[x] == b[x + this.size]) {
                        console.log("x same as x + this.size")
                        return false;
                    }
                }
                // check up
                if (x-this.size >= 0) {
                    if (b[x] == b[x - this.size]) {
                        console.log("x same as x - this.size")
                        return false;
                    }
                }
            }
        }
        return true;
    }

    toString() {
        // returns string representation of gameState
        let b = this.gameState.board;
        console.log(b[0], b[1], b[2], b[3]);
        console.log(b[4], b[5], b[6], b[7]);
        console.log(b[8], b[9], b[10], b[11]);
        console.log(b[12], b[13], b[14], b[15]);
    }

    returnToString() {
        let b = this.gameState.board;
        return b.toString();
    }

    onMove(callback) {
        // registers function as listener to move event
        // every move, game should call all previously registered move
        // callbacks, passing in the game's current gameState as an
        // argument to the function
        this.mover.push(callback);
    }

    onWin(callback) {
        // registers function as a listener to win event
        // when player wins, game should call all previously registered
        // win callbacks, passing in the game's current gameState as
        // an argument to the function
        this.winner.push(callback);
    }

    onLose(callback) {
        // registers function as a listener to the move event
        // when no more valid moves can be made, game should call all
        // previously registered lose callbacks, passing in the game's
        // current gameState as an argument to the function
        this.loser.push(callback);
    }

    getGameState() {
        // returns current gameState object
        return this.gameState;
    }
}

export function addRandom(board) {
    // console.log("STARTING ADD RANDOM TILE")
    let tile;
    let prob = Math.random();
    if (prob < 0.9) {
        tile = 2;
    } else {
        tile = 4;
    }

    let added = false;

    // if (!board.includes(0)) {
    //     this.gameState.over = true;
    //     return board;
    // }

    while (!added) {
        let random_position = Math.floor(Math.random() * board.length);
        if (board[random_position] == 0) {
            board[random_position] = tile;
            added = true;
        }
    }

    // console.log("ENDING ADD RANDOM TILE")
    return board;
}

export function compareArrays(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}



