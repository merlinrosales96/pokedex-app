import { Box, AppBar, Container, Toolbar, Typography, /*Button*/ } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    variant="regular"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: '24px', // Un poco más redondeado
                        bgcolor: 'rgba(211, 47, 47, 0.8)', // Un rojo más sólido pero vibrante
                        backdropFilter: 'blur(12px)',
                        border: '2px solid rgba(255, 255, 255, 0.2)', // Borde sutil para resaltar
                        px: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={'/'} style={{ display: 'flex', color: 'inherit', textDecoration: 'none' }}>
                            <CatchingPokemonIcon
                                sx={{
                                    mr: 1.5,
                                    fontSize: '2rem',
                                    transition: 'transform 0.4s ease',
                                    '&:hover': { transform: 'rotate(180deg)' } // Giro al hacer hover
                                }}
                            />
                        </Link>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                fontSize: '1.1rem'
                            }}
                        >
                            Pokédex
                        </Typography>
                    </Box>

                    {/*
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                            component={Link} 
                            to="/" 
                            sx={{ 
                                color: 'white', 
                                borderRadius: '12px',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } 
                            }}
                        >
                            Inicio
                        </Button>
                        <Button 
                            component={Link} 
                            to="/items" 
                            sx={{ 
                                color: 'white', 
                                borderRadius: '12px',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } 
                            }}
                        >
                            Objetos
                        </Button>
                    </Box>
                    */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;