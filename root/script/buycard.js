const containerPokemons = document.querySelector(".grilla");
let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
// let offset = 0;
// let limit = 8;
// let totalcards = 0;

async function loadPokemons(url) {
    try {
        containerPokemons.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Cargando...">`;

        // const res = await fetch(`${url}/pokemon?offset=${offset}&limit=${limit}`);
        const res = await fetch(url);
        const data = await res.json();
        template = "";

        console.log(res);
        console.log(data);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        for (let i = 0; i < data.results.length; i++) {

            try {
                let res = await fetch(data.results[i].url);
                let pokemon = await res.json();

                // const [type1, type2] = pokemon.types.map(
                //     (typeObj) => typeObj.type.name
                // );

                console.log(res, pokemon);

                if (!res.ok) throw { status: res.status, statusText: res.statusText };

                template += `
            
                <div class="carta">
                    <div class="contenidocarta">
                        <p><b>${pokemon.name}</b></p>
                        <i class="fa-sharp fa-regular fa-heart"></i>
                    </div>
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="pokemoncarta">
                    <div class="contenidocarta">
                        <p><b>Experience:${pokemon.base_experience}</b></p>
                        <button class="buy">Buy</button>
                    </div>
                </div>
                 `;
                
                 // totalcards++;
                
            } catch (err) {
                console.log(err);
                let message = err.statusText || "Ocurrió un error";
                template.innerHTML = `<div class="card">
              <div class="name">
                <p><b>Name</b></p>
                <i class="fa-regular fa-heart"></i>
              </div>
              <div class="back-pokemon">
                <p>Error ${err.status}: ${message}</p>
              </div>
              <div class="power">
               <p><b>Power Level</b></p>
               <button>Buy</button>
              </div>
            </div>`;

            }


            
            // const carts = document.querySelector(".cartas");
            // carts.textContent = `${totalcards} cards`;

        }
        containerPokemons.innerHTML = template;

    } catch (err) {

        console.log(err);
        let message = err.statusText || "Ocurrió un error";

        containerPokemons.innerHTML = `<p> Error ${err.status}:${message}</p>`;

    }
}

document.addEventListener("DOMContentLoaded", (e) => loadPokemons(pokeAPI));

// const moreCards = document.querySelector(".more");
// moreCards.addEventListener("click", loadPokemons);

// const typeLinks = document.querySelectorAll(".pestanas");

// typeLinks.forEach((type) => {
//     type.addEventListener("click", (evento) => {
//         evento.preventDefault();
//         const tipo = type.textContent.toLocaleLowerCase();
//         filterByType(tipo);
//     });
// });

