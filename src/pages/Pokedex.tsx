import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Grid, Card, CardContent, CardActionArea, Typography, Pagination, Tooltip,
    Box, CardMedia, Chip, Container, IconButton, CircularProgress, TextField
} from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { itemsPerPage, PokemonCount, typeColors } from '../utils/Utils';
import { usePokemonList } from '../hooks/usePokemons';
import { Pokemon, PokemonDetail } from '../utils/Types';
import axios from '../utils/axios';

const Pokedex: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(id ? parseInt(id) : 1);
    const [searchText, setSearchText] = useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [severity, setServerity] = useState<'success' | 'error' | 'info' | 'warning'>('warning');
    const { data, pokemonDetails, loading } = usePokemonList(page);

    useEffect(() => {
        const numId = id ? parseInt(id, 10) : 1;
        if (isNaN(numId) || numId < 1 || numId > Math.ceil(PokemonCount / itemsPerPage)) {
            navigate('/not-found');
        }
    }, [id, navigate]);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        navigate(`/pokedex/${value}`);
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    if (loading) {
        return (
            <Box sx={{ pt: 16, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleKeyPress = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            await SearchPokemon();
        }
    }

    const SearchPokemon = async () => {
        if (searchText !== "") {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/pokemon/${searchText.toLowerCase()}`);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                }
            };
            const pokemonData: PokemonDetail = await fetchData();
            if (pokemonData !== undefined) {
                if (pokemonData.id > 0 && pokemonData.id < PokemonCount + 1) {
                    navigate(`/pokemon/${pokemonData.id}`);
                } else {
                    setServerity('error');
                    setAlertMessage('Pokémon not found');
                    setOpen(true);
                }
            }
            else {
                setServerity('error');
                setAlertMessage('Pokémon not found');
                setOpen(true);
            }
        }
        else {
            setServerity('warning');
            setAlertMessage('You must type a Pokémon name');
            setOpen(true);
        }
    }

    const handleClose = (
        _?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Box component="section" id="projects" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 6 }}>
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 16, gap: 3 }}>
                <Box component="div">
                    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ mt: 3, pb: 8 }}>
                            Pokédex
                        </Typography>

                        <Grid container spacing={0} sx={{ mb: 5 }}>
                            <Grid size={{ xs: 11 }}>
                                <TextField
                                    id="filled-search"
                                    label="Search by name"
                                    type="search"
                                    variant="outlined"
                                    color="error"
                                    value={searchText}
                                    onChange={handleChangeInput}
                                    onKeyPress={handleKeyPress}
                                    fullWidth
                                />
                            </Grid>

                            <Grid size={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title="Search Pokémon">
                                    <IconButton color="error" onClick={SearchPokemon}>
                                        <CatchingPokemonIcon sx={{ fontSize: '32px' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert
                                onClose={handleClose}
                                severity={severity}
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                {alertMessage}
                            </Alert>
                        </Snackbar>

                        <Grid container spacing={3}>
                            {data.map((pokemon: Pokemon) => (
                                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={pokemon.name}>
                                    <Link to={`/pokemon/${pokemonDetails[pokemon.name]?.id}`}>
                                        <Card sx={{ border: `2px solid ${typeColors[pokemonDetails[pokemon.name]?.types[0].type.name]}` }}>
                                            <CardActionArea>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <CardMedia
                                                        className=''
                                                        component="img"
                                                        sx={{
                                                            width: {
                                                                xs: "90%",
                                                            },
                                                            height: {
                                                                xs: "90%",
                                                            },
                                                            objectFit: "contain",
                                                        }}
                                                        image={pokemonDetails[pokemon.name]?.sprites.other['official-artwork'].front_default || 'default-image-url'}
                                                        alt={pokemon.name}
                                                    />
                                                </Box>
                                                <CardContent>
                                                    <Typography className='capitalize-text' variant="body2" color="text.primary" display="block" gutterBottom>
                                                        {pokemon.name}
                                                    </Typography>
                                                    <Chip
                                                        label={`# ${pokemonDetails[pokemon.name]?.id.toString().padStart(PokemonCount.toString().length, '0')}`}
                                                        sx={{
                                                            backgroundColor: `${typeColors[pokemonDetails[pokemon.name]?.types[0].type.name]}`,
                                                            color: '#FFFFFF',
                                                        }}
                                                    />
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>

                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                        <Pagination
                            count={Math.ceil(PokemonCount / itemsPerPage)}
                            page={page}
                            onChange={handleChange}
                            sx={{ marginTop: 2 }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Pokedex;