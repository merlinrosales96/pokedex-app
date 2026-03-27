import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Grid, Card, CardContent, CardActionArea, Typography, Pagination,
    Box, CardMedia, Chip, Container, IconButton, TextField, InputAdornment, Skeleton
} from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SearchIcon from '@mui/icons-material/Search';
import { m } from 'framer-motion';
import { itemsPerPage, PokemonCount, typeColors } from '../utils/Utils';
import { usePokemonList } from '../hooks/usePokemons';
import { Pokemon, PokemonDetail } from '../utils/Types';
import axios from '../utils/axios';

const PokedexSkeleton = () => (
    <Grid container spacing={3}>
        {[...Array(itemsPerPage)].map((_) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`pokedex-skeleton-${_}`}>
                <Card sx={{ borderRadius: '30px', bgcolor: '#fff', p: 2, border: '1px solid #e0e0e0', boxShadow: 'none' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Skeleton variant="circular" width={120} height={120} />
                    </Box>
                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                        <Skeleton variant="text" width="60%" sx={{ mx: 'auto', mb: 1 }} />
                        <Skeleton variant="rounded" width={80} height={24} sx={{ mx: 'auto', borderRadius: '12px' }} />
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = async () => {
        if (searchText.trim() !== "") {
            try {
                const response = await axios.get(`/pokemon/${searchText.toLowerCase().trim()}`);
                const pokemonData: PokemonDetail = response.data;

                if (pokemonData.id > 0 && pokemonData.id <= PokemonCount) {
                    navigate(`/pokemon/${pokemonData.id}`);
                } else {
                    showError('Pokémon out of range');
                }
            } catch (error) {
                showError('Pokémon not found');
            }
        } else {
            showError('Please type a Pokémon name');
        }
    };

    const showError = (msg: string) => {
        setServerity('error');
        setAlertMessage(msg);
        setOpen(true);
    };

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 12 }, mt: { xs: 8, md: 2 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Search Bar - Aesthetic Update */}
                <Box sx={{ width: '100%', maxWidth: 600, mb: 8 }}>
                    <TextField
                        fullWidth
                        placeholder="Search Pokémon..."
                        variant="outlined"
                        value={searchText}
                        onChange={handleChangeInput}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                bgcolor: '#fff',
                                border: '1px solid #e0e0e0',
                                transition: 'all 0.3s ease',
                                '&:hover': { border: '1px solid #bdbdbd' },
                                '&.Mui-focused': { boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }
                            }
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="disabled" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton color="error" onClick={handleSearch}>
                                            <CatchingPokemonIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Box>

                {loading ? (
                    <PokedexSkeleton />
                ) : (
                    <Grid container spacing={3}>
                        {data.map((pokemon: Pokemon, index: number) => {
                            const detail = pokemonDetails[pokemon.name];
                            const mainType = detail?.types[0].type.name || 'normal';
                            const themeColor = typeColors[mainType];

                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pokemon.name}>
                                    <m.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.03 }}
                                    >
                                        <Link to={`/pokemon/${detail?.id}`} style={{ textDecoration: 'none' }}>
                                            <Card
                                                sx={{
                                                    borderRadius: '30px',
                                                    bgcolor: '#fff',
                                                    border: '1px solid #e0e0e0',
                                                    boxShadow: 'none',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                        borderColor: themeColor,
                                                        boxShadow: `0 10px 30px ${themeColor}20`
                                                    }
                                                }}
                                            >
                                                <CardActionArea sx={{ p: 3 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                                        <CardMedia
                                                            component="img"
                                                            image={detail?.sprites.other['official-artwork'].front_default}
                                                            alt={pokemon.name}
                                                            sx={{ width: '130px', height: '130px', objectFit: 'contain' }}
                                                        />
                                                    </Box>
                                                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                                                        <Typography variant="body2" sx={{ opacity: 0.5, fontWeight: 800 }}>
                                                            #{detail?.id.toString().padStart(3, '0')}
                                                        </Typography>
                                                        <Typography variant="h6" sx={{ textTransform: 'capitalize', fontWeight: 800, color: '#333', mb: 1 }}>
                                                            {pokemon.name.replace("-", " ")}
                                                        </Typography>
                                                        <Chip
                                                            label={mainType.toUpperCase()}
                                                            size="small"
                                                            sx={{ bgcolor: themeColor, color: '#fff', fontWeight: 900, fontSize: '0.65rem' }}
                                                        />
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Link>
                                    </m.div>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
                    <Pagination
                        count={Math.ceil(PokemonCount / itemsPerPage)}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                        // Controlamos cuántos números se ven en móvil para que no se rompa el diseño
                        siblingCount={window.innerWidth < 600 ? 0 : 1}
                        boundaryCount={1}
                        size={window.innerWidth < 600 ? "small" : "large"}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                // Estilo exacto de PokemonInfo
                                backdropFilter: 'blur(10px)',
                                bgcolor: 'rgba(0,0,0,0.05)', // Gris muy suave y transparente
                                fontWeight: 700,
                                borderRadius: '10px', // Forma cuadrada redondeada moderna
                                border: '1px solid rgba(0,0,0,0.05)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.1)',
                                },
                                '&.Mui-selected': {
                                    bgcolor: '#333', // O el themeColor si prefieres
                                    color: '#fff',
                                    '&:hover': {
                                        bgcolor: '#000',
                                    }
                                }
                            }
                        }}
                    />
                </Box>
            </Box>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Pokedex;