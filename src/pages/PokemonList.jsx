"use client"

import { useEffect, useState } from "react"
import Pokemon from "./Pokemon.jsx"

function PokemonList() {
    const [pokemons, setPokemons] = useState([])
    const [pagination, setPagination] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const ITEMS_PER_PAGE = 5

    async function fetchPokemons(page = 1) {
        setIsLoading(true)
        setError(null)
        try {
            console.log(`Fetching: http://localhost:8000/pokemons?page=${page}&limit=${ITEMS_PER_PAGE}`)
            const response = await fetch(`http://localhost:8000/pokemons?page=${page}&limit=${ITEMS_PER_PAGE}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            })

            console.log("Response status:", response.status)
            console.log("Response headers:", response.headers)

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            console.log("Received data:", data)
            setPokemons(data.items)
            setPagination(data.pagination)
        } catch (error) {
            console.error("Detailed error:", error)
            setError("Er is een fout opgetreden bij het ophalen van de Pokémon.")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPokemons(currentPage)
    }, [currentPage])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
        window.scrollTo(0, 0)
    }

    if (isLoading) {
        return <div className="text-center mt-8">Laden...</div>
    }

    if (error) {
        return <div className="text-center mt-8 text-red-600">{error}</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <h1 className="text-6xl font-semibold text-center text-gray-900 mb-8">Pokémon </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {pokemons.map((pokemon) => (
                    <Pokemon key={pokemon.id} pokemon={pokemon} pokemonDeleted={() => fetchPokemons(currentPage)} />
                ))}
            </div>

            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination._links.previous || isLoading}
                        className={`px-4 py-2 rounded ${
                            !pagination._links.previous || isLoading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        aria-label="Previous page"
                    >
                        Previous
                    </button>

                    <span className="text-gray-700">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination._links.next || isLoading}
                        className={`px-4 py-2 rounded ${
                            !pagination._links.next || isLoading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        aria-label="Next page"
                    >
                        Next
                    </button>
                </div>
            )}

            {pagination && (
                <div className="text-center text-gray-600 mt-4">
                    Showing {pagination.currentItems} of {pagination.totalItems} Pokémon 🐉⚡
                </div>
            )}
        </div>
    )
}

export default PokemonList

