// Global Selectors
const gameModal = document.getElementById('gameModal');
const preLoaderScreen = document.getElementById('preLoaderScreen');
const gameFrameScreen = document.getElementById('gameFrameScreen');
const modalGameTitle = document.getElementById('modalGameTitle');
const canvasWrapper = document.getElementById('canvasWrapper');

// 1. Instant Search Functionality
function filterGames() {
    const input = document.getElementById('gameSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card:not(.native-ad-card)');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 2. Category Filter Buttons
function filterCategory(category) {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event) {
        event.target.classList.add('active');
    }

    const cards = document.querySelectorAll('.game-card:not(.native-ad-card)');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 3. Preloader and Game Launcher Logic
function openGame(gameKey) {
    gameModal.style.display = 'flex';
    preLoaderScreen.style.display = 'block';
    gameFrameScreen.style.display = 'none';

    // Set Game Title
    const gameTitles = {
        'snake': 'Modern Snake Pro',
        '2048': '2048 Classic',
        'flappy': 'Flappy Bird',
        'tictactoe': 'Tic-Tac-Toe Pro'
    };
    modalGameTitle.textContent = gameTitles[gameKey] || 'Browser Game';

    // 3-Second AdSterra Pre-game Ad Delay
    setTimeout(() => {
        preLoaderScreen.style.display = 'none';
        gameFrameScreen.style.display = 'block';
        loadGameCanvas(gameKey);
    }, 3000);
}

// 4. Close Game Window
function closeGame() {
    gameModal.style.display = 'none';
    canvasWrapper.innerHTML = '';
}

// 5. Fullscreen Support
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        canvasWrapper.requestFullscreen().catch(err => {
            alert(`Error launching full-screen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// 6. Game Canvas Injector (Connects with Step 4 Games)
function loadGameCanvas(gameKey) {
    canvasWrapper.innerHTML = `<div style="color:#fff; text-align:center; padding:20px;">
        <p style="font-size:1.2rem; margin-bottom:10px;">🎮 <b>${gameKey.toUpperCase()}</b> Ready to Play!</p>
        <span style="color:#94a3b8; font-size:0.85rem;">Connecting Game Engine...</span>
    </div>`;
}
