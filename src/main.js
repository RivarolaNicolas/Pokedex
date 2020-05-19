/* eslint-disable no-undef */
/* eslint-disable no-console */
// / <reference types ="jquery"/>

fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
	.then((respuesta) => respuesta.json())
	.then((respuestaJSON) => {
		console.log(respuestaJSON)
		respuestaJSON.results.forEach((elemento) => {
			$(".ubicacion-grid-00").append(
				`<button class="btn btn-primary d-flex flex-nowrap border listaPokemon">${elemento.name}</button>`
			)
		})
		return respuestaJSON
	})
	.then((respuestaJSON) => {
		let listaPokemon = document.querySelectorAll(".listaPokemon")
		listaPokemon.forEach((pokemon) => {
			pokemon.onclick = () => {
				let pokemonSeleccionado = pokemon.textContent
				crearPokemon(pokemonSeleccionado)
				textoPokemon(pokemonSeleccionado)
			}
		})
		return respuestaJSON
	})

function crearPokemon(pokemon) {
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		.then((pokemon) => pokemon.json())
		.then((pokemonJSON) => {
			$(".card-img-top").attr("src", `${pokemonJSON.sprites.front_default}`)
			$(".nombre-pokemon").text(
				`${
					pokemonJSON.species.name.charAt(0).toUpperCase() +
          pokemonJSON.species.name.substr(1).toLowerCase()
				}`
			)
			for (let i = 0; i < 7; i++) {
				$(`.habilidad${i}`).text(`${pokemonJSON.stats[i].stat.name} + ${pokemonJSON.stats[i].base_stat}`)
			}

		})
}

// function textoPokemon(pokemon) {
// 	fetch(`https://pokeapi.co/api/v2/pokedex/${pokemon}/`)
// 		.then(function(respuesta) {
// 			return respuesta.json()
// 		})
// 		.then(function(respuestaPokedex) {
// 			console.log(respuestaPokedex)
// 			return respuestaPokedex 
// 		})
// }

// {
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.name}`)
//     .then((respuestaPokemon) => respuestaPokemon.json())
//     .then((respuestaPokemonJSON) => {
//       console.log(respuestaPokemonJSON);
//     });
// }
