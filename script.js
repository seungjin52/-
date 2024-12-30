const apple = document.getElementById('apple');
const poop = document.getElementById('poop');
const scoreElement = document.getElementById('score');
let score = 0;
let speed = 2000;

function getRandomPosition() {
  const container = document.getElementById('game-container');
  const x = Math.random() * (container.offsetWidth - 50);
  const y = Math.random() * (container.offsetHeight - 50);
  return { x, y };
}

function showItem(item) {
  const position = getRandomPosition();
  item.style.left = `${position.x}px`;
  item.style.top = `${position.y}px`;
  item.style.display = 'block';
}

function hideItem(item) {
  item.style.display = 'none';
}

function updateScore(value) {
  score += value;
  scoreElement.textContent = score;
}

function gameLoop() {
  const isApple = Math.random() > 0.5;
  const item = isApple ? apple : poop;

  showItem(item);

  const timeout = setTimeout(() => hideItem(item), speed);

  document.addEventListener('keydown', function onKeyPress(e) {
    if (e.code === 'Space') {
      clearTimeout(timeout);
      hideItem(item);

      if (isApple) {
        updateScore(10);
      } else {
        updateScore(-10);
      }

      document.removeEventListener('keydown', onKeyPress);
    }
  });

  speed = Math.max(500, speed - 100); // Increase speed over time
  setTimeout(gameLoop, speed);
}

gameLoop();