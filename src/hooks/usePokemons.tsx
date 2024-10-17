import { useState, useEffect } from "react";
import { PokemonDetail, Pokemon, UsePokemonListReturn, UsePokemonDataReturn } from "../utils/Types";
import { itemsPerPage, PokemonCount } from "../utils/Utils";
import axios from "../utils/axios";

export const usePokemonList = (page: number): UsePokemonListReturn => {
    const [data, setData] = useState<Pokemon[]>([]);
    const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetail }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [responseCount, setResponseCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const offset = (page - 1) * itemsPerPage;
                const limit = Math.min(itemsPerPage, PokemonCount - offset);
                const response = await axios.get<{ count: number; results: Pokemon[] }>(
                    `/pokemon?limit=${limit}&offset=${offset}`
                );

                setData(response.data.results);
                setResponseCount(response.data.count);

                const detailsRequests = response.data.results.map(async (pokemon) => {
                    const detailResponse = await axios.get<PokemonDetail>(pokemon.url);
                    return { name: pokemon.name, detail: detailResponse.data };
                });

                const details = await Promise.all(detailsRequests);
                const detailsMap = details.reduce((acc, { name, detail }) => {
                    acc[name] = detail;
                    return acc;
                }, {} as { [key: string]: PokemonDetail });

                setPokemonDetails(detailsMap);

            } catch (err) {
                setError('Error fetching data');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    return { data, pokemonDetails, loading, error, responseCount };
};

export const usePokemonById = (page: number): UsePokemonDataReturn => {
    const [data, setData] = useState<PokemonDetail>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/pokemon/${page}`);
                setData(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    return { data, loading };
};

export const usePokemonByName = (name: string): UsePokemonDataReturn => {
    const [data, setData] = useState<PokemonDetail>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/pokemon/${name.toLowerCase()}`);
                setData(response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [name]);

    return { data, loading };
};