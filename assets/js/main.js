const pokemonList = document.getElementById('pokemonsList');
const loadMoreButton = document.getElementById('loadMore');
const maxRecords = 200;
const limit = 20;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => {
      const card = document.createElement('li');
      card.className = `pokemon ${pokemon.type}`;
      card.dataset.id = pokemon.number;

      card.innerHTML = `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}" />
        </div>
      `;

      // Adicione o evento de clique ao card do Pokémon
      card.addEventListener('click', () => {
        showPokemonDetails(pokemon);
      });

      return card;
    });

    newHtml.forEach((card) => {
      pokemonList.appendChild(card);
    });
  });
}

// Crie uma variável global para representar a janela flutuante
const popup = document.createElement('div');
popup.className = 'popup';

// Função para exibir os detalhes do Pokémon na janela flutuante
function showPokemonDetails(pokemon) {
  // Atualize o conteúdo da janela flutuante com os detalhes do Pokémon
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close">&times;</span>
      <h2 style="text-transform: uppercase;">${pokemon.name}</h2>
      <p>Number: ${pokemon.number}</p>
      <p>Type: ${pokemon.types.join(', ')}</p>
      <img src="${pokemon.photo}" alt="${pokemon.name}" />
    </div>
  `;

  // Adicione a janela flutuante à página
  document.body.appendChild(popup);

  // Adicione um evento de clique ao botão de fechar
  const closeBtn = popup.querySelector('.close');
  closeBtn.addEventListener('click', closePopup);
}
// Função para fechar a janela flutuante
function closePopup() {
  popup.remove();
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsNextPage = offset + limit;

  if (qtdRecordsNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.remove();
  } else {
    loadPokemonItems(offset, limit);
  }
});
