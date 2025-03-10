import React, { useState } from "react";

function PokemonCreateForm({ newItemCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function createPokemon() {
        try {
            const response = await fetch('http://localhost:8000/pokemons', { // Aangepast naar localhost
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    type: formData.type,
                    location: formData.location
                })
            });

            const data = await response.json();
            console.log(data);
            if (typeof newItemCreated === "function") {
                newItemCreated(data);
            }
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPokemon();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Create a New Pokémon</h2>

            <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 font-medium text-gray-700">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter the Pokémon name"
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
                    placeholder="Enter the Pokémon type"
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
                    placeholder="Enter the Pokémon location"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
                Submit
            </button>
        </form>
    );
}

export default PokemonCreateForm;
