import { Box, Typography, Button, Container } from "@mui/material";
import { Image } from "../components/common/Image";
import logo from "../assets/images/pokeball-logo.webp";
import banner from '../assets/images/banner.webp';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { motion } from "framer-motion";

const Home = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                // Updated gradient for better text readability
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.85)), url(${banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="sm" sx={{ textAlign: 'center', zIndex: 1 }}>
                {/* Floating Logo Animation */}
                <Box
                    component={motion.div}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        image={logo}
                        alt="Pokédex Logo"
                        className="w-64 h-64 mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    />
                </Box>

                <Typography
                    variant="h2"
                    sx={{
                        color: 'white',
                        fontWeight: 900,
                        mt: 4,
                        letterSpacing: '4px',
                        textShadow: '0px 4px 10px rgba(0,0,0,0.5)',
                        fontFamily: 'PokemonGB, sans-serif',
                        fontSize: { xs: '1.8rem', md: '3rem' }
                    }}
                >
                    POKÉDEX
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        color: 'rgba(255,255,255,0.7)',
                        mb: 5,
                        fontWeight: 400,
                        letterSpacing: '3px',
                        fontSize: { xs: '0.9rem', md: '1.1rem' },
                        textTransform: 'uppercase'
                    }}
                >
                    The Ultimate Pokémon Encyclopedia
                </Typography>

                <Button
                    href="/pokedex/1"
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{
                        px: 8,
                        py: 2,
                        borderRadius: '100px', // Full pill shape
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        boxShadow: '0 8px 32px rgba(255, 28, 28, 0.4)',
                        '&:hover': {
                            transform: 'scale(1.08)',
                            boxShadow: '0 12px 40px rgba(255, 28, 28, 0.6)',
                            bgcolor: '#ff3d3d'
                        },
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                >
                    Gotta catch 'em all!
                </Button>
            </Container>

            {/* Background Decoration */}
            <CatchingPokemonIcon
                sx={{
                    position: 'absolute',
                    bottom: '-15%',
                    right: '-5%',
                    fontSize: '45rem',
                    color: 'rgba(255,255,255,0.02)',
                    transform: 'rotate(-20deg)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
        </Box>
    )
}

export default Home;