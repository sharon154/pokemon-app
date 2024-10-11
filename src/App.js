// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import './App.css';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
                const pokemonData = await Promise.all(
                    response.data.results.map(async (pokemon) => {
                        const res = await axios.get(pokemon.url);
                        return res.data;
                    })
                );
                setPokemons(pokemonData);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };
        fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Pokemon List</h1>
            <input
                type="text"
                placeholder="Search Pokemon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="pokemon-container">
                {filteredPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default App;
