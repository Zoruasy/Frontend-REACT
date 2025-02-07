import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-xl font-bold">Home</Link>
                        <Link to="/pokemons" className="hover:text-blue-200">Pokemons</Link>
                    </div>
                    <Link
                        to="/pokemons/create"
                        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                    >
                        Nieuwe Pokemon
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;