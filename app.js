const container = document.querySelector('.container');
const player1 = document.querySelector('.player1Btn');
const player2 = document.querySelector('.player2Btn');
const playerSpan = document.querySelector('.player');

function Gameboard() {
    this.gameboard = Array(3).fill().map(() => Array(3));
    this.currentPlayer;
    this.winnerFound = false;
    this.initializeGameBoard = function() {
        for(let i = 0; i < this.gameboard.length; i++) {
            for(let j = 0; j < this.gameboard.length; j++) {
                const button = document.createElement('button');
                this.gameboard[i][j] = button;
                container.appendChild(button);
                

                button.addEventListener('click', () => this.makeMove(i,j))
            }
        }
    };
    this.makeMove = function(row, col) {
        if(this.winnerFound || this.gameboard[row][col].textContent !== '') {
            return;
        }
        this.gameboard[row][col].textContent = this.currentPlayer
        this.gameboard[row][col].disabled = true
        this.checkForWinner();
        this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X'
    }
    this.checkForWinner = function() {
        for(let i = 0; i < this.gameboard.length; i++) {
            if(this.gameboard[i].every(n => n.textContent === this.currentPlayer) ||
               this.gameboard.every(n => n[i].textContent === this.currentPlayer)) {

                this.winnerFound = true;
                if(this.currentPlayer === 'X') {
                    playerSpan.innerText = 'Player 1'
                    cardPopup();
                } else {
                    playerSpan.innerText = 'Player 2'
                    cardPopup();
                }
                this.disableAllButtons();
               }
        }
        let firstDiagonal = this.gameboard.map((n, i) => n[i].textContent)
        let secondDiagonal = this.gameboard.map((n, i) => n[this.gameboard.length - 1 - i].textContent)

            if(firstDiagonal.every(n => n === this.currentPlayer) || 
                secondDiagonal.every(n => n === this.currentPlayer)) 
            {
                this.winnerFound = true;
                if(this.currentPlayer === 'X') {
                    playerSpan.innerText = 'Player 1'
                    cardPopup();
                } else {
                    playerSpan.innerText = 'Player 2'
                    cardPopup();
                }
                this.disableAllButtons();
            } 
    };
    this.disableAllButtons = function() {
        Array.from(container.childNodes).forEach(item => {
            item.disabled = true;
        })
    };
}

const gameX = new Gameboard();

player1.addEventListener('click', () => {
    gameX.initializeGameBoard();
    gameX.currentPlayer = 'X';
    player1.disabled = true;
    player2.disabled = true;
});
player2.addEventListener('click', () => {
    gameX.initializeGameBoard();
    gameX.currentPlayer = 'O';
    player1.disabled = true;
    player2.disabled = true;
});

function cardPopup() {
    function showPopup() {
        document.getElementById('overlay').style.display = 'flex';
        setTimeout(function () {
            document.getElementById('playerWin').style.top = '35%';
        }, 10);
    }
    showPopup();
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('playerWin').style.top = '-100%';
    location.reload();
}