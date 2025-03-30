export const gameState = {
  currentPlayer: 1,
  rowStates: [3, 5, 7],
  currentRow: -1,
  selectedRocks: 0,
};

export function selectRock(rock, rowIndex, rows) {
  if (gameState.currentRow === -1 || gameState.currentRow === rowIndex) {
    rock.classList.toggle("selected");
    updateSelection(rowIndex, rows);
    gameState.currentRow = gameState.selectedRocks === 0 ? -1 : rowIndex;
  } else {
    alert("You can only select rocks from one row at a time.");
  }
}

export function updateSelection(rowIndex, rows) {
  gameState.selectedRocks = rows[rowIndex].filter(rock => rock.classList.contains("selected")).length;
}

export function playTurn(rows, updateUI, checkGameOver, switchPlayer) {
  if (gameState.selectedRocks === 0 || gameState.currentRow === -1) {
    alert("Please select at least one rock before playing your turn.");
    return;
  }

  if (gameState.selectedRocks <= gameState.rowStates[gameState.currentRow]) {
    rows[gameState.currentRow].forEach((rock) => {
      if (rock.classList.contains("selected")) {
        rock.classList.remove("selected");
      }
    });

    gameState.rowStates[gameState.currentRow] -= gameState.selectedRocks;
    updateUI();
    checkGameOver();
    switchPlayer();
  }
}

export function checkGameOver(resetGame, rows, updateUI) {
  if (gameState.rowStates.every(state => state === 0)) {
    setTimeout(() => {
      alert(`Player ${gameState.currentPlayer} loses!`);
      resetGame(rows, updateUI); 
    }, 100);
  }
}


export function switchPlayer(updateUI) {
  gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
  gameState.currentRow = -1;
  gameState.selectedRocks = 0;
  updateUI();
}

export function resetGame(rows, updateUI) {
  gameState.rowStates = [3, 5, 7];
  gameState.selectedRocks = 0;
  gameState.currentRow = -1;
  gameState.currentPlayer = 1; // Reset to Player 1

  // Ensure all rocks are unselected and visible
  rows.forEach(row => row.forEach(rock => {
    rock.classList.remove("selected");
    rock.style.display = "block"; 
  }));

  updateUI(rows); 
}
