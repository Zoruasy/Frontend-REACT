import React from "react";
import { useNavigate } from "react-router";

function Pokemon({ pokemon, pokemonDeleted }) {
    const navigate = useNavigate();

    const deletePokemon = async (id) => {
        try {
            const result = await fetch(`http://localhost:8000/pokemons/${id}`, {
                headers: {
                    Accept: "application/json",
                },
                method: "DELETE",
            });

            if (result.status === 204) {
                pokemonDeleted(id); // Geef het ID door om de lijst bij te werken
                alert("Pokémon succesvol verwijderd!");
            } else {
                const errorText = await result.text(); // Lees de foutmelding van de server
                alert(`Fout bij het verwijderen van de Pokémon: ${errorText}`);
            }
        } catch (e) {
            console.log(e);
            alert("Er is een fout opgetreden bij het verwijderen van de Pokémon.");
        }
    };

    const viewDetails = () => {
        navigate(`/pokemons/${pokemon.id}`);
    };

    return (
        <article className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{pokemon.name}</h1>
            <button
                onClick={viewDetails}
                className="font-bold text-blue-800 hover:text-blue-600 transition-colors duration-200"
            >
                Read more
            </button>
            <button
                onClick={() => deletePokemon(pokemon.id)}
                className="text-red-600 hover:text-red-800 font-medium bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors duration-200"
            >
                Delete Pokémon
            </button>
        </article>
    );
}

export default Pokemon;
