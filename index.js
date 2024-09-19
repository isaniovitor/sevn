document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://sevn-pleno-esportes.deno.dev/';
  let currentRound = 1;

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

  loadRoundsData();
});
