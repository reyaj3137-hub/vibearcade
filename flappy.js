// Flappy Bird Engine for VibeArcade
function startFlappyGame() {
    const wrapper = document.getElementById('canvasWrapper');
    wrapper.innerHTML = `
        <div style="text-align:center; position:relative; width:100%; max-width:360px;">
            <div style="display:flex; justify-content:space-between; padding:8px; color:#38bdf8; font-weight:bold;">
                <span>Score: <span id="flappyScore">0</span></span>
                <span>High: <span id="flappyHighScore">0</span></span>
            </div>
            <canvas id="flappyCanvas" width="320" height="380" style="background:#0f172a; border:2px solid #334155; border-radius:8px; touch-action:none;"></canvas>
            <div style="margin-top:10px;">
                <button onclick="initFlappy()" style="background:#38bdf8; color:#000; border:none; padding:8px 16px; border-radius:20px; font-weight:bold; cursor:pointer;">Restart / Tap Screen to Jump</button>
            </div>
        </div>
    `;

    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    let bird = { x: 50, y: 150, velocity: 0, gravity: 0.35, jump: -6.5, radius: 10 };
    let pipes = [];
    let score = 0;
    let highScore = localStorage.getItem('vibe_flappy_high') || 0;
    document.getElementById('flappyHighScore').textContent = highScore;
    let frame = 0;
    let gameReq;

    window.initFlappy = function() {
        cancelAnimationFrame(gameReq);
        bird.y = 150; bird.velocity = 0;
        pipes = []; score = 0; frame = 0;
        document.getElementById('flappyScore').textContent = score;
        loopFlappy();
    };

    function jump() {
        bird.velocity = bird.jump;
    }

    canvas.onclick = jump;
    document.onkeydown = function(e) { if(e.code === 'Space' || e.key === 'ArrowUp') jump(); };

    function loopFlappy() {
        gameReq = requestAnimationFrame(loopFlappy);
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Draw Bird
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fill();

        // Floor/Ceiling Collision
        if (bird.y + bird.radius >= canvas.height || bird.y - bird.radius <= 0) {
            initFlappy();
            return;
        }

        // Pipe Generation
        if (frame % 90 === 0) {
            let gap = 120;
            let topHeight = Math.floor(Math.random() * (canvas.height - gap - 60)) + 30;
            pipes.push({ x: canvas.width, top: topHeight, bottom: canvas.height - topHeight - gap, passed: false });
        }

        // Pipe Draw & Logic
        for (let i = 0; i < pipes.length; i++) {
            let p = pipes[i];
            p.x -= 2;

            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(p.x, 0, 38, p.top);
            ctx.fillRect(p.x, canvas.height - p.bottom, 38, p.bottom);

            // Collision Check
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + 38) {
                if (bird.y - bird.radius < p.top || bird.y + bird.radius > canvas.height - p.bottom) {
                    initFlappy();
                    return;
                }
            }

            // Score Increment
            if (p.x + 38 < bird.x && !p.passed) {
                p.passed = true;
                score++;
                document.getElementById('flappyScore').textContent = score;
                if(score > highScore) {
                    highScore = score;
                    localStorage.setItem('vibe_flappy_high', highScore);
                    document.getElementById('flappyHighScore').textContent = highScore;
                }
            }
        }

        if (pipes.length > 0 && pipes[0].x < -40) pipes.shift();
    }

    initFlappy();
                }
