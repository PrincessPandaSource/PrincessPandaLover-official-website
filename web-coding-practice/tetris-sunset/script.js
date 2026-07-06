document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const levelDisplay = document.getElementById("level");
  const gameOverText = document.getElementById("gameOverText");
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  let level = 1;
  let lines = 0;
  let interval = 1000;
  let gameRunning = false;
  const colors = [
    '#555a87',
    '#695d8c',
    '#8f709e',
    '#c26989',
    '#eb8d88',
    '#f8b988',
    '#ffd34a'
  ]
  
  // The Tetriminoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ];
  
  const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
  ];
  
  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ];
  
  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ];
  
  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ];
  
  const rLTetromino = [
    [0, 1, width+1, width*2+1],
    [width, width*2, width+1, width+2],
    [0, width, width*2, width*2+1],
    [width*2, width*2+1, width*2+2, width+2]
  ];
  
  const rZTetromino = [
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2]
  ];
  
  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino, rLTetromino, rZTetromino];
  
  let currentPosition = 4;
  let currentRotation = 0;
  
  // Randomly select a tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];
  
  // Draw the tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[random];
    })
  }
  
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = '';
    })
  }
  
  //assign functions to key codes
  function control(e) {
    if (e.keyCode === 37 && timerId) {
      moveLeft();
    } else if (e.keyCode === 38 && timerId) {
      rotate();
    } else if (e.keyCode === 39 && timerId) {
      moveRight();
    } else if (e.keyCode == 40 && timerId) {
      moveDown();
    }
  }
  document.addEventListener('keydown', control);
  
  // move down function
  function moveDown() {
    if(!current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      undraw();
      currentPosition += width;
      draw();
    } else {
      freeze();
    }
  }
  
  // freeze function
  function freeze() {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'));
    //start a new tetromino falling
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
    addScore();
    gameOver();
  }
  
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    
    if (!isAtLeftEdge) currentPosition -= 1;
    
    if (current.some(index =>squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    
    draw();
  }
  
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    
    if (!isAtRightEdge) currentPosition += 1;
    
    if (current.some(index =>squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    
    draw();
  }
  
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }
  
  // Show up-next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  let displayIndex = 0;
  
  // The tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], // lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], // tTetromino
    [0, 1, displayWidth, displayWidth+1], // oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], // iTetromino
    [0, 1, displayWidth+1, displayWidth*2+1], // rLTetromino
    [displayWidth, displayWidth+1, displayWidth*2+1, displayWidth*2+2] // rZTetromino
  ];
  
  // Display shape in mini-grid display
  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('tetromino');
      square.style.backgroundColor = '';
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino');
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
    })
  }
  
  // Add functionality to button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      startBtn.innerText = "Resume";
      clearInterval(timerId);
      timerId = null;
    } else {
      startBtn.innerText = "Pause";
      draw();
      timerId = setInterval(moveDown, interval);
      if (!gameRunning) {
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayShape();
      }
    }
    if (!gameRunning) {
      gameRunning = true;
      startBtn.innerText = "Pause";
    }
  });
  
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
      
      if (row.every(index => squares[index].classList.contains('taken'))) {
        lines += 1;
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach(index => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundColor = '';
        })
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell));
        
        if (lines === (level * 10)) {
          level += 1;
          lines = 0;
          interval = 1000 - level * 0.5;
          timerId = setInterval(moveDown, interval);
        }
      }
    }
  }
  
  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      gameOverText.innerText = "Game over!";
      startBtn.style.display = "none";
      gameRunning = false;
      clearInterval(timerId);
      timerId = null;
    }
  }
})