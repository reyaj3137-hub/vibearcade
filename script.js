// Global Elements
const gameModal = document.getElementById('gameModal');
const preLoaderScreen = document.getElementById('preLoaderScreen');
const gameFrameScreen = document.getElementById('gameFrameScreen');
const modalGameTitle = document.getElementById('modalGameTitle');
const canvasWrapper = document.getElementById('canvasWrapper');

// Search Filter
function filterGames() {
    const input = document.getElementById('gameSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card:not(.native-ad-card)');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(input) ? 'block' : 'none';
    });
}

// Category Filter
function filterCategory(category) {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event) event.target.classList.add('active');

    const cards = document.querySelectorAll('.game-card:not(.native-ad-card)');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        card.style.display = (category === 'all' || cardCat === category) ? 'block' : 'none';
    });
}

// Preloader & Game Modal Launcher
function openGame(gameKey) {
    gameModal.style.display = 'flex';
    preLoaderScreen.style.display = 'block';
    gameFrameScreen.style.display = 'none';

    const gameTitles = {
        'snake': 'Modern Snake Pro',
        '2048': '2048 Classic',
        'flappy': 'Flappy Bird',
        'tictactoe': 'Tic-Tac-Toe Pro',
        'memory': 'Memory Match',
        'tetris': 'Tetris Classic',
        'breakout': 'Brick Breaker',
        'wordle': 'Wordle Unlimited'
    };
    modalGameTitle.textContent = gameTitles[gameKey] || 'Browser Game';

    setTimeout(() => {
        preLoaderScreen.style.display = 'none';
        gameFrameScreen.style.display = 'block';
        loadGameCanvas(gameKey);
    }, 2500);
}

// Close Game Modal
function closeGame() {
    gameModal.style.display = 'none';
    canvasWrapper.innerHTML = '';
}

// Fullscreen Control
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        canvasWrapper.requestFullscreen().catch(err => alert(`Fullscreen Error: ${err.message}`));
    } else {
        document.exitFullscreen();
    }
}

// Connect All 8 Games
function loadGameCanvas(gameKey) {
    if (gameKey === 'snake') startSnakeGame();
    else if (gameKey === '2048') start2048Game();
    else if (gameKey === 'flappy') startFlappyGame();
    else if (gameKey === 'tictactoe') startTicTacToeGame();
    else if (gameKey === 'memory') startMemoryGame();
    else if (gameKey === 'tetris') startTetrisGame();
    else if (gameKey === 'breakout') startBreakoutGame();
    else if (gameKey === 'wordle') startWordleGame();
}
