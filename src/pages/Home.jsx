import React from 'react';
import { useNavigate } from 'react-router'; // Gebruik useNavigate van react-router

function Home() {
    const navigate = useNavigate(); // Haal navigate op voor navigatie

    const navigateToPokemons = () => {
        navigate('/pokemons'); // Navigeer naar de Pokémon lijst
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 text-center bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg shadow-lg">
            <h1 className="text-5xl font-extrabold text-white mb-6">
                Welkom op m'n awesome pokemon website
            </h1>
            <p className="text-gray-100 mb-8 text-lg">
                Beheer je Pokémon collectie met deze applicatie.
            </p>
            <div className="flex justify-center">
                <button
                    onClick={navigateToPokemons} // Klik om naar de Pokémon lijst te gaan
                    className="bg-black text-yellow-400 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:bg-yellow-400 hover:text-black hover:scale-105"
                >
                    Bekijk alle Pokémon
                </button>
            </div>
        </div>
    );
}

export default Home;
