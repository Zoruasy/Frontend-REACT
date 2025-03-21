import React, { useState } from "react";

function PokemonCreateForm({ newItemCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
    });

    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            // Alleen letters en spaties toestaan
            const isValid = /^[A-Za-z\s]+$/.test(value);
            setNameError(isValid ? "" : "Name can only contain letters and spaces.");
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function createPokemon() {
        try {
            setError(null);
            const response = await fetch('http://localhost:8000/pokemons', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to create Pokémon");
            }

            const data = await response.json();
            console.log(data);
            newItemCreated();
            setFormData({ name: '', type: '', location: '' });
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
            setError('Failed to create Pokémon. Please try again.');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nameError) {
            createPokemon();
        }
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
                    aria-label="Pokémon Name"
                />
                {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
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
                    aria-label="Pokémon Type"
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
                    aria-label="Pokémon Location"
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={!formData.name || !formData.type || !formData.location || nameError}
                className={`px-2 py-2 rounded-full text-lg font-bold transition-all 
                    ${formData.name && formData.type && formData.location && !nameError ?
                    "bg-yellow-400 text-blue-800 hover:bg-blue-600 hover:text-yellow-400 border-4 border-blue-800 shadow-lg transform hover:-translate-y-1 hover:scale-105"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"}
                `}
            >
                Submit
            </button>
        </form>
    );
}

export default PokemonCreateForm;
