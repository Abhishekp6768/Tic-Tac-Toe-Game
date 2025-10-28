
        document.addEventListener('DOMContentLoaded', () => {
            // Game state variables
            let currentPlayer = 'X';
            let gameBoard = ['', '', '', '', '', '', '', '', ''];
            let gameActive = true;
            let scoreX = 0;
            let scoreO = 0;
            
            // DOM elements
            const cells = document.querySelectorAll('.cell');
            const currentPlayerElement = document.getElementById('current-player');
            const scoreXElement = document.getElementById('score-x');
            const scoreOElement = document.getElementById('score-o');
            const resetBtn = document.getElementById('reset-btn');
            const newGameBtn = document.getElementById('new-game-btn');
            const messageElement = document.getElementById('message');
            
            // Winning combinations
            const winningConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6]             // diagonals
            ];
            
            // Initialize the game
            function initGame() {
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o', 'win');
                    cell.addEventListener('click', handleCellClick);
                });
                
                updateCurrentPlayerDisplay();
                hideMessage();
            }
            
            // Handle cell click
            function handleCellClick(e) {
                const clickedCell = e.target;
                const cellIndex = parseInt(clickedCell.getAttribute('data-index'));
                
                // Check if cell is already taken or game is not active
                if (gameBoard[cellIndex] !== '' || !gameActive) {
                    return;
                }
                
                // Update game state
                gameBoard[cellIndex] = currentPlayer;
                clickedCell.textContent = currentPlayer;
                clickedCell.classList.add(currentPlayer.toLowerCase());
                
                // Check for win or draw
                if (checkWin()) {
                    endGame(false);
                } else if (checkDraw()) {
                    endGame(true);
                } else {
                    // Switch player
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updateCurrentPlayerDisplay();
                }
            }
            
            // Check for win
            function checkWin() {
                for (let condition of winningConditions) {
                    const [a, b, c] = condition;
                    
                    if (
                        gameBoard[a] !== '' &&
                        gameBoard[a] === gameBoard[b] &&
                        gameBoard[a] === gameBoard[c]
                    ) {
                        // Highlight winning cells
                        cells[a].classList.add('win');
                        cells[b].classList.add('win');
                        cells[c].classList.add('win');
                        
                        return true;
                    }
                }
                
                return false;
            }
            
            // Check for draw
            function checkDraw() {
                return !gameBoard.includes('');
            }
            
            // End the game
            function endGame(isDraw) {
                gameActive = false;
                
                if (isDraw) {
                    showMessage("It's a draw!", 'draw');
                } else {
                    showMessage(`Player ${currentPlayer} wins!`, 'win');
                    
                    // Update score
                    if (currentPlayer === 'X') {
                        scoreX++;
                        scoreXElement.textContent = scoreX;
                    } else {
                        scoreO++;
                        scoreOElement.textContent = scoreO;
                    }
                }
            }
            
            // Update current player display
            function updateCurrentPlayerDisplay() {
                currentPlayerElement.textContent = currentPlayer;
                currentPlayerElement.className = currentPlayer === 'X' ? 'player-x' : 'player-o';
            }
            
            // Show message
            function showMessage(text, type) {
                messageElement.textContent = text;
                messageElement.className = `message ${type} show`;
            }
            
            // Hide message
            function hideMessage() {
                messageElement.classList.remove('show');
            }
            
            // Reset the current game
            function resetGame() {
                gameBoard = ['', '', '', '', '', '', '', '', ''];
                gameActive = true;
                currentPlayer = 'X';
                initGame();
            }
            
            // Start a new game (reset scores)
            function newGame() {
                scoreX = 0;
                scoreO = 0;
                scoreXElement.textContent = scoreX;
                scoreOElement.textContent = scoreO;
                resetGame();
            }
            
            // Event listeners
            resetBtn.addEventListener('click', resetGame);
            newGameBtn.addEventListener('click', newGame);
            
            // Initialize the game
            initGame();
        });
    