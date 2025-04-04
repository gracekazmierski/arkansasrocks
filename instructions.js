import {
    selectRock,
    updateSelection,
    gameState,
    checkGameOver,
    resetGame
  } from './game.js';
  
  const slides = [
    `<strong>Welcome to Arkansas Rocks!</strong><br><br>
     This is a 2-player strategy game. The game involves 15 rocks arranged in 3 rows:<br>
     • The top row has 3 rocks.<br>
     • The middle row has 5 rocks.<br>
     • The bottom row has 7 rocks.<br><br>
     Your goal is to avoid being the player who picks the last rock.<br><br>
     Go ahead and try selecting some rocks below!<br>
     When you're done, click <strong>Play</strong> to confirm your selection, or <strong>Reset</strong> to start over.`,
  
    `<strong>How to take your turn:</strong><br><br>
     On your turn, you can pick up <strong>as many rocks as you want</strong>, but they must all be from <strong>the same row</strong>.<br><br>
     You <strong>cannot</strong> pick rocks from more than one row at the same time.<br><br>
     Try selecting rocks from <strong>multiple rows</strong> — you'll get an alert saying:<br>
     <em>"You can only select rocks from one row at a time!"</em>`,
  
    `<strong>How to lose the game:</strong><br><br>
     The player who is forced to pick up the <strong>last remaining rock</strong> on the board <strong>loses</strong> the game.<br><br>
     Plan ahead and try to trap your opponent into being the one who has no choice but to take it.<br><br>
     Go ahead and try selecting all of the rocks below. What happens when you take the last rock?`,
  
    `<strong>Ready to start?</strong><br><br>
     Now that you know the rules, let’s see what you’ve got.<br>
     Don’t forget: leave your opponent with no good options.<br>
     Let's get started!<br>
     <button id="start-button">Start Game</button>`
  ];
  
  let currentSlide = 0;
  
  function showSlide(index) {
    const slideText = document.getElementById("slide-text");
    const nextBtn = document.getElementById("next-button");
  
    slideText.innerHTML = slides[index];
  
    if (index === slides.length - 1) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "inline-block";
    }
  }
  
  function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) currentSlide = 0;
    showSlide(currentSlide);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize first slide
    showSlide(currentSlide);
  
    const nextBtn = document.getElementById("next-button");
    if (nextBtn) {
      nextBtn.addEventListener("click", nextSlide);
    }
  
    document.addEventListener("click", (e) => {
      if (e.target && e.target.id === "start-button") {
        window.location.href = "game.html";
      }
    });
  
    // Rock logic
    const rows = [
      Array.from(document.querySelectorAll("#row1 .rock")),
      Array.from(document.querySelectorAll("#row2 .rock")),
      Array.from(document.querySelectorAll("#row3 .rock")),
    ];
  
    document.querySelectorAll(".row").forEach((row, rowIndex) => {
      row.addEventListener("click", (e) => {
        if (e.target.classList.contains("rock")) {
          selectRock(e.target, rowIndex, rows);
          updateSelection(rowIndex, rows);
        }
      });
    });
  
    const playBtn = document.getElementById("mini-play");
    const resetBtn = document.getElementById("mini-reset");
  
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (gameState.selectedRocks === 0 || gameState.currentRow === -1) {
          alert("Please select at least one rock before playing your turn.");
          return;
        }
  
        rows[gameState.currentRow].forEach((rock) => {
          if (rock.classList.contains("selected")) {
            rock.classList.remove("selected");
            rock.style.display = "none";
          }
        });
  
        gameState.rowStates[gameState.currentRow] -= gameState.selectedRocks;
        gameState.selectedRocks = 0;
        gameState.currentRow = -1;
  
        checkGameOver(() => resetGame(rows, () => {}), rows, () => {});
      });
    }
  
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resetGame(rows, () => {});
      });
    }
  });
  