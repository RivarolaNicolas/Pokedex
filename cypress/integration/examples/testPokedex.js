/* eslint-disable no-undef */
const URL = '127.0.0.1:8080';

describe('Basic testing of the Pokedex', () => {
  it('opens the pokedex', () => {
    cy.visit(URL);
  });
  it('loads bulbasaur by default', () => {
    cy.get('.nombre-pokemon').should('have.text', 'Bulbasaur');
  });
  it('goes forward and backwards in the list of pokemons', () => {
    cy.get('.listaPokemon').eq(0).then((pokemon) => {
      const nombrePokemon = pokemon.text();
      cy.get('.boton-siguiente').click().then(() => {
        cy.get('.listaPokemon').eq(0).should((nuevoPokemon) => {
          expect(nuevoPokemon.text()).not.to.eq(nombrePokemon);
        });
      });
    });
  });
  it('shows the chosen pokemon', () => {
    cy.get('.listaPokemon').eq(3).then((pokemon) => {
      const nombrePokemon = pokemon.text();
      cy.get('.listaPokemon').eq(3).click().then(() => {
        cy.get('.listaPokemon').eq(3).should((nuevoNombrePokemon) => {
          expect(nombrePokemon).not.to.eq(nuevoNombrePokemon);
        });
      });
    });
  });
});
/*     const defaultPokemonList = cy.get('.listaPokemon').each((element) => {
      defaultPokemonList.push(element.textContent);
    });
    cy.get('.boton-siguiente').click();
    const newPokemonList = cy.get('.listaPokemon').each((element) => {
      newPokemonList.push(element.textContent);
    });
    for (let i = 0; i <= 9; i++) {
      newPokemonList.should('not.contain', defaultPokemonList);
    } */
