import { PaletteMode } from '@mui/material';
import { Box, AppBar, Toolbar, Container } from '@mui/material';
import logo from '../../assets/images/pokeball-logo.png';
import { Link } from 'react-router-dom';

const logoStyle = {
    width: '15%',
    height: '15%',
    cursor: 'pointer',
};

interface NavBarProps {
    mode: PaletteMode;
}

function NavBar({ mode }: NavBarProps) {


    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: '#F60A4F',
                    backgroundImage: 'none',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <Link to={"/"}>
                                <Box sx={{ display: { xs: 'flex' } }}>
                                    <img
                                        src={logo}
                                        style={logoStyle}
                                        alt={`logo-${mode}`}
                                    />
                                </Box>
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default NavBar;