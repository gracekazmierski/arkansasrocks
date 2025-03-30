import { selectRock, playTurn, checkGameOver, switchPlayer, resetGame, gameState } from "./game.js";
import { updateUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const rows = [
    Array.from(document.querySelectorAll("#row1 .rock")),
    Array.from(document.querySelectorAll("#row2 .rock")),
    Array.from(document.querySelectorAll("#row3 .rock")),
  ];

  document.querySelectorAll(".row").forEach((row, rowIndex) => {
    row.addEventListener("click", (e) => {
      if (e.target.classList.contains("rock")) {
        selectRock(e.target, rowIndex, rows);
        updateUI(rows); // Ensure UI updates on selection
      }
    });
  });

  document.getElementById("playButton").addEventListener("click", () => {
    playTurn(rows, () => updateUI(rows), () => checkGameOver(() => resetGame(rows, updateUI)), () => switchPlayer(() => updateUI(rows)));
  });

  document.getElementById("resetButton").addEventListener("click", () => resetGame(rows, updateUI));

    function checkGameOverAndReset() {
    checkGameOver(resetGame, rows, updateUI);
    }

  updateUI(rows); // Initial UI update
});
