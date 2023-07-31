const containerPokemons = document.querySelector(".grid");
const showMoreButton = document.querySelector(".buttonMore");
let cards = document.querySelector(".cartas");
let filtertype = document.querySelector(".filter");


let pokeAPI = "https://pokeapi.co/api/v2";
let template = "";
let loadPokemons = 8;
let initialPokemons = 0;
let filter = undefined;
let auxFilter = undefined;

async function loadData() {
    try {
        containerPokemons.innerHTML = `<img class="loader" src="./assets/loader.gif" alt="Cargando...">`;

        const res1 = await fetch(`${pokeAPI}/pokemon/`);
        const data1 = await res1.json();

        let limit = data1.count

        const res = await fetch(`${pokeAPI}/pokemon/?offset=${0}&limit=${limit}"`);
        const data = await res.json();
        // console.log("hola",res);

        localStorage.setItem("Pokemones", JSON.stringify(data));


    } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrió un error";
        containerPokemons.innerHTML = `<p> Error ${err.status}:${message}</p>`;
    }
}

async function filterPokemons(filter) {

    let data = JSON.parse(localStorage.getItem("Pokemones"));
    let res;
    let resType;
    let dataType;

    if (filter === undefined || filter === "all") {
        res = data.results
        console.log("estoy en todo")
        // console.log("Aqui el res:",res);
        return res
    } else

        resType = await fetch(`${pokeAPI}/type/${filter}`);
    dataType = await resType.json();
    res = dataType.pokemon
    // console.log("Aqui el res:",res);
    console.log("Estoy en", filter);
    // console.log(res[1].pokemon.url)
    return res
}



async function printPokemons(filter) {

    let auxFilter1 = filter
    if (auxFilter != auxFilter1) {
        auxFilter = auxFilter1;
        template = ""
        loadPokemons = 8;
        initialPokemons = 0;
    }

    let datafilter = await filterPokemons(filter);
    // console.log(datafilter)


    for (let i = initialPokemons; i < loadPokemons; i++) {

        try {

            let res;
            let pokemon;

            if (filter === undefined || filter === "all") {
                res = await fetch(datafilter[i].url);
                // console.log(res,pokemon)
            } else if (filter !== undefined && filter !== "all") {
                // console.log("Si se cumplio el filtro de", filter)
                // console.log(datafilter[i].pokemon.url)
                res = await fetch(datafilter[i].pokemon.url);
            }
            pokemon = await res.json();

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
    // console.log(template);
    containerPokemons.innerHTML = template;
    cards.textContent = `${loadPokemons} cards`;
}


filtertype.addEventListener("click", (e) => {
    let navFilter = document.querySelector(".active");
    navFilter.classList.replace('active','inactive');
    e.target.classList.replace('inactive','active');
    e.preventDefault();
    if (e.target.matches(".filter li")) {
        e.preventDefault();
        filter = e.target.textContent.toLowerCase();
    }
    // console.log(filter);
    filterPokemons(filter);
    printPokemons(filter);
});

showMoreButton.addEventListener("click", (e) => {
    loadPokemons += 8;
    initialPokemons += 8;
    cards.textContent = `${loadPokemons} cards`;
    printPokemons(filter);
    e.preventDefault();

});

document.addEventListener("DOMContentLoaded", (e) => loadData());
document.addEventListener("DOMContentLoaded", (e) => printPokemons());
