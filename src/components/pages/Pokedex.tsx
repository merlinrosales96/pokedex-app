import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Grid, Card, CardContent, CardActionArea, Typography, Pagination, Box, CardMedia, CircularProgress } from '@mui/material';

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonDetail {
    sprites: {
        front_default: string;
        other: {
            "official-artwork": {
                front_default: string;
            }
        }
    };
}

const Pokedex: React.FC = () => {
    const [responseCount, setResponse] = useState<number>(0);
    const [data, setData] = useState<Pokemon[]>([]);
    const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetail }>({});
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const itemsPerPage = 20;


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`);
                setData(response.data.results);
                setResponse(response.data.count);

                // Fetch details for each Pokémon
                const detailsRequests = response.data.results.map(async (pokemon: Pokemon) => {
                    const detailResponse = await axios.get<PokemonDetail>(pokemon.url);
                    return { name: pokemon.name, detail: detailResponse.data };
                });

                const details = await Promise.all(detailsRequests);
                const detailsMap = details.reduce((acc, { name, detail }) => {
                    acc[name] = detail;
                    return acc;
                }, {} as { [key: string]: PokemonDetail });
                setPokemonDetails(detailsMap);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedData = data.slice(0, itemsPerPage); // Limitar los elementos para la primera página
    if (data.length > 0) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);
    }

    if (loading) {
        return (
            <Box sx={{ pt: 16, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ pt: 16 }}>
            <Grid container>
                <Grid container spacing={2}>
                    {paginatedData.map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.name}>
                            <Card>
                                <CardActionArea>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CardMedia
                                            className=''
                                            component="img"
                                            sx={{
                                                width: "40%",
                                                height: "40%", // Ajusta la altura según tu diseño
                                                // Cambia a 'contain' si prefieres que la imagen no se recorte
                                            }}
                                            image={pokemonDetails[item.name]?.sprites.other['official-artwork'].front_default || 'default-image-url'}
                                            alt={item.name}
                                        />
                                    </Box>
                                    <CardContent>
                                        <Typography className='capitalize-text' variant="h5" color="text.primary">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={Math.ceil(responseCount / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                    sx={{ marginTop: 2 }}
                />
            </Grid>
        </Box>
    );
};

export default Pokedex;