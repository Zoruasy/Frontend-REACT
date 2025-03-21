import { useState, useEffect } from "react";
import Pokemon from "./Pokemon.jsx";

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const ITEMS_PER_PAGE = 5;

    const types = [
        "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison",
        "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark",
        "Steel", "Fairy"
    ];

    async function fetchPokemons() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8000/pokemons`, {
                method: "GET",
                headers: { Accept: "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setPokemons(data.items);
            setFilteredPokemons(data.items);
        } catch (error) {
            setError("Er is een fout opgetreden bij het ophalen van de Pokémon.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemons();
    }, []);

    useEffect(() => {
        filterPokemons();
    }, [searchQuery, selectedType, pokemons]);

    const filterPokemons = () => {
        let filtered = [...pokemons];

        if (searchQuery) {
            filtered = filtered.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedType) {
            filtered = filtered.filter((pokemon) => pokemon.type.toLowerCase() === selectedType.toLowerCase());
        }

        setFilteredPokemons(filtered);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

    const handlePokemonDeleted = (deletedId) => {
        setPokemons((prevPokemons) => prevPokemons.filter((p) => p.id !== deletedId));
    };

    const currentItems = filteredPokemons.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (isLoading) {
        return <div className="text-center mt-8 text-yellow-400">Laden...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8 pt-20 text-center">
                    <h1 className="text-6xl font-extrabold mb-6 text-yellow-400">Pokémon</h1>

                    <p className="text-blue-800 mb-10 text-xl">Bekijk en ontdek mijn Pokémon collectie!</p>

                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Zoek op naam"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border rounded-md mr-4"
                        />

                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="p-2 border rounded-md"
                        >
                            <option value="">Filter op type</option>
                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {currentItems.map((pokemon) => (
                            <Pokemon key={pokemon.id} pokemon={pokemon} pokemonDeleted={handlePokemonDeleted} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || isLoading}
                            className={`px-6 py-3 rounded-lg transition-all bg-blue-800 text-white hover:bg-blue-900 ${
                                currentPage === 1 || isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            aria-label="Previous page"
                        >
                            ← Previous
                        </button>

                        <span className="text-gray-700">
                            Page {currentPage} of {Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE)}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE) || isLoading}
                            className={`px-6 py-3 rounded-lg transition-all bg-blue-800 text-white hover:bg-blue-900 ${
                                currentPage === Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE) || isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            aria-label="Next page"
                        >
                            Next →
                        </button>
                    </div>

                    <div className="text-center text-gray-600 mt-4">
                        Showing {currentItems.length} of {filteredPokemons.length} Pokémon
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonList;
