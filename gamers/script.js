const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 30,
    width: 40,
    height: 20,
    color: '#282d38',
    speed: 15
};

const obstacles = [];
const obstacleSpeed = 4;
const obstacleFrequency = 1200; 

let score = 0;
let gameRunning = false;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    for (const obstacle of obstacles) {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function movePlayer(direction) {
    if (direction === 'left' && player.x - player.speed > 0) {
        player.x -= player.speed;
    } else if (direction === 'right' && player.x + player.width + player.speed < canvas.width) {
        player.x += player.speed;
    }
}

function spawnObstacle() {
    const obstacleWidth = Math.floor(Math.random() * 70) + 50;
    const obstacleX = Math.floor(Math.random() * (canvas.width - obstacleWidth));
    const obstacle = {
        x: obstacleX,
        y: 0,
        width: obstacleWidth,
        height: 20,
        color: '#e74c3c'
    };
    obstacles.push(obstacle);
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;

     
        if (
            obstacles[i].x < player.x + player.width &&
            obstacles[i].x + obstacles[i].width > player.x &&
            obstacles[i].y < player.y + player.height &&
            obstacles[i].y + obstacles[i].height > player.y
        ) {
            gameOver();
            return;
        }


        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
            i--;
        }
    }
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#fffff';
    ctx.fillText('Score: ' + score, 10, 30);
}

function gameOver() {
    gameRunning = false;
    ctx.font = '30px Arial';
    ctx.fillStyle = '#e74c3c';
    ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    document.getElementById('playAgainButton').style.display = 'block';
}

function playAgain() {
    obstacles.length = 0;
    score = 0;
    gameRunning = true;
    document.getElementById('playAgainButton').style.display = 'none';
    gameLoop();
    setInterval(spawnObstacle, obstacleFrequency);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObstacles();
    updateObstacles();
    drawScore();

    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (e.key === 'ArrowRight') {
        movePlayer('right');
    }
});

startGame();

function startGame() {
    playAgain();
}
