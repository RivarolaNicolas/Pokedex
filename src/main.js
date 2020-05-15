/* eslint-disable no-console */
// / <reference types ="jquery"/>

fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
  .then((respuesta) => respuesta.json())
  .then((respuestaJSON) => {
    console.log(respuestaJSON);
    respuestaJSON.results.forEach((elemento) => {
      $(".ubicacion-grid-00").append(
        `<button class="btn btn-primary d-flex flex-nowrap border listaPokemon">${elemento.name}</button>`
      );
    });
    return respuestaJSON;
  })
  .then((respuestaJSON) => {
    let listaPokemon = document.querySelectorAll(".listaPokemon");
    console.log(respuestaJSON);
    listaPokemon.forEach((pokemon) => {
      pokemon.onclick = () => {
        let pokemonSeleccionado = pokemon.textContent;
        crearPokemon(pokemonSeleccionado);
      };
    });
    return respuestaJSON;
  });

function crearPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((pokemon) => pokemon.json())
    .then((pokemonJSON) => {
      console.log(pokemonJSON);
      $(".card-img-top").attr("src", `${pokemonJSON.sprites.front_default}`);
    });

  console.log(pokemon);
}

// {
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.name}`)
//     .then((respuestaPokemon) => respuestaPokemon.json())
//     .then((respuestaPokemonJSON) => {
//       console.log(respuestaPokemonJSON);
//     });
// }
