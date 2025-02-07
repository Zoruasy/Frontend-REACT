import React from "react";
import { Link } from "react-router"; // Als je "react-router" gebruikt

function Pokemon({ pokemon, pokemonDeleted }) {
    const deletePokemon = async (id) => {
        try {
            const result = await fetch(`http://145.24.223.41:8000/pokemons/${id}`, {
                headers: {
                    Accept: "application/json",
                },
                method: "DELETE",
            });

            if (result.status === 204) {
                pokemonDeleted();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <article>
            <h1 className="text-3xl">{pokemon.name}</h1>
            <Link to={`/pokemons/${pokemon.id}`} className="font-bold text-green-800">
                Read more
            </Link>
            <button onClick={() => deletePokemon(pokemon.id)} className="text-red-600">
                Delete Pokémon
            </button>
        </article>
    );
}

export default Pokemon;
