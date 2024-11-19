const searchBtn = document.getElementById("search-btn");
const infoContainer = document.getElementById("poke-info");

const fetchPokemon = () => {
  const query = document.getElementById("search").value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Pokemon not found");
      }
      return res.json();
    })
    .then((data) => {
      const pokemonHTML = ` 
        <div class="pokeName">
        <h3>${data.name}</h3>
        <p class="pokeId" >ID: ${data.id}</p>
        </div>
        <div class="pokeInfo-content">
        <p class="pokeType" ><span>Type:</span> ${data.types
          .map((t) => t.type.name)
          .join(", ")}</p>
        <p class="pokeHeight" ><span>Height:</span> ${data.height} ft</p>
        <p class="pokeWeight" ><span>Weight:</span> ${data.weight} lb</p>
        </div>
        `;

      infoContainer.innerHTML = pokemonHTML;
      const imgEl = document.createElement("img");
      imgEl.classList.add("pokeIMG");
      imgEl.src = `${data.sprites.front_default}`;

      const dexContainer = document.querySelector(".dex");
      dexContainer.append(imgEl);

      document.getElementById("search").value = "";
    })
    .catch((err) => {
      infoContainer.innerHTML = `<p>
          "<strong>${query}</strong>" not found. Please try a different Pokemon
        </p>`;
    });
};

searchBtn.addEventListener("click", fetchPokemon);
