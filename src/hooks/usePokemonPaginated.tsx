import { useRef, useEffect, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi'
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
    
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPage = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemon = async() => {
        
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPage.current);
        nextPage.current = resp.data.next;
        mapPokemonList(resp.data.results);
    }

    const mapPokemonList = ( pokemonList: Result[] ) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
            
            const urlParts = url.split('/'); // Divido el url en un arrelgo, para luego extraer el id
            const id = urlParts[ urlParts.length - 2 ]; // Obtengo el id del pokemon
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`;

            return { name, id, picture }
        });

        setSimplePokemonList([ ...simplePokemonList, ...newPokemonList ]);
    }

    useEffect(() => {
        loadPokemon();
    }, [])

    return {
        simplePokemonList
    }
}
