import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

function PokemonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPokemon();
    }, [id]);

    async function loadPokemon() {
        try {
            const response = await fetch(`http://localhost:8000/pokemons/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Pokémon niet gevonden');
            }

            const data = await response.json();
            setPokemon(data);
            setFormData({
                name: data.name,
                type: data.type,
                location: data.location
            });
            setError(null); // Reset error state if successful
        } catch (error) {
            setError(error.message);
            setPokemon(null); // Clear pokemon state if there's an error
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/pokemons/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsEditing(false);
                loadPokemon(); // Reload the updated Pokémon details
            } else {
                console.error('Update failed');
            }
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    };

    // 404 afhandeling
    if (error) {
        return (
            <div className="text-center text-red-600">
                <h1>404: Pokémon niet gevonden!</h1>
                <p>{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-full text-lg font-bold transition-all hover:bg-blue-600 hover:text-yellow-400 border-4 border-blue-800 shadow-lg transform hover:-translate-y-1 hover:scale-105"
                >
                    Terug naar startpagina
                </button>
            </div>
        );
    }

    if (!pokemon) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            {!isEditing ? (
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">{pokemon.name}</h1>
                    <p className="text-gray-700">Type: {pokemon.type}</p>
                    <p className="text-gray-600 italic">Location: {pokemon.location}</p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-400 text-blue-800 px-2 py-1 rounded-full text-lg font-bold transition-all hover:bg-blue-600 hover:text-yellow-400 border-4 border-blue-800 shadow-lg transform hover:-translate-y-1 hover:scale-105"
                        >
                            Edit Pokémon
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Pokémon</h2>

                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="type" className="mb-2 font-medium text-gray-700">Type:</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="location" className="mb-2 font-medium text-gray-700">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-full text-lg font-bold transition-all hover:bg-blue-600 hover:text-yellow-400 border-4 border-blue-800 shadow-lg transform hover:-translate-y-1 hover:scale-105"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                loadPokemon();
                            }}
                            className="bg-yellow-400 text-blue-800 px-2 py-1 rounded-full text-lg font-bold transition-all hover:bg-blue-600 hover:text-yellow-400 border-4 border-blue-800 shadow-lg transform hover:-translate-y-1 hover:scale-105"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default PokemonDetail;
