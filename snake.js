// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * 39 + 1) * 10, y: Math.floor(Math.random() * 39 + 1) * 10 };
let direction = "right";
let score = 0;
let interval;

// Set up the game loop
function gameLoop() {
  // Move the snake
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y -= 10;
      break;
    case "down":
      head.y += 10;
      break;
    case "left":
      head.x -= 10;
      break;
    case "right":
      head.x += 10;
      break;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    // The snake ate the food, so generate a new food
    food = { x: Math.floor(Math.random() * 39 + 1) * 10, y: Math.floor(Math.random() * 39 + 1) * 10 };
    score++;
  } else {
    // Remove the tail of the snake
    snake.pop();
  }

  // Check for game over
  if (head.x < 0 || head.x > 390 || head.y < 0 || head.y > 390) {
    clearInterval(interval);
    alert("Game Over! Your score is " + score);
    return;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      clearInterval(interval);
      alert("Game Over! Your score is " + score);
      return;
    }
  }

  // Draw the game board
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.fillStyle = "#000000";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  ctx.fillStyle = "#0000ff";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// Set up the keyboard input
document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
});

// Start the game loop
interval = setInterval(gameLoop, 100);
