function init(player){
    let cells = document.querySelectorAll(".cell");
    let statusText = document.querySelector("#statusText");
    let restartBtn = document.querySelector("#restartBtn");
    let options;
    player.computer=(player.man == "X") ? "O" : "X";
    const Yomna = player.man;
    const computer = player.computer;
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    startGame()
    function startGame() {
        options = Array.from(Array(9).keys()); //[x23456789]
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = "";
            cells[i].addEventListener('click', turnClick, false);
        }
        restartBtn.addEventListener("click",restartGame)
    }
    
    function turnClick(square) {
        if (typeof options[square.target.id] == "number") {
            turn(square.target.id, Yomna)
            if (!checkWin(options, Yomna) && !checkTie()) turn(bestPlace(), computer);
        }
    }
    function turn(squareId, player) {
        options[squareId] = player;
        document.getElementById(squareId).innerText = player;
        let gameWon = checkWin(options, player)
        if (gameWon) gameOver()
    }
    
    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) =>//[0]
            (e === player) ? a.concat(i) : a, []);
            
        let gameWon = null;
        for (let [index, win] of winConditions.entries()) {  //win=[0,1,2]
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = { index: index, player: player };
                break;
            }
        }
        
        return gameWon;
    }
    
    function gameOver() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner();
    }
    
    function declareWinner() {
        let roundWon = false;
        let cellA
        for(let i = 0; i < winConditions.length; i++){
            let condition = winConditions[i];//[0,1,2]
            cellA = options[condition[0]];//[o2345678]
            let cellB = options[condition[1]];
            let cellC = options[condition[2]];
        
                if(typeof cellA == "number" || typeof cellB == "number" ||typeof cellC == "number"){
                    continue;
                }
                if(cellA == cellB && cellB == cellC){
                    roundWon = true;
                    break;
                }
            }
        
            if(roundWon){
                
                statusText.textContent = `${cellA} wins!`;
                
            }
            else if(!options.includes(/\d/ig)){ 
                statusText.textContent = `Draw!`;
                
            }
        
    }
    
    function emptySquares() {
        return options.filter(s => typeof s == 'number');
    }
    
    function bestPlace() {
        return minimax(options, computer).index;
    }
    
    function checkTie() {
        if (emptySquares().length == 0) {
            for (let i = 0; i < cells.length; i++) {
                
                cells[i].removeEventListener('click', turnClick, false);
            }
            declareWinner()
            return true;
        }
        return false;
    }
    
    function minimax(newBoard, player) {
        let availablePlace = emptySquares();
        
        if (checkWin(newBoard, Yomna)) {
            return { score: -10 };
        } else if (checkWin(newBoard, computer)) {
            return { score: 10 };
        } else if (availablePlace.length === 0) {
            return { score: 0 };
        }
        let moves = [];
        for (let i = 0; i < availablePlace.length; i++) { //move={index:2,score:10}
            let move = {};
            move.index = newBoard[availablePlace[i]];
            newBoard[availablePlace[i]] = player;
    
            if (player == computer) {
                let result = minimax(newBoard, Yomna);
                move.score = result.score;
            } else {
                let result = minimax(newBoard, computer);
                move.score = result.score;
            }
            newBoard[availablePlace[i]] = move.index;
            moves.push(move);
            
        }
        //moves=[{1,10}.{2,-10}]
        let bestMove;
        if (player === computer) {
            let bestScore = -1000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
            
        } else {
            let bestScore = 1000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
            console.log(bestMove);
        }
        
        return moves[bestMove];
    }
    function restartGame(){
        startGame()
        statusText.textContent = "";
    }
    
}
