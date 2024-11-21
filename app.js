// Select elements from the DOM
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search_btn");
const pokemonCardContainer = document.querySelector(".pokemon_card");

// Function to fetch Pokémon data
async function fetchPokemonData(query) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const pokemon = await response.json();
    displayPokemonCard(pokemon);
  } catch (error) {
    displayError(error.message);
  }
}

// Function to display the Pokémon card
function displayPokemonCard(pokemon) {
  const { name, sprites, stats, abilities, weight, length } = pokemon;

  // Generate stats and abilities list
  const hp = stats.find((stat) => stat.stat.name === "hp").base_stat; // HP value
  const description = `A Pokémon Weight: ${weight / 10}`;

  const statsHTML = stats
    .map(
      (stat) => `<li>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</li>`
    )
    .join("");

  const abilitiesHTML = abilities
    .map((ability) => `<li>${ability.ability.name.toUpperCase()}</li>`)
    .join("");

  // Create card HTML
  const cardHTML = `
    <div class="pokemon_card_content">
    
    <div  class="pokemon_hp">
    <h3 class="pokemon_name">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
    HP: ${hp}
    </div>
      <img src="${sprites.front_default}" alt="${name}" class="pokemon_image" />
      <p class="pokemon_description">${description}</p>
      <div class="pokemon_details">
        <div class="pokemon_details">
        <h4>Stats</h4>
        <ul>${statsHTML}</ul>
        <h4>Abilities</h4>
        <ul>${abilitiesHTML}</ul>
      </div>
    </div>  
  `;

  // Display the card
  pokemonCardContainer.innerHTML = cardHTML;
}

// Function to display an error message
function displayError(message) {
  pokemonCardContainer.innerHTML = `<p class="error_message">${message}</p>`;
}

// Add event listener to the search button
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) {
    displayError("Please enter a Pokémon name or ID!");
    return;
  }
  fetchPokemonData(query);
});
