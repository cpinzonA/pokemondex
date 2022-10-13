const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");

let id=document.querySelector(".btn")
id.addEventListener("click",Pokemon);
    
         function Pokemon(){
              return fetchPokemon()
             async function fetchPokemon(){
                let poke_name=document.querySelector(".poke-name").value
               const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_name}/`)
                if (res.status==404){
                   pokemonContainer.textContent="no encontrado"
                   let crea=document.querySelector(".btn")
                   crea.addEventListener("click",crear); 
                   function crear(){ 
                     pokemonContainer.innerHTML="";
                   }
                  
                  
                   
                } else{const json = await res.json()
                 
                    createPokemon(json)
                    spinner.style.display = "none";
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
  const spriteContainer1 = document.createElement("div");
  spriteContainer1.classList.add("img-container");
  const sprite1 = document.createElement("img");
  sprite1.src = Pokemon.sprites.front_shiny;

  spriteContainer.appendChild(sprite);
  spriteContainer1.appendChild(sprite1);

  const number = document.createElement("p");
  number.innerHTML = `#${Pokemon.id}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = Pokemon.name;
  const abilities = document.createElement("p");
  abilities.classList.add("abilities");

 for(let i=0;i< Pokemon.abilities.length;i++){
  abilities.innerHTML+=`<p>${Pokemon.abilities[i].ability.name}</p> ` 
  }
  
 
  card.appendChild(spriteContainer);
  card.appendChild(spriteContainer1);
  card.appendChild(number);
  card.appendChild(name);
  card.appendChild(abilities);



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

  for (let i = 0; i < 6; i++) {
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
         }
let cancelar=document.querySelector(".cancel")
cancelar.addEventListener("click",cancel);
function cancel(){ 
  pokemonContainer.innerHTML="";
}
