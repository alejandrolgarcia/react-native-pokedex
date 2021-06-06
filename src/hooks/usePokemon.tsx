import { useEffect, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonDetails } from '../interfaces/pokemonInterfaces';

export const usePokemon = ( id: string ) => {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonDetails>({} as PokemonDetails);

    const loadPokemon = async () => {
        const resp = await pokemonApi.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
        setPokemon( resp.data );
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemon();
    }, []);

    return {
        isLoading,
        pokemon,
    }

}