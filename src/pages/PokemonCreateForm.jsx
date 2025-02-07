import React, { useState } from 'react';

function CreatePokemon() {
    const [pokemonData, setPokemonData] = useState({
        name: '',
        type: '',
        region: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Functie om de input in de state bij te werken
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPokemonData({
            ...pokemonData,
            [name]: value,
        });
    };

    // Functie om het formulier te versturen
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/pokemons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(pokemonData),
            });

            if (!response.ok) {
                throw new Error('Er is iets misgegaan bij het toevoegen van de Pokémon');
            }

            setSuccess(true);  // Melding van succes
            setPokemonData({
                name: '',
                type: '',
                region: '', // Reset region naar lege waarde
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto bg-gray-50 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Create a New Pokémon</h1>

            {success && <p className="text-green-500 text-center mb-4">Pokémon toegevoegd!</p>}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={pokemonData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Pokémon Name"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Type</label>
                    <input
                        type="text"
                        name="type"
                        value={pokemonData.type}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Pokémon Type"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Region</label>
                    <input
                        type="text"
                        name="region"
                        value={pokemonData.region}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Pokémon Region (e.g., Kanto, Johto)"
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {loading ? 'Adding...' : 'Add Pokémon'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePokemon;
