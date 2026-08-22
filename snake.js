// Modern Canvas Snake Engine for VibeArcade
function startSnakeGame() {
    const wrapper = document.getElementById('canvasWrapper');
    wrapper.innerHTML = `
        <div style="text-align:center; position:relative; width:100%; max-width:400px;">
            <div style="display:flex; justify-content:space-between; padding:8px; color:#38bdf8; font-weight:bold;">
                <span>Score: <span id="snakeScore">0</span></span>
                <span>High Score: <span id="snakeHighScore">0</span></span>
            </div>
            <canvas id="snakeCanvas" width="360" height="360" style="background:#0f172a; border:2px solid #334155; border-radius:8px; touch-action:none;"></canvas>
            <div style="margin-top:10px; display:flex; justify-content:center; gap:10px;">
                <button id="snakeStartBtn" onclick="initSnake()" style="background:#38bdf8; color:#000; border:none; padding:8px 16px; border-radius:20px; font-weight:bold; cursor:pointer;">Start / Restart</button>
            </div>
        </div>
    `;

    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const grid = 18;
    let count = 0;
    let score = 0;
    let highScore = localStorage.getItem('vibe_snake_high') || 0;
    document.getElementById('snakeHighScore').textContent = highScore;

    let snake = { x: 144, y: 144, dx: grid, dy: 0, cells: [], maxCells: 4 };
    let apple = { x: 288, y: 288 };
    let gameLoopReq;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    window.initSnake = function() {
        cancelAnimationFrame(gameLoopReq);
        snake.x = 144; snake.y = 144;
        snake.cells = []; snake.maxCells = 4;
        snake.dx = grid; snake.dy = 0;
        score = 0;
        document.getElementById('snakeScore').textContent = score;
        apple.x = getRandomInt(0, 20) * grid;
        apple.y = getRandomInt(0, 20) * grid;
        loop();
    };

    function loop() {
        gameLoopReq = requestAnimationFrame(loop);
        if (++count < 6) return; // Controls Game Speed
        count = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.x += snake.dx;
        snake.y += snake.dy;

        // Wall Collision
        if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
            initSnake();
            return;
        }

        snake.cells.unshift({ x: snake.x, y: snake.y });
        if (snake.cells.length > snake.maxCells) snake.cells.pop();

        // Draw Food (Neon Apple)
        ctx.fillStyle = '#a855f7';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#a855f7';
        ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
        ctx.shadowBlur = 0;

        // Draw Snake
        snake.cells.forEach((cell, index) => {
            ctx.fillStyle = index === 0 ? '#38bdf8' : '#0284c7';
            ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

            // Eat Food
            if (cell.x === apple.x && cell.y === apple.y) {
                snake.maxCells++;
                score += 10;
                document.getElementById('snakeScore').textContent = score;
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('vibe_snake_high', highScore);
                    document.getElementById('snakeHighScore').textContent = highScore;
                }
                apple.x = getRandomInt(0, 20) * grid;
                apple.y = getRandomInt(0, 20) * grid;
            }

            // Self Collision
            for (let i = index + 1; i < snake.cells.length; i++) {
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    initSnake();
                }
            }
        });
    }

    // Keyboard Controls
    document.onkeydown = function(e) {
        if (e.key === 'ArrowLeft' && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
        else if (e.key === 'ArrowUp' && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
        else if (e.key === 'ArrowRight' && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
        else if (e.key === 'ArrowDown' && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
    };

    initSnake();
    }
