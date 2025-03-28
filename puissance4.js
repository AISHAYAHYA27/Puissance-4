export class Puissance4 {
    
    constructor(selector, rows, cols, player1, player2, updateScoreCallback) {
        this.COL = cols;
        this.ROW = rows;
        this.selector = selector;
        this.players = [
            { name: player1.name, color: player1.color },
            { name: player2.name, color: player2.color },
        ];
        this.currentPlayer = Math.random() < 0.5 ? 0 : 1;
        this.board = Array.from({ length: this.ROW }, () => Array(this.COL).fill(null));
        this.gameOver = false;
        this.updateScoreCallback = updateScoreCallback;
        this.drawGame();
        this.listen();
        this.replayBtnListener(); 
    }

    drawGame() {
        const jeu = document.querySelector(this.selector);
        jeu.innerHTML = "";

        for (let row = 0; row < this.ROW; row++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            for (let col = 0; col < this.COL; col++) {
                const colDiv = document.createElement("div");
                colDiv.classList.add("col", "empty");
                colDiv.dataset.col = col;
                colDiv.dataset.row = row;

                rowDiv.appendChild(colDiv);
            }
            jeu.appendChild(rowDiv);
        }
    }

    listen() {
        const jeu = document.querySelector(this.selector);
        if (!jeu) return;

        const lastCase = (col) => {
            const cells = document.querySelectorAll(`.col[data-col='${col}']`);
            for (let i = cells.length - 1; i >= 0; i--) {
                if (cells[i].classList.contains("empty")) {
                    return cells[i];
                }
            }
            return null;
        };
       
        jeu.addEventListener("click", (event) => { 
            if (this.gameOver) return;

            if (event.target.classList.contains("empty")) {
                const col = parseInt(event.target.dataset.col);
                const lastEmptyCase = lastCase(col);

                if (lastEmptyCase) {
                    const row = parseInt(lastEmptyCase.dataset.row);
                    this.board[row][col] = this.currentPlayer;

                    lastEmptyCase.classList.remove("empty");
                    lastEmptyCase.style.backgroundColor = this.players[this.currentPlayer].color;

                    if (this.checkWin(row, col)) {
                        this.gameOver = true;

                        setTimeout(() => {
                            const winnerName = this.players[this.currentPlayer].name;
                            const winMessage = `${winnerName} a gagné !`;

                            document.getElementById("win-message").textContent = winMessage;
                            document.getElementById("win-modal").style.display = "block";

                            this.updateScoreCallback(this.currentPlayer);
                        }, 200);
                        return;
                    }

                    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
                }
            }
        });

        document.getElementById("close-modal").addEventListener("click", () => {
            document.getElementById("win-modal").style.display = "none";
        });

        document.getElementById("update-score-btn").addEventListener("click", () => {
            this.updateScoreCallback(this.currentPlayer);
            document.getElementById("win-modal").style.display = "none";
        });
    }

    replayBtnListener() {
        const replayButton = document.getElementById("restart");
        if (replayButton) {
            replayButton.addEventListener("click", () => {
                this.reset();  
                document.getElementById("win-modal").style.display = "none"; 
            });
        }
    }

    checkWin(row, col) {
        const player = this.board[row][col];

        const directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1],
        ];

        for (let i = 0; i < directions.length; i++) {
            let count = 1;
            let directionRow = directions[i][0];
            let directionCol = directions[i][1];

            count += this.checkDirection(row, col, directionRow, directionCol);
            count += this.checkDirection(row, col, -directionRow, -directionCol);

            if (count >= 4) {
                return true;
            }
        }

        return false;
    }

    checkDirection(row, col, directionRow, directionCol) {
        let count = 0;
        let r = row + directionRow;
        let c = col + directionCol;

        while (r >= 0 && r < this.ROW && c >= 0 && c < this.COL && this.board[r][c] === this.currentPlayer) {
            count++;
            r += directionRow;
            c += directionCol;
        }

        return count;
    }

    reset() {
        this.board = Array.from({ length: this.ROW }, () => Array(this.COL).fill(null));
        this.gameOver = false;
        this.currentPlayer = Math.random() < 0.5 ? 0 : 1;
        this.drawGame();
        this.listen();
    }
}