const searchButton = document.getElementById('search-button');
const userInput = document.getElementById('user-input');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const types = document.getElementById('types');
const imgResult = document.getElementById('img-result');
const hp = document.getElementById('hp');
const atk = document.getElementById('attack');
const def = document.getElementById('defense');
const spAtk = document.getElementById('special-attack');
const spDef = document.getElementById('special-defense');
const spd = document.getElementById('speed');

const retrievePokemonData = (nameOrId)=>{
fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
.then((response)=> response.json())
.then((data)=>{ 
   const pokemonNames = data.results;
   if(pokemonNames.some((el)=> el.name === nameOrId || el.id === nameOrId)){
    for(let i = 0 ; i < pokemonNames.length ; i++){
        if(pokemonNames[i].name === nameOrId || pokemonNames[i].id === nameOrId){
            fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`)
            .then((response)=> response.json())
            .then((data)=>{
                const pokemonStats = data;
                pokemonName.innerText = pokemonStats.name.toUpperCase();
                pokemonId.innerText = `#${pokemonStats.id}`;
                weight.innerText = pokemonStats.weight;
                height.innerText = pokemonStats.height;
                pokemonStats.types.forEach((el)=> {
                    types.innerHTML += `<div class="${el.type.name} types">${el.type.name.toUpperCase()}</div>`
                })
                imgResult.innerHTML = `<img id="sprite" src="${pokemonStats.sprites.front_default}" alt="${pokemonStats.name}-sprite">`;
                hp.innerText = pokemonStats.stats[0].base_stat;
                atk.innerText = pokemonStats.stats[1].base_stat;
                def.innerText = pokemonStats.stats[2].base_stat;
                spAtk.innerText = pokemonStats.stats[3].base_stat;
                spDef.innerText = pokemonStats.stats[4].base_stat;
                spd.innerText = pokemonStats.stats[5].base_stat;
                return;
            })
        }
       }
   }
   else{
    return alert('Pokémon not found');
   }
})
.catch((error)=> console.error(`error: ${error}`));
}

retrievePokemonData('dragapult')
