import { Image } from "../components/common/Image";
import logo from "../assets/images/pokeball-logo.webp";
import { Typography, Button, Box, Container } from "@mui/material";
import { m } from "framer-motion";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
    return (
        <Box
            component="section"
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(25,32,45,1) 0%, rgba(10,13,20,1) 100%)', // Fondo profundo
                pt: 10
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    {/* Animación de balanceo para el Pokémon confundido */}
                    <m.div
                        animate={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: '100%', maxWidth: '400px' }}
                    >
                        <Image
                            image={logo}
                            alt="404 Not Found"
                            className="w-full h-auto drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                        />
                    </m.div>

                    <Box sx={{ mt: -4, zIndex: 1 }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 900,
                                color: 'primary.main',
                                fontSize: { xs: '5rem', md: '8rem' },
                                letterSpacing: -5,
                                opacity: 0.8
                            }}
                        >
                            404
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                                mb: 1,
                                textTransform: 'uppercase'
                            }}
                        >
                            A Wild Error Appeared!
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                mb: 4,
                                maxWidth: '400px',
                                mx: 'auto'
                            }}
                        >
                            The page you are looking for has fled into the tall grass. Don't worry, we can find our way back.
                        </Typography>

                        <Button
                            href="/pokedex/1"
                            variant="contained"
                            color="error"
                            size="large"
                            startIcon={<ErrorOutlineIcon />}
                            sx={{
                                borderRadius: '50px',
                                px: 5,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                boxShadow: '0 10px 20px rgba(211, 47, 47, 0.3)',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 15px 30px rgba(211, 47, 47, 0.5)',
                                }
                            }}
                        >
                            Return to Pokédex
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Marca de agua decorativa */}
            <Typography
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    opacity: 0.05,
                    fontSize: '10vw',
                    fontWeight: 900,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                }}
            >
                LOST IN THE WILD
            </Typography>
        </Box>
    )
}