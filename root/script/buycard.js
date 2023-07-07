// const containerPokemons = document.querySelector(".grid");
// const showMoreButton = document.querySelector(".buttonMore");
// let cards = document.querySelector(".cartas");
// let filtertype = document.querySelector(".filter");

// let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
// let template = "";
// let loadPokemons = 8;
// let initialPokemons = 0;

// async function loadData() { 
//     try {
//         containerPokemons.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Cargando...">`;

//         const res = await fetch(`${pokeAPI}?offset=${0}&limit=${1280}",`);
//         const data = await res.json();
//         // console.log(data)
//         localStorage.setItem("Pokemones", JSON.stringify(data));

//     } catch (err) {
//         console.log(err);
//         let message = err.statusText || "Ocurrió un error";
//         containerPokemons.innerHTML = `<p> Error ${err.status}:${message}</p>`;
//     }
//     return (data)
// }


// async function printPokemons() {

//     let data = JSON.parse(localStorage.getItem("Pokemones"));

//     for (let i = initialPokemons; i < loadPokemons; i++) {

//         try {

//             let res = await fetch(data.results[i].url);
//             let pokemon = await res.json();

//             const [type1, type2] = pokemon.types.map(
//                 (typePokemon) => typePokemon.type.name);

//             // console.log(res, pokemon);
//             template += `
            
//                 <div class="carta">
//                     <div class="contenidocarta">
//                         <p><b>${pokemon.name}</b></p>
//                         <i class="fa-sharp fa-regular fa-heart"></i>
//                     </div>
//                     <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="pokemoncarta">
//                     <div class="contenidocarta">
//                         <p><b>${pokemon.base_experience} Exp</b></p>
//                         <button class="buy">Buy</button>
//                     </div>
//                 </div>
//                  `;
                
//         } catch (err) {
//             console.log(err);
//             let message = err.statusText || "Ocurrió un error";
//             template.innerHTML = ` <div class="carta">
//                 <div class="contenidocarta">
//                     <p><b>Name</b></p>
//                     <i class="fa-sharp fa-regular fa-heart"></i>
//                 </div>
//                 <div class="back-pokemon">
//                  <p>Error ${err.status}: ${message}</p>
//                 </div>
//                 <div class="contenidocarta">
//                     <p><b>Experience</b></p>
//                     <button class="buy">Buy</button>
//                 </div>
//             </div>`;

//         }

//     }

//     containerPokemons.innerHTML = template;
//     cards.textContent = `${loadPokemons} cards`;
//     loadPokemons += 8;
//     initialPokemons += 8;

// }


// document.addEventListener("DOMContentLoaded", (e) => loadData());
// document.addEventListener("DOMContentLoaded", (e) => printPokemons());
// showMoreButton.addEventListener("click", printPokemons);