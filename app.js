let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let gameOver = false;
let clickedCount = 0;
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (gameOver) return;

    clickedCount++;
    if(turnO) {
      box.innerText = 'O';
      box.style.color = '#dd2d4a';
      turnO = false;
    }
    else {
      box.innerText = 'X';
      box.style.color = '#f26a8d';
      turnO = true;
    }
    box.disabled = true;
    checkWinner();

    if(!gameOver && clickedCount === 9) {
      msg.innerText = "Oops! It's a draw!";
      msgContainer.classList.remove('hide');
      gameOver = true;
    }
  })
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0],pattern[1],pattern[2]);
    // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner is ",pos1Val);
        showWinner(pos1Val);
        return;
      }
    }
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = '';
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations, ${winner} won!`;
  msgContainer.classList.remove('hide');
  gameOver = true;
  disableBoxes();
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  clickedCount = 0;
  gameOver = false;
  msgContainer.classList.add('hide');
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);