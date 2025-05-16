import { Image } from "../components/common/Image";
import logo from "../assets/images/pokeball-logo.png";
import { Box, Typography, Button } from "@mui/material";
import banner from '../assets/images/banner.png';

const Home = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.8)',
                backgroundBlendMode: 'darken'
            }}
        >
            <Image image={logo} alt="" className="w-64 h-64 items-center justify-center mx-auto overflow-hidden rounded-xl w-fit h-fit object-center" />
            <Typography variant="h5" className="pb-2" color="text.secondary">
                Welcome to your Pokédex
            </Typography>
            <Typography variant="h6" className="pb-2" color="text.secondary">
                Discover all Pokémons
            </Typography>
            <Button href={`/pokedex/1`} variant="contained" color="error" className="pt-5">
                <Typography variant="button">
                    Gotta catch'em all
                </Typography>
            </Button>
        </Box>
    )
}

export default Home