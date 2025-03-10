import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="bg-red-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition-colors">
                            <span className="sr-only">Home</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </Link>
                        <Link to="/pokemons" className="text-lg font-semibold hover:text-yellow-300 transition-colors">
                            Pokémons
                        </Link>
                    </div>
                    <Link
                        to="/pokemons/create"
                        className="bg-yellow-400 text-blue-800 px-6 py-2 rounded-full font-bold transition-all hover:bg-blue-600 hover:text-yellow-400 border-2 border-white shadow-md hover:-translate-y-1 hover:scale-105"
                    >
                        Nieuwe Pokémon
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

