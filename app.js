const searchButton = document.getElementById("search-button");
const userInput = document.getElementById("search-input");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const types = document.getElementById("types");
const imgResult = document.getElementById("img-result");
const hp = document.getElementById("hp");
const atk = document.getElementById("attack");
const def = document.getElementById("defense");
const spAtk = document.getElementById("special-attack");
const spDef = document.getElementById("special-defense");
const spd = document.getElementById("speed");
const weightLabel = document.getElementById("weight-label");
const heightLabel = document.getElementById("height-label");

const retrievePokemonData = (nameOrId) => {
  const input =
    nameOrId == Number(nameOrId) ? Number(nameOrId) : nameOrId.toLowerCase();
  fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
    .then((response) => response.json())
    .then((data) => {
      const pokemonNames = data.results;
      if (pokemonNames.some((el) => el.name === input || el.id === input)) {
        for (let i = 0; i < pokemonNames.length; i++) {
          if (pokemonNames[i].name === input || pokemonNames[i].id === input) {
            fetch(
              `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`
            )
              .then((response) => response.json())
              .then((data) => {
                heightLabel.classList.remove("hidden");
                weightLabel.classList.remove("hidden");
                const pokemonStats = data;
                console.log(pokemonStats);
                pokemonName.innerText = pokemonStats.name.toUpperCase();
                pokemonId.innerText = `#${pokemonStats.id}`;
                weight.innerText = pokemonStats.weight;
                height.innerText = pokemonStats.height;
                types.innerHTML = "";
                pokemonStats.types.forEach((el) => {
                  types.innerHTML += `<div class="${
                    el.type.name
                  } types">${el.type.name.toUpperCase()}</div>`;
                });
                imgResult.innerHTML = `<img id="sprite" src="${pokemonStats.sprites.front_default}" alt="${pokemonStats.name}-sprite">`;
                hp.innerText = pokemonStats.stats[0].base_stat;
                atk.innerText = pokemonStats.stats[1].base_stat;
                def.innerText = pokemonStats.stats[2].base_stat;
                spAtk.innerText = pokemonStats.stats[3].base_stat;
                spDef.innerText = pokemonStats.stats[4].base_stat;
                spd.innerText = pokemonStats.stats[5].base_stat;
              });
          }
        }
      } else {
        alert("Pokémon not found");
      }
    })
    .catch((error) => console.error(`error: ${error}`));
};

searchButton.addEventListener("click", () => {
  retrievePokemonData(userInput.value);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    retrievePokemonData(userInput.value);
  }
});
