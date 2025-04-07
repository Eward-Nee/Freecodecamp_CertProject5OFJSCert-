let inText;
const DefaultBody = "  <input type='text' id='search-input' placeholder='Search' required><button id='search-button' onclick='fetchData()'>Search</button><h2 id='pokemon-name'>Pokemon Name</h2><p id='pokemon-id'>Pokemon Id</p><p id='weight'>Weight</p><p id='height'>Height</p><p id='types'>Types</p><p id='hp'>HP</p><p id='attack'>Attack</p><p id='defense'>Defense</p><p id='special-attack'>Special Attack</p><p id='special-defense'>Special Defense</p><p id='speed'>Speed</p>";


function getTypes(data) {
    let sTypes = "";
    data.types.forEach(type => {
        sTypes += `<p>${type.type.name}</p>`;
    });

    return sTypes;

}

function ConfigureDom() {
    inText = "";
    document.getElementsByTagName("body")[0].innerHTML = DefaultBody;
}

function changeOutput(data) {
    console.log(data)
    document.getElementsByTagName("body")[0].innerHTML = `<img src="${data.sprites.front_default}" id="sprite"><br>` + document.getElementsByTagName("body")[0].innerHTML;
    document.getElementById("pokemon-name").innerText = data.name;
    document.getElementById("pokemon-id").innerText = "#" + data.id;
    document.getElementById("weight").innerText = "Weight: " + data.weight;
    document.getElementById("height").innerText = "Height: " + data.height;
    document.getElementById("types").innerHTML = getTypes(data);
    document.getElementById("hp").innerText = data.stats[0].base_stat;
    document.getElementById("attack").innerText = data.stats[1].base_stat;
    document.getElementById("defense").innerText = data.stats[2].base_stat;
    document.getElementById("special-attack").innerText = data.stats[3].base_stat;
    document.getElementById("special-defense").innerText = data.stats[4].base_stat;
    document.getElementById("speed").innerText = data.stats[5].base_stat;
}

async function fetchData() {
    const input = document.getElementById("search-input");
    ConfigureDom();
    inText = input.value;
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inText.toLowerCase()}`);

        if (!response.ok) {
            throw new Error("Pokémon not found");
        } else {
            const data = await response.json();
            changeOutput(data);
        }
    } catch (error) {
        alert("Pokémon not found");
    }

}