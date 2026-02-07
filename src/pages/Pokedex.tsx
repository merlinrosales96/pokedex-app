import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Grid, Card, CardContent, CardActionArea, Typography, Pagination, Tooltip,
    Box, CardMedia, Chip, Container, IconButton, TextField, InputAdornment, Skeleton
} from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { itemsPerPage, PokemonCount, typeColors } from '../utils/Utils';
import { usePokemonList } from '../hooks/usePokemons';
import { Pokemon, PokemonDetail } from '../utils/Types';
import axios from '../utils/axios';

// Componente para mostrar mientras carga
const PokedexSkeleton = () => (
    <Grid container spacing={3}>
        {[...Array(itemsPerPage)].map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <Card sx={{ borderRadius: '20px', bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Skeleton variant="circular" width={140} height={140} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                    </Box>
                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                        <Skeleton variant="text" width="60%" sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
                        <Skeleton variant="rounded" width={60} height={24} sx={{ mx: 'auto', borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.1)' }} />
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
);

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

    const handleKeyPress = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            await SearchPokemon();
        }
    }

    const SearchPokemon = async () => {
        if (searchText !== "") {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/pokemon/${searchText.replace(" ", "-").toLowerCase()}`);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching data:', error);
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
            } else {
                setServerity('error');
                setAlertMessage('Pokémon not found');
                setOpen(true);
            }
        } else {
            setServerity('warning');
            setAlertMessage('You must type a Pokémon name');
            setOpen(true);
        }
    }

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 12 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Search Bar remains visible during loading */}
                <Box sx={{ width: '100%', maxWidth: 600, mb: 8 }}>
                    <TextField
                        fullWidth
                        placeholder="Search by name or ID..."
                        variant="outlined"
                        value={searchText}
                        onChange={handleChangeInput}
                        onKeyPress={handleKeyPress}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="disabled" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Search Pokémon">
                                        <IconButton color="error" onClick={SearchPokemon}>
                                            <CatchingPokemonIcon />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>

                {/* Conditional Rendering: Skeleton vs Data */}
                {loading ? (
                    <PokedexSkeleton />
                ) : (
                    <Grid container spacing={3} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {data.map((pokemon: Pokemon, index: number) => {
                            const detail = pokemonDetails[pokemon.name];
                            const mainType = detail?.types[0].type.name || 'normal';
                            const themeColor = typeColors[mainType];

                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pokemon.name}>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link to={`/pokemon/${detail?.id}`} style={{ textDecoration: 'none' }}>
                                            <Card
                                                sx={{
                                                    borderRadius: '20px',
                                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                                    backdropFilter: 'blur(10px)',
                                                    border: `2px solid rgba(255,255,255,0.1)`,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-8px)',
                                                        border: `2px solid ${themeColor}`,
                                                        boxShadow: `0 12px 30px ${themeColor}44`
                                                    }
                                                }}
                                            >
                                                <CardActionArea sx={{ p: 2 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                                        <CardMedia
                                                            component="img"
                                                            image={detail?.sprites.other['official-artwork'].front_default}
                                                            alt={pokemon.name}
                                                            sx={{
                                                                width: '140px',
                                                                height: '140px',
                                                                objectFit: 'contain',
                                                                filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.1))'
                                                            }}
                                                        />
                                                    </Box>
                                                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1, color: 'text.primary' }}
                                                        >
                                                            {pokemon.name.replace("-", " ")}
                                                        </Typography>
                                                        <Chip
                                                            label={`#${detail?.id.toString().padStart(3, '0')}`}
                                                            sx={{
                                                                backgroundColor: themeColor,
                                                                color: '#fff',
                                                                fontWeight: 'bold',
                                                                fontSize: '0.75rem'
                                                            }}
                                                        />
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}

                <Pagination
                    count={Math.ceil(PokemonCount / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                    size="large"
                    sx={{ mt: 8, '& .MuiPaginationItem-root': { borderRadius: '10px' } }}
                />
            </Box>
        </Container>
    );
};

export default Pokedex;