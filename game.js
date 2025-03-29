let rows = [
  document.querySelectorAll("#row1 .rock"),
  document.querySelectorAll("#row2 .rock"),
  document.querySelectorAll("#row3 .rock"),
];

let currentPlayer = 1;
let rowStates = [3, 5, 7];
let currentRow = -1;
let selectedRocks = 0;

function selectRock(rock, rowIndex) {
  if (currentRow === -1 || currentRow === rowIndex) {
    rock.classList.toggle("selected");
    updateSelection(rowIndex);

    if (selectedRocks === 0) {
      currentRow = -1;
    } else {
      currentRow = rowIndex;
    }
  } else if (currentRow !== rowIndex && selectedRocks > 0) {
    alert("You can only select rocks from one row at a time.");
  }
}

function updateSelection(rowIndex) {
  selectedRocks = 0;
  rows[rowIndex].forEach((rock) => {
    if (rock.classList.contains("selected")) {
      selectedRocks++;
    }
  });

  if (selectedRocks === 0) {
    currentRow = -1;
  }
}

function playTurn() {
  if (selectedRocks === 0 || currentRow === -1) {
    alert("Please select at least one rock before playing your turn.");
    return;
  }

  if (selectedRocks <= rowStates[currentRow]) {
    rows[currentRow].forEach((rock) => {
      if (rock.classList.contains("selected")) {
        rock.classList.remove("selected");
      }
    });

    rowStates[currentRow] -= selectedRocks;
    updateUI();
    checkGameOver();
    switchPlayer();
  }
}

function updateUI() {
  for (let i = 0; i < rows.length; i++) {
    rows[i].forEach((rock, index) => {
      if (index < rowStates[i]) {
        rock.style.display = "block";
      } else {
        rock.style.display = "none";
      }
    });

    rows[i].forEach((rock) => {
      if (currentRow !== -1 && i !== currentRow) {
        rock.style.pointerEvents = "none";
      } else {
        rock.style.pointerEvents = "auto";
      }
    });
  }

  const icon1 = document.getElementById("icon1");
  const icon2 = document.getElementById("icon2");

  if (currentPlayer === 1) {
    icon1.style.transform = "translateX(-180px) scale(1.2)"; // 
    icon1.style.opacity = "1";
    icon2.style.transform = "translateX(0) scale(1)"; 
    icon2.style.opacity = "0.5";
  } else {
    icon1.style.transform = "translateX(0) scale(1)";
    icon1.style.opacity = "0.5";
    icon2.style.transform = "translateX(-180px) scale(1.2)";
    icon2.style.opacity = "1";
  }

  document.getElementById("status").innerText = `Player ${currentPlayer}'s Turn`;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentRow = -1;
  selectedRocks = 0;
  updateUI();
}

function checkGameOver() {
  if (rowStates.every((state) => state === 0)) {
    alert(`Player ${currentPlayer} loses!`);
    resetGame();
  }
}

document.querySelectorAll(".row").forEach((row, rowIndex) => {
  row.addEventListener("click", (e) => {
    if (e.target.classList.contains("rock")) {
      selectRock(e.target, rowIndex);
    }
  });
});

function resetGame() {
  switchPlayer();
  rowStates = [3, 5, 7];
  selectedRocks = 0;
  currentRow = -1;

  rows.forEach((row) => {
    row.forEach((rock) => {
      rock.classList.remove("selected");
    });
  });

  updateUI();
}

document.getElementById("playButton").addEventListener("click", playTurn);
document.getElementById("resetButton").addEventListener("click", resetGame);

updateUI();
