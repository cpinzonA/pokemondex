const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");

let id=document.querySelector(".buscar")
id.addEventListener("click",Pokemon);


    
          function Pokemon(){
              return fetchPokemon()
              function fetchPokemon(){
                let poke_name=document.querySelector(".poke-name").value
                fetch(`https://pokeapi.co/api/v2/pokemon/${poke_name}/`)
                  .then((res) => res.json())
                 .then(data=>{
                    createPokemon(data)
                    spinner.style.display = "none";
                 }
                    
                  ) 
      } 
    } 

function createPokemon(Pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = Pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.innerHTML = `#${Pokemon.id}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = Pokemon.name;
  const abilities = document.createElement("p");
  abilities.classList.add("abilities");
  abilities.textContent = Pokemon.abilities[0].ability.name
  const abilities1 = document.createElement("p");
  abilities1.classList.add("abilities");
  abilities1.textContent = Pokemon.abilities[1].ability.name
 
 
  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  card.appendChild(abilities);
  card.appendChild(abilities1);


  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");

  cardBack.appendChild(progressBars(Pokemon.stats));

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);
}

function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 5; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


