import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from "./components/Layout.jsx";
import PokemonList from "./pages/PokemonList.jsx";
import PokemonCreateForm from "./pages/PokemonCreateForm.jsx";
import PokemonDetail from "./pages/PokemonDetail.jsx";
import PokemonEditForm from "./pages/PokemonEditForm.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/pokemons',
                element: <PokemonList />
            },
            {
                path: '/pokemons/create',
                element: <PokemonCreateForm />
            },
            {
                path: '/pokemons/:id',
                element: <PokemonDetail />
            },
            {
                path: '/pokemons/:id/edit',
                element: <PokemonEditForm />
            },
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
