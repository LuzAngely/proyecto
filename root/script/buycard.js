const containerPokemons = document.querySelector(".grid");
const showMoreButton = document.querySelector(".botonMore");
let cards = document.querySelector(".cartas");

let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
let template = "";
let loadpokemons = 8;
let initialPokemons = 8

async function loadPokemons(url) {

    try {
        containerPokemons.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Cargando...">`;

        const res = await fetch(url);
        const data = await res.json();

        localStorage.setItem("Pokemones", JSON.stringify(data));

    } catch (err) {

        console.log(err);
        let message = err.statusText || "Ocurrió un error";

        containerPokemons.innerHTML = `<p> Error ${err.status}:${message}</p>`;

    }

    return (data)
}


async function printInitialPokemons() {

    let data = JSON.parse(localStorage.getItem("Pokemones"));

    for (let i = 0; i < loadpokemons; i++) {

        try {
            let res = await fetch(data.results[i].url);
            let pokemon = await res.json();


            // console.log(res, pokemon);
            template += `
            
                <div class="carta">
                    <div class="contenidocarta">
                        <p><b>${pokemon.name}</b></p>
                        <i class="fa-sharp fa-regular fa-heart"></i>
                    </div>
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="pokemoncarta">
                    <div class="contenidocarta">
                        <p><b>${pokemon.base_experience} Exp</b></p>
                        <button class="buy">Buy</button>
                    </div>
                </div>
                 `;


        } catch (err) {
            console.log(err);
            let message = err.statusText || "Ocurrió un error";
            template.innerHTML = ` <div class="carta">
                <div class="contenidocarta">
                    <p><b>Name</b></p>
                    <i class="fa-sharp fa-regular fa-heart"></i>
                </div>
                <div class="back-pokemon">
                 <p>Error ${err.status}: ${message}</p>
                </div>
                <div class="contenidocarta">
                    <p><b>Experience</b></p>
                    <button class="buy">Buy</button>
                </div>
            </div>`;

        }

    }

    containerPokemons.innerHTML = template;
    cards.textContent = `${loadpokemons} cards`;
}

async function loadMorePokemons () {

    let data = JSON.parse(localStorage.getItem("Pokemones"));
   

    for (let i = loadpokemons; i < initialPokemons + loadpokemons; i++) {


        try {
            let res = await fetch(data.results[i].url);
            let pokemon = await res.json();

            // console.log(res, pokemon);
            template += `
            
                <div class="carta">
                    <div class="contenidocarta">
                        <p><b>${pokemon.name}</b></p>
                        <i class="fa-sharp fa-regular fa-heart"></i>
                    </div>
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="pokemoncarta">
                    <div class="contenidocarta">
                        <p><b>${pokemon.base_experience} Exp</b></p>
                        <button class="buy">Buy</button>
                    </div>
                </div>
                 `;


        } catch (err) {
            console.log(err);
            let message = err.statusText || "Ocurrió un error";
            template.innerHTML = ` <div class="carta">
                <div class="contenidocarta">
                    <p><b>Name</b></p>
                    <i class="fa-sharp fa-regular fa-heart"></i>
                </div>
                <div class="back-pokemon">
                 <p>Error ${err.status}: ${message}</p>
                </div>
                <div class="contenidocarta">
                    <p><b>Experience</b></p>
                    <button class="buy">Buy</button>
                </div>
            </div>`;

        }

    }

    loadpokemons = loadpokemons + initialPokemons;
    containerPokemons.innerHTML = template;
    cards.textContent = `${loadpokemons} cards`;

}


document.addEventListener("DOMContentLoaded", (e) => loadPokemons(pokeAPI));
document.addEventListener("DOMContentLoaded", (e) => printInitialPokemons());
showMoreButton.addEventListener("click", loadMorePokemons);
