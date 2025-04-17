import { Box, AppBar, Container, Toolbar, Typography } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Link } from 'react-router-dom';


function NavBar() {


    return (
        <AppBar position="fixed"
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
                        flexShrink: 0,
                        borderRadius: '20px',
                        bgcolor: 'rgba(211, 47, 47, 0.7)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Link to={'/'}>
                        <CatchingPokemonIcon sx={{ mr: 1 }} />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pokédex
                    </Typography>
                    <Box>
                        {/* Add other options */}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;