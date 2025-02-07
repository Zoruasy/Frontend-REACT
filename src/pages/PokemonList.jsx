import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon.jsx"; // Zorg ervoor dat het pad correct is

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5; // Je kunt dit getal aanpassen

    async function fetchPokemons(page = 1) {
        try {
            const response = await fetch(`http://145.24.223.41:8000/pokemons?page=${page}&limit=${ITEMS_PER_PAGE}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            setPokemons(data.items);
            setPagination(data.pagination);
            console.log(data);
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

    useEffect(() => {
        fetchPokemons(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0); // Scroll naar boven bij paginawijziging
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <h1 className="text-6xl font-semibold text-center text-gray-900 mb-8">
                Pokémon 🐾
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {pokemons.map((pokemon) => (
                    <Pokemon key={pokemon.id} pokemon={pokemon} pokemonDeleted={() => fetchPokemons(currentPage)} />
                ))}
            </div>

            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination._links.previous}
                        className={`px-4 py-2 rounded ${
                            !pagination._links.previous
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination._links.next}
                        className={`px-4 py-2 rounded ${
                            !pagination._links.next
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {pagination && (
                <div className="text-center text-gray-600 mt-4">
                    Showing {pagination.currentItems} of {pagination.totalItems} Pokémon 🎮💥
                </div>
            )}
        </div>
    );
}

export default PokemonList;
