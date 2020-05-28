/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-console */
// / <reference types ="jquery"/>

// let pagina = 10 //restarle un 0 al valor para saber la pagina actual.

// function cambioDePagina{
// 	let paginaActual = pagina

let URLListaPokemon = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset="
let paginador = 0


window.onload = crearListaPokemon(0)

//--------------- necesito que cada cosa este dentro de una funcion para poder cambiar de pagina limpiamente
function crearListaPokemon(offset) {
	fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`)
		.then((respuesta) => respuesta.json())
		.then((respuestaJSON) => {
			console.log(respuestaJSON)
			respuestaJSON.results.forEach((elemento) => {
				$(".ubicacion-grid-00").append(
					`<button class="btn btn-primary d-flex flex-nowrap border listaPokemon">${elemento.name}</button>`
				)
			})

		})
		.then((respuestaJSON) => {
			let listaPokemon = document.querySelectorAll(".listaPokemon")
			listaPokemon.forEach((pokemon) => {
				pokemon.onclick = () => {
					let pokemonSeleccionado = pokemon.textContent
					crearPokemon(pokemonSeleccionado)
				}
			}
			)
			return respuestaJSON
		})
}
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
			for (let i = 0; i < 6; i++) {
				$(`.habilidad${i}`).text(`${pokemonJSON.stats[i].stat.name} + ${pokemonJSON.stats[i].base_stat}`)
			}

		})
}

let botonSiguiente = document.querySelector(".boton-siguiente")
let botonAnterior = document.querySelector(".boton-anterior")
botonSiguiente.onclick = () => {
	crearListaPokemon(paginaSiguiente())
}

function paginaSiguiente(){
	paginador = paginador + 10
	return paginador
}

function paginaAnterior(){
	paginador = paginador - 10
	return paginador - 10
}