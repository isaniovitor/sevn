function getGradientDefs() {
  return `
      <defs>
          <linearGradient id="gradient-a" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF0000; stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(233, 101, 101, 0.3); stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient-b" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#0038FF; stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(0, 56, 255, 0.3); stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient-c" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF9900; stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(255, 153, 0, 0.3); stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient-d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#72CB00; stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(114, 203, 0, 0.3); stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient-e" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#00C797; stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(0, 199, 151, 0.3); stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient-f" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#0088D4; stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(34, 176, 255, 0.3); stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient-g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#AD00FF; stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(191, 101, 233, 0.3); stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient-h" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF00E6; stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(255, 0, 214, 0.3); stop-opacity:1" />
          </linearGradient>
      </defs>
  `;
}

function getGradientId(teamId) {
  const gradients = {
      'time-a': 'gradient-a',
      'time-b': 'gradient-b',
      'time-c': 'gradient-c',
      'time-d': 'gradient-d',
      'time-e': 'gradient-e',
      'time-f': 'gradient-f',
      'time-g': 'gradient-g',
      'time-h': 'gradient-h',
  };
  return gradients[teamId] || 'default-gradient';
}

document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://sevn-pleno-esportes.deno.dev/';
  let currentRound = 1;
  let roundsData = [];

  const prevButton = document.getElementById('prevRound');
  const nextButton = document.getElementById('nextRound');
  const roundNumberElem = document.getElementById('roundNumber');
  const gamesContainer = document.getElementById('gamesContainer');

  function loadRoundsData() {
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              roundsData = data;
              displayRound(currentRound);
              updateNavigationButtons();
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  function displayRound(roundNumber) {
      const round = roundsData.find(r => r.round === roundNumber);
      if (!round) {
          gamesContainer.innerHTML = 'No games available.';
          return;
      }

      let gamesHTML = round.games.map(game => `
        <div class="match">
          <div  class="team" >
            <svg width="32" height="40" viewBox="0 0 24 30" fill="url(#${getGradientId(game.team_home_id)})" xmlns="http://www.w3.org/2000/svg">
            ${getGradientDefs()}
              <path d="M12 0C11.1627 1.12221 10.6201 3.23737 7.15872 3.76028C6.8344 3.80729 6.52776 3.83079 6.23292 
              3.83079C4.03931 3.83079 2.71253 2.63807 2.71253 2.63807L0 5.48766C0 5.48766 4.19853 6.82726 0.837346 
              18.8367C-1.43882 26.9683 10.9445 28.2021 12 30C13.0496 28.2021 25.4329 26.9683 23.1627 18.8367C19.8074 
              6.82726 24 5.48766 24 5.48766L21.2816 2.63807C21.2816 2.63807 19.9548 3.83079 17.7612 3.83079C17.4663 
              3.83079 17.1597 3.80729 16.8354 3.76028C13.3799 3.24324 12.8373 1.12221 11.9941 0L12 0Z"/>
            </svg>

            <span>${game.team_home_name}</span>
          </div>

          <div>
            <span class="score">${game.team_home_score}</span>
            <span class="versus">&times;</span>
            <span class="score">${game.team_away_score}</span>
          </div>

          <div  class="team" >
            <span>${game.team_away_name}</span>

          <svg width="32" height="40" viewBox="0 0 24 30" fill="url(#${getGradientId(game.team_away_id)})" xmlns="http://www.w3.org/2000/svg">
              ${getGradientDefs()}
              <path d="M12 0C11.1627 1.12221 10.6201 3.23737 7.15872 3.76028C6.8344 3.80729 6.52776 3.83079 6.23292 
              3.83079C4.03931 3.83079 2.71253 2.63807 2.71253 2.63807L0 5.48766C0 5.48766 4.19853 6.82726 0.837346 
              18.8367C-1.43882 26.9683 10.9445 28.2021 12 30C13.0496 28.2021 25.4329 26.9683 23.1627 18.8367C19.8074 
              6.82726 24 5.48766 24 5.48766L21.2816 2.63807C21.2816 2.63807 19.9548 3.83079 17.7612 3.83079C17.4663 
              3.83079 17.1597 3.80729 16.8354 3.76028C13.3799 3.24324 12.8373 1.12221 11.9941 0L12 0Z"/>
            </svg>
          </div>
        </div>
      `).join('');

      gamesContainer.innerHTML = gamesHTML;
  }

  function updateRoundNumber(round) {
    roundNumberElem.textContent = `RODADA  ${round}`;
  }

  function updateNavigationButtons() {
      prevButton.disabled = currentRound <= 1;
      nextButton.disabled = currentRound >= roundsData.length;
  }

  prevButton.addEventListener('click', () => {
      if (currentRound > 1) {
          currentRound -= 1;
          displayRound(currentRound);
          updateRoundNumber(currentRound);
          updateNavigationButtons();
      }
  });

  nextButton.addEventListener('click', () => {
      if (currentRound < roundsData.length) {
          currentRound += 1;
          displayRound(currentRound);
          updateRoundNumber(currentRound);
          updateNavigationButtons();
      }
  });

  loadRoundsData();
});
