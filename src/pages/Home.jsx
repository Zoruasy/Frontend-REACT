import { useNavigate } from "react-router"

export default function Home() {
    const navigate = useNavigate()

    const navigateToPokemons = () => {
        navigate("/pokemons")
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative">
                    <div className="bg-red-600 h-32 border-b-8 border-black"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 bg-white rounded-full border-8 border-black flex items-center justify-center z-10">
                        <div className="w-16 h-16 bg-white rounded-full border-4 border-black"></div>
                    </div>
                </div>

                {/* Main content */}
                <div className="p-8 pt-20 text-center">
                    <h1
                        className="text-6xl font-extrabold mb-6 text-yellow-400"
                        style={{ textShadow: "2px 2px 0 #3B4CCA, 4px 4px 0 rgba(0,0,0,0.1)" }}
                    >
                        Pokémon
                    </h1>

                    <p className="text-blue-800 mb-10 text-xl">
                        Welkom bij mijn Pokémon verzameling! Hier kun je mijn favoriete Pokémon ontdekken en nieuwe toevoegen. :)
                    </p>

                    <button
                        onClick={navigateToPokemons}
                        className="bg-yellow-400 text-blue-800 px-10 py-4 rounded-full text-xl font-bold transition-all hover:bg-blue-600 hover:text-yellow-400 border-4 border-blue-800 shadow-lg transform hover:-translate-y-1 hover:scale-105"
                    >
                        Ontdek alle Pokémon
                        <span className="ml-2 inline-block">→</span>
                    </button>
                </div>

                {/* Bottom part of the Pokéball */}
                <div className="bg-white h-16 border-t-8 border-black"></div>
            </div>
        </div>
    )
}

