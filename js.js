// Rock Paper Scissors Game
class RockPaperScissors {
    constructor() {
        this.choices = ['rock', 'paper', 'scissors'];
        this.playerScore = 0;
        this.computerScore = 0;
        this.rounds = 0;
    }

    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }

    playRound(playerChoice, computerChoice) {
        playerChoice = playerChoice.toLowerCase();
        
        if (!this.choices.includes(playerChoice)) {
            return { winner: 'invalid', message: 'Invalid choice! Please choose rock, paper, or scissors.' };
        }

        if (playerChoice === computerChoice) {
            return { winner: 'tie', message: `It's a tie! Both chose ${playerChoice}.` };
        }

        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        if (winConditions[playerChoice] === computerChoice) {
            this.playerScore++;
            return { 
                winner: 'player', 
                message: `You win! ${playerChoice} beats ${computerChoice}.` 
            };
        } else {
            this.computerScore++;
            return { 
                winner: 'computer', 
                message: `You lose! ${computerChoice} beats ${playerChoice}.` 
            };
        }
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.rounds = 0;
    }

    getScore() {
        return {
            player: this.playerScore,
            computer: this.computerScore
        };
    }
}

// Initialize game
const game = new RockPaperScissors();

// DOM elements
const buttons = document.querySelectorAll('.choice-btn');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const gameStatus = document.getElementById('game-status');

// Event listeners for buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const playerChoice = e.target.dataset.choice;
        const computerChoice = game.getComputerChoice();
        
        const result = game.playRound(playerChoice, computerChoice);
        
        // Update UI
        resultDisplay.innerHTML = `
            <div class="choices">
                <div class="choice">
                    <img src="${getImageUrl(playerChoice)}" alt="${playerChoice}" class="choice-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span class="emoji" style="display:none;">${getEmoji(playerChoice)}</span>
                    <p>You: ${playerChoice}</p>
                </div>
                <div class="vs">VS</div>
                <div class="choice">
                    <img src="${getImageUrl(computerChoice)}" alt="${computerChoice}" class="choice-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span class="emoji" style="display:none;">${getEmoji(computerChoice)}</span>
                    <p>Computer: ${computerChoice}</p>
                </div>
            </div>
            <p class="result-message ${result.winner}">${result.message}</p>
        `;
        
        // Update score
        const score = game.getScore();
        scoreDisplay.textContent = `Score: You ${score.player} - ${score.computer} Computer`;
        
        // Check for game end (optional - first to 5 wins)
        if (score.player === 5) {
            gameStatus.textContent = '🎉 You won the game!';
            gameStatus.style.color = '#4CAF50';
            setTimeout(() => {
                game.resetGame();
                gameStatus.textContent = 'Game Reset!';
                gameStatus.style.color = '#333';
                resultDisplay.innerHTML = '';
                scoreDisplay.textContent = 'Score: You 0 - 0 Computer';
            }, 3000);
        } else if (score.computer === 5) {
            gameStatus.textContent = '😢 Computer won the game!';
            gameStatus.style.color = '#f44336';
            setTimeout(() => {
                game.resetGame();
                gameStatus.textContent = 'Game Reset!';
                gameStatus.style.color = '#333';
                resultDisplay.innerHTML = '';
                scoreDisplay.textContent = 'Score: You 0 - 0 Computer';
            }, 3000);
        }
    });
});

// Reset button
document.getElementById('reset-btn').addEventListener('click', () => {
    game.resetGame();
    resultDisplay.innerHTML = '';
    scoreDisplay.textContent = 'Score: You 0 - 0 Computer';
    gameStatus.textContent = 'Make your choice!';
    gameStatus.style.color = '#333';
});

// Get image URL for result display (subject area)
function getImageUrl(choice) {
    // Images for the result/subject display area - different from button images
    // Replace these with your own image paths like: 'images/rock-result.png'
    const resultImages = {
        rock: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzg0NDAyNiIgc3Ryb2tlPSIjNjYzIiBzdHJva2Utd2lkdGg9IjQiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjUwIiByPSIzMCIgZmlsbD0iIzU1NCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNzAiIHI9IjIwIiBmaWxsPSIjNjYzIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iODAiIHI9IjI1IiBmaWxsPSIjNzU1Ii8+PHRleHQgeD0iNTAlIiB5PSI5NSUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlJPQ0s8L3RleHQ+PC9zdmc+',
        paper: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjIg8L3RleHQ+PC9zdmc+',
        scissors: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI0MwQzBDMCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+4p20PC90ZXh0Pjwvc3ZnPg=='
    };
    return resultImages[choice] || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzY2NjY2NiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+PzwvdGV4dD48L3N2Zz4=';
}

// Get image URL for buttons
function getButtonImageUrl(choice) {
    // Images for buttons - different from result images
    // Replace these with your own image paths like: 'images/rock-button.png'
    const buttonImages = {
        rock: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRkY2QjQ0IiByeD0iNSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjE1IiBmaWxsPSIjRkYwMDAwIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIzNSIgcj0iOCIgZmlsbD0iI0ZGMDAwMCIgb3BhY2l0eT0iMC43Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5qoPC90ZXh0Pjwvc3ZnPg==',
        paper: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+MijwvdGV4dD48L3N2Zz4=',
        scissors: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjQzBDMEMwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7inbQ8L3RleHQ+PC9zdmc+'
    };
    return buttonImages[choice] || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4/PC90ZXh0Pjwvc3ZnPg==';
}

function getEmoji(choice) {
    const emojis = {
        rock: '🪨',
        paper: '📄',
        scissors: '✂️'
    };
    return emojis[choice] || '❓';
}

