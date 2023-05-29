const pokemonList = document.getElementById('pokemonsList');
const loadMoreButton = document.getElementById('loadMore');
const maxRecords = 200;
const limit = 10;
let offset = 0;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons
            .map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}" />
          </div>
        </li>
      `)
            .join('');
        pokemonList.insertAdjacentHTML('beforeend', newHtml);
    });
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
