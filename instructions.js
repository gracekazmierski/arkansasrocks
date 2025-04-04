const slides = [
    `<strong>Welcome to Arkansas Rocks!</strong><br><br>
     This is a 2-player strategy game. The game involves 15 rocks arranged in 3 rows:<br>
     • The top row has 3 rocks.<br>
     • The middle row has 5 rocks.<br>
     • The bottom row has 7 rocks.<br><br>
     Your goal is to avoid being the player who picks the last rock.`,
  
    `<strong>How to take your turn:</strong><br><br>
     On your turn, you can pick up <strong>as many rocks as you want</strong>, but they must all be from <strong>the same row</strong>.<br><br>
     You <strong>cannot</strong> pick rocks from more than one row at the same time.`,
  
    `<strong>How to lose the game:</strong><br><br>
     The player who is forced to pick up the <strong>last remaining rock</strong> on the board <strong>loses</strong> the game.<br><br>
     Plan ahead and try to trap your opponent into being the one who has no choice but to take it.`,
  
    `<strong>Ready to start?</strong><br><br>
     Now that you know the rules, let’s see what you’ve got.<br>
     Don’t forget: leave your opponent with no good options.<br>
     Let's get started!<br>
     <button onclick="startGame()">Start Game</button>`
  ];
  
  let currentSlide = 0;
  
  function showSlide(index) {
    const slideText = document.getElementById("slide-text");
    slideText.innerHTML = slides[index];
  }
  
  function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) currentSlide = 0; 
    showSlide(currentSlide);
  }
  
  showSlide(currentSlide); 
  