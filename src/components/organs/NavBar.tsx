import * as React from 'react';
import { PaletteMode } from '@mui/material';
import { Box, AppBar, Toolbar, Container, Divider, Typography, MenuItem, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
//import Logo from '../assets/logo.png';
/*import LanguageSwitcher from '../molecules/LanguageSwitcher';
import SocialButtons from '../molecules/SocialButton';*/
//import { useTranslation } from 'react-i18next';
import logo from '../assets/logo-pokedex.png';

const logoStyle = {
    width: '5%',
    height: '5%',
    cursor: 'pointer',
};

interface NavBarProps {
    mode: PaletteMode;
}

function NavBar({ mode }: NavBarProps) {

    /*const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };*/

    const [open, setOpen] = React.useState(false);
    //const { t } = useTranslation();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    const goHome = () => {
        /*if (location.pathname === '/') {
            scrollToSection("home");
        }
        else {
            window.location.href = '/';
        }*/
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: '#f12626',
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
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <img
                                    src={logo}
                                    style={logoStyle}
                                    alt={`logo-${mode}`}
                                />
                            </Box>
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
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <IconButton
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="top"
                                open={open}
                                onClose={toggleDrawer(false)}
                                variant="temporary"
                                PaperProps={{
                                    sx: {
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                    }
                                }}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Box component="div" className="grid grid-cols-2">
                                            <IconButton
                                                aria-label="close"
                                                onClick={toggleDrawer(false)}
                                            >
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    <Divider />
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default NavBar;