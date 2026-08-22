// 2048 Classic Game Engine for VibeArcade
function start2048Game() {
    const wrapper = document.getElementById('canvasWrapper');
    wrapper.innerHTML = `
        <div style="text-align:center; padding:10px; width:100%; max-width:360px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; color:#38bdf8; font-weight:bold;">
                <span>Score: <span id="score2048">0</span></span>
                <button onclick="init2048()" style="background:#a855f7; color:#fff; border:none; padding:6px 12px; border-radius:12px; font-weight:bold; cursor:pointer;">New Game</button>
            </div>
            <div id="grid2048" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; background:#1e293b; padding:8px; border-radius:8px; border:1px solid #334155;"></div>
            <div style="margin-top:12px; display:grid; grid-template-columns:repeat(3, 1fr); gap:5px; max-width:200px; margin-left:auto; margin-right:auto;">
                <div></div><button onclick="move2048('up')" style="padding:10px; background:#334155; color:#fff; border:none; border-radius:6px; cursor:pointer;">⬆️</button><div></div>
                <button onclick="move2048('left')" style="padding:10px; background:#334155; color:#fff; border:none; border-radius:6px; cursor:pointer;">⬅️</button>
                <button onclick="move2048('down')" style="padding:10px; background:#334155; color:#fff; border:none; border-radius:6px; cursor:pointer;">⬇️</button>
                <button onclick="move2048('right')" style="padding:10px; background:#334155; color:#fff; border:none; border-radius:6px; cursor:pointer;">➡️</button>
            </div>
        </div>
    `;

    let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    let score = 0;

    function addTile() {
        let empty = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c] === 0) empty.push({r, c});
            }
        }
        if (empty.length > 0) {
            let spot = empty[Math.floor(Math.random() * empty.length)];
            board[spot.r][spot.c] = Math.random() > 0.1 ? 2 : 4;
        }
    }

    function render() {
        const grid = document.getElementById('grid2048');
        grid.innerHTML = '';
        document.getElementById('score2048').textContent = score;
        const colors = {
            0: '#0f172a', 2: '#38bdf8', 4: '#0284c7', 8: '#a855f7', 16: '#7e22ce',
            32: '#f59e0b', 64: '#d97706', 128: '#ef4444', 256: '#dc2626', 512: '#10b981', 1024: '#059669', 2048: '#eab308'
        };

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                let val = board[r][c];
                let tile = document.createElement('div');
                tile.style.cssText = `height:60px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:${val > 100 ? '1.1rem' : '1.4rem'}; border-radius:6px; background:${colors[val] || '#eab308'}; color:${val === 0 ? 'transparent' : '#fff'};`;
                tile.textContent = val === 0 ? '' : val;
                grid.appendChild(tile);
            }
        }
    }

    function slide(row) {
        let arr = row.filter(val => val !== 0);
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                score += arr[i];
                arr[i + 1] = 0;
            }
        }
        arr = arr.filter(val => val !== 0);
        while (arr.length < 4) arr.push(0);
        return arr;
    }

    window.move2048 = function(dir) {
        let original = JSON.stringify(board);

        if (dir === 'left') {
            for (let r = 0; r < 4; r++) board[r] = slide(board[r]);
        } else if (dir === 'right') {
            for (let r = 0; r < 4; r++) board[r] = slide(board[r].reverse()).reverse();
        } else if (dir === 'up') {
            for (let c = 0; c < 4; c++) {
                let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
                col = slide(col);
                for (let r = 0; r < 4; r++) board[r][c] = col[r];
            }
        } else if (dir === 'down') {
            for (let c = 0; c < 4; c++) {
                let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
                col = slide(col.reverse()).reverse();
                for (let r = 0; r < 4; r++) board[r][c] = col[r];
            }
        }

        if (original !== JSON.stringify(board)) {
            addTile();
            render();
        }
    };

    window.init2048 = function() {
        board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
        addTile();
        addTile();
        render();
    };

    document.onkeydown = function(e) {
        if (e.key === 'ArrowLeft') move2048('left');
        else if (e.key === 'ArrowUp') move2048('up');
        else if (e.key === 'ArrowRight') move2048('right');
        else if (e.key === 'ArrowDown') move2048('down');
    };

    init2048();
          }
