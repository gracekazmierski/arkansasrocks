import { gameState } from "./game.js";

export function updateUI(rows) {
  for (let i = 0; i < rows.length; i++) {
    rows[i].forEach((rock, index) => {
      rock.style.display = index < gameState.rowStates[i] ? "block" : "none";
      rock.style.pointerEvents = gameState.currentRow !== -1 && i !== gameState.currentRow ? "none" : "auto";
    });
  }

  const icon1 = document.getElementById("icon1");
  const icon2 = document.getElementById("icon2");

  // Get screen width
  const screenWidth = window.innerWidth;

  // Adjust translate amount based on screen size with a max limit
  const baseTranslate = screenWidth <= 1024 ? screenWidth * 0.25 : screenWidth * 0.2;
  const translateAmount = Math.min(baseTranslate, 150);

  if (gameState.currentPlayer === 1) {
    icon1.style.transform = `translateX(${-translateAmount}px) scale(1.2)`;
    icon1.style.opacity = "1";

    icon2.style.transform = `translateX(0) scale(1)`;
    icon2.style.opacity = "0.5";
    document.getElementById("status").style.backgroundColor = "#1b4d8f";

  } else {
    icon1.style.transform = `translateX(0) scale(1)`;
    icon1.style.opacity = "0.5";

    icon2.style.transform = `translateX(${-translateAmount}px) scale(1.2)`;
    icon2.style.opacity = "1";
    document.getElementById("status").style.backgroundColor = "#b60101";
  }

  document.getElementById("status").innerText = `Player ${gameState.currentPlayer}'s Turn`;
}
