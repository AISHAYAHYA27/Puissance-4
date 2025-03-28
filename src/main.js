
import { Puissance4 } from "/Puissance4.js";
let game = null;
document.getElementById("config-game").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const cols = parseInt(document.getElementById("cols").value);
    const rows = parseInt(document.getElementById("rows").value);
    
    const player1 = {
        name: document.getElementById("player1-name").value || "Joueur 1",
        color: document.getElementById("player1-color").value
    };
    const player2 = {
        name: document.getElementById("player2-name").value || "Joueur 2",
        color: document.getElementById("player2-color").value
    };

  
    document.getElementById("player1-name-display").textContent = player1.name;
    document.getElementById("player2-name-display").textContent = player2.name;

    const updateScore = (winner) => {
        const scoreElement = winner === 0 ? document.getElementById("score1") : document.getElementById("score2");
        scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
    };

    
    new Puissance4("#jeu", rows, cols, player1, player2, updateScore);
});


function updateScore(winnerIndex) {
    if (winnerIndex === 0) {
        scores.player1++;
        document.getElementById("score1").textContent = scores.player1;
    } else if (winnerIndex === 1) {
        scores.player2++;
        document.getElementById("score2").textContent = scores.player2;
    }
}


document.getElementById("restart").addEventListener("click", () => {
    if (game) {
        game.reset();
    }
});

