/* eslint-disable no-console */
// / <reference types ="jquery"/>

let paginador = 0;
const botonSiguiente = document.querySelector('.boton-siguiente');
const botonAnterior = document.querySelector('.boton-anterior');

window.onload = crearListaPokemon(0), crearPokemon('bulbasaur');

function paginaSiguiente() {
  paginador += 10;
  return paginador;
}

function paginaAnterior() {
  paginador -= 10;
  if (paginador < 0) {
    alert('Estas en el principio de la lista de Pokemones');
    paginador = 0;
    return paginador;
  }
  return paginador;
}

function borrarListaPokemonVieja() {
  $('.listaPokemon').remove();
}

function crearPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((pokemon) => pokemon.json())
    .then((pokemonJSON) => {
      $('.card-img-top').attr('src', `${pokemonJSON.sprites.front_default}`);
      $('.nombre-pokemon').text(
        `${
          pokemonJSON.species.name.charAt(0).toUpperCase()
          + pokemonJSON.species.name.substr(1).toLowerCase()
        }`,
      );
      for (let i = 0; i < 6; i++) {
        $(`.habilidad${i}`).text(
          `${pokemonJSON.stats[i].stat.name} + ${pokemonJSON.stats[i].base_stat}`,
        );
      }
    });
}

function crearListaPokemon(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      borrarListaPokemonVieja();
      respuestaJSON.results.forEach((elemento) => {
        $('.ubicacion-grid-00').append(
          `<button class="btn btn-primary d-flex flex-nowrap border listaPokemon">${elemento.name}</button>`,
        );
      });
    })
    .then((respuestaJSON) => {
      const listaPokemon = document.querySelectorAll('.listaPokemon');
      listaPokemon.forEach((pokemon) => {
        pokemon.onclick = () => {
          const pokemonSeleccionado = pokemon.textContent;
          crearPokemon(pokemonSeleccionado);
        };
      });
      return respuestaJSON;
    });
}

botonSiguiente.onclick = () => {
  crearListaPokemon(paginaSiguiente());
};
botonAnterior.onclick = () => {
  crearListaPokemon(paginaAnterior());
};
