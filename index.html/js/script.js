(function() {
    let GG_ALL_GAME_CONFIG = {
      emojis: ['🍎', '🍌', '🍇', '🍒', '🍓', '🍉', '🍍', '🥝'], // Emojis de frutas para o jogo
      boardSize: 16, // Tamanho do tabuleiro (4x4)
      maxPairs: 8, // Número máximo de pares
      flipDuration: 800, // Duração da virada da carta em milissegundos
      gameState: 'initial' // Estado inicial do jogo
    };
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let attempts = 0;

    function createBoard() {
      const gameBoard = document.getElementById('game-board');
      gameBoard.innerHTML = '';
      cards = [];
      flippedCards = [];
      matchedPairs = 0;
      attempts = 0;
      updateScore();
      const shuffledEmojis = [...GG_ALL_GAME_CONFIG.emojis, ...GG_ALL_GAME_CONFIG.emojis]
        .sort(() => Math.random() - 0.5);
      for (let i = 0; i < GG_ALL_GAME_CONFIG.boardSize; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = shuffledEmojis[i];
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
        cards.push(card);
      }
      GG_ALL_GAME_CONFIG.gameState = 'playing';
    }

    function flipCard(card) {
      if (GG_ALL_GAME_CONFIG.gameState === 'playing' && flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) {
          attempts++;
          updateScore();
          setTimeout(checkMatch, GG_ALL_GAME_CONFIG.flipDuration);
        }
      }
    }

    function checkMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        if (matchedPairs === GG_ALL_GAME_CONFIG.maxPairs) {
          setTimeout(() => {
            alert(`Parabéns! Você venceu em ${attempts} tentativas!`);
            endGame();
          }, 500);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
        }, 500);
      }
      flippedCards = [];
    }

    function endGame() {
      GG_ALL_GAME_CONFIG.gameState = 'initial';
      document.getElementById('start-button').style.display = 'block';
      document.getElementById('game-board').style.display = 'none';
      document.getElementById('score').style.display = 'none';
      document.getElementById('reset-button').style.display = 'none';
    }

    function updateScore() {
      document.getElementById('score').textContent = `Tentativas: ${attempts}`;
    }

    function resetGame() {
      createBoard();
    }

    function startGame() {
      if (GG_ALL_GAME_CONFIG.gameState === 'initial') {
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('game-board').style.display = 'grid';
        document.getElementById('score').style.display = 'block';
        document.getElementById('reset-button').style.display = 'block';
        createBoard();
      }
    }
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('reset-button').addEventListener('click', resetGame);
  })();