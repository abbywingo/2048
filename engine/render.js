import Game from "./game.js"


export const handleResetButtonPress = function(event, game) {
    game.setupNewGame();
    $('.gameBoard').replaceWith(renderX(game));

}

export const renderX = function(game) {
    let board = game.gameState.board;
    let score = game.gameState.score;
    let message = "yo";

    if (game.gameState.won && !game.gameState.over) {
        message = "YOU WON! You hit 2048. Keep playing to get your high score!"
        // const w = document.getElementById('html');
        // w.id = 'xx';
    } else if (game.gameState.over && game.gameState.won) {
        const w = document.getElementById('xx');
        w.id = 'html';
        message = "Game over. You ran out of moves!"
    } else if (game.gameState.over && !game.gameState.won) {
        message = "You lost :( Better luck next time."
    } else {
        message = "Use arrow keys to combine like tiles to reach 2048."
    }

    let t = 
        `<div class="gameBoard">
            <h1 class="${game.gameState.over}" id="won-${game.gameState.won}"> Let's Play 2048! </h1>
            <h2 class="${game.gameState.over}" id="won-${game.gameState.won}"> ${message} </h2>
            <h3 class="${game.gameState.over}" id="won-${game.gameState.won}"> Current Score: ${score} </h1>
            <table rules="all">
                <tr>
                    <td class="a${board[0]}" id="${game.gameState.over}">${board[0]}</td>
                    <td class="a${board[1]}" id="${game.gameState.over}">${board[1]}</td>
                    <td class="a${board[2]}" id="${game.gameState.over}">${board[2]}</td>
                    <td class="a${board[3]}" id="${game.gameState.over}">${board[3]}</td>
                </tr>
                <tr>
                    <td class="a${board[4]}" id="${game.gameState.over}">${board[4]}</td>
                    <td class="a${board[5]}" id="${game.gameState.over}">${board[5]}</td>
                    <td class="a${board[6]}" id="${game.gameState.over}">${board[6]}</td>
                    <td class="a${board[7]}" id="${game.gameState.over}">${board[7]}</td>
                </tr>
                <tr>
                    <td class="a${board[8]}" id="${game.gameState.over}">${board[8]}</td>
                    <td class="a${board[9]}" id="${game.gameState.over}">${board[9]}</td>
                    <td class="a${board[10]}" id="${game.gameState.over}">${board[10]}</td>
                    <td class="a${board[11]}" id="${game.gameState.over}">${board[11]}</td>
                </tr>
                <tr>
                    <td class="a${board[12]}" id="${game.gameState.over}">${board[12]}</td>
                    <td class="a${board[13]}" id="${game.gameState.over}">${board[13]}</td>
                    <td class="a${board[14]}" id="${game.gameState.over}">${board[14]}</td>
                    <td class="a${board[15]}" id="${game.gameState.over}">${board[15]}</td>
                </tr>
            </table>
            <div class="button">
                <button type="reset" class="${game.gameState.over}" id="reset" onclick="handleResetButtonPress(event)">Want to restart?</button>
            </div>
        </div>`
    return t;
}

export const loadBoardIntoDOM = function(game) {
    // alert("loading DOM...")
    const $root = $('#root');
    // alert("found root")
    $root.append(renderX(game));
    $root.on("click", "#reset", (event) => handleResetButtonPress(event, game));
    $(document).keydown(function (e) {
        e.preventDefault();
        if (e.keyCode == 40) {
            game.move('down');
            $('.gameBoard').replaceWith(renderX(game));
        }
        if (e.keyCode == 38) {
            game.move('up');
            $('.gameBoard').replaceWith(renderX(game));
        }
        if (e.keyCode == 37) {
            game.move('left');
            $('.gameBoard').replaceWith(renderX(game));
        }
        if (e.keyCode == 39) {
            game.move('right');
            $('.gameBoard').replaceWith(renderX(game));
        }
    })
}

$(function () {
    let game = new Game(4);

    // setup to win
    // let gameState = {
    //     board: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024, 1024],
    //     score: 200000,
    //     won: false,
    //     over: false
    // };

    // setup to lose
    // let gameState = {
    //     board: [2, 4, 8, 16, 32, 64, 128, 256, 512, 2, 4, 8, 16, 32, 64, 128, 256],
    //     score: 3,
    //     won: false,
    //     over: true
    // }

    // game.loadGame(gameState);
    loadBoardIntoDOM(game);
});

export function handleWon() {
    if (game.gameState.won) {
        const w = document.getElementsByClassName('html')
        w.id = 'xx';
    } else {
        w.id = 'html';
    }
}



