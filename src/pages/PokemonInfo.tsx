import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Box, Paper, Typography, Card, CardMedia, CardContent, Skeleton, Chip, Divider, Pagination, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { usePokemonById } from "../hooks/usePokemons";
import { typeColors, PokemonCount } from "../utils/Utils";


const PokemonInfo = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(id ? parseInt(id) : 1);
    const { data, loading } = usePokemonById(page);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        navigate(`/pokemon/${value}`);
    };

    const goPokedex = () => {
        navigate(`/pokedex/${Math.ceil((id ? parseInt(id) : 1) / 20)}`);
    };

    useEffect(() => {
        const numId = id ? parseInt(id, 10) : 1;
        if (isNaN(numId) || numId < 1 || numId > PokemonCount) {
            navigate('/not-found');
        }
    }, [id, navigate]);


    return (
        <Container maxWidth="sm" component="section"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4, py: 6 }}>
            <Grid container spacing={6} alignItems="flex-start">
                <Grid size={{ xs: 12 }}>
                    <IconButton onClick={() => goPokedex()}>
                        <ArrowBack />
                    </IconButton>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ border: `2px solid ${typeColors[data ? data.types[0].type.name : '']}` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {loading ? (
                                <Skeleton variant="rectangular" width={140} height={140} />
                            ) : (
                                <CardMedia
                                    className=''
                                    component="img"
                                    sx={{
                                        width: "40%",
                                        height: "40%", // Ajusta la altura según tu diseño
                                        // Cambia a 'contain' si prefieres que la imagen no se recorte
                                    }}
                                    image={data?.sprites.other['official-artwork'].front_default || 'default-image-url'}
                                    alt={data?.name}
                                />
                            )}
                        </Box>
                        {loading ? (
                            <Skeleton variant="text" width="60%" />
                        ) : (
                            <CardContent>
                                <Typography className='capitalize-text' variant="h5" color="text.primary">
                                    {data?.name}
                                </Typography>
                                <Grid container spacing={1} alignItems="flex-start">
                                    {
                                        data?.types.map((item) => (
                                            <Grid key={item.type.name} size={{ xs: 4 }}>
                                                <Chip
                                                    className='capitalize-text'
                                                    label={item.type.name}
                                                    sx={{
                                                        backgroundColor: `${typeColors[item.type.name]}`,
                                                        color: '#FFFFFF',
                                                    }}
                                                />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <Divider sx={{ p: 1 }} />
                                <Grid container spacing={1} alignItems="flex-start" sx={{ pt: 1 }}>
                                    <Grid size={{ xs: 4 }}>
                                        <Typography className='capitalize-text' variant="body1" color="text.primary">
                                            Weight:
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 4 }}>
                                        <Typography className='capitalize-text' variant="body1" color="text.primary">
                                            Height:
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-start">
                                    <Grid size={{ xs: 4 }}>
                                        <Typography className='capitalize-text' variant="body1" color="text.primary">
                                            {`${data ? data.weight / 10 : 0} Kg`}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 4 }}>
                                        <Typography className='capitalize-text' variant="body1" color="text.primary">
                                            {`${data ? data.height / 10 : 0} m`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>

                        )}
                    </Card>
                </Grid>


                <Grid size={{ xs: 12 }}>
                    <Paper elevation={3}>
                        <Typography sx={{ p: 1 }} className='capitalize-text' variant="h6" color="text.primary">
                            Forms
                        </Typography>
                        <Grid container spacing={6} alignItems="center" justifyContent="center">

                            {
                                data?.sprites.front_default != null ?
                                    <Grid size={{ xs: 6 }}>
                                        <Typography sx={{ p: 1 }} className='capitalize-text' variant="caption" color="text.primary">
                                            Default
                                        </Typography>
                                        <img
                                            src={data?.sprites.front_default}
                                            alt="default"
                                            className="inset-0"
                                        />
                                    </Grid>
                                    :
                                    <></>
                            }

                            {
                                data?.sprites.front_female != null ?
                                    <Grid size={{ xs: 6 }}>
                                        <Typography sx={{ p: 1 }} className='capitalize-text' variant="caption" color="text.primary">
                                            Female
                                        </Typography>
                                        <img
                                            src={data?.sprites.front_female}
                                            alt="female"
                                            className="inset-0"
                                        />
                                    </Grid>
                                    :
                                    <></>
                            }

                            {
                                data?.sprites.front_shiny != null ?
                                    <Grid size={{ xs: 6 }}>
                                        <Typography sx={{ p: 1 }} className='capitalize-text' variant="caption" color="text.primary">
                                            Shiny
                                        </Typography>
                                        <img
                                            src={data?.sprites.front_shiny}
                                            alt="shiny"
                                            className="inset-0"
                                        />
                                    </Grid>
                                    :
                                    <></>
                            }

                            {
                                data?.sprites.front_shiny_female != null ?
                                    <Grid size={{ xs: 6 }}>
                                        <Typography sx={{ p: 1 }} className='capitalize-text' variant="caption" color="text.primary">
                                            Shiny Female
                                        </Typography>
                                        <img
                                            src={data?.sprites.front_shiny_female}
                                            alt="shiny female"
                                            className="inset-0"
                                        />
                                    </Grid>
                                    :
                                    <></>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Pagination
                shape="rounded"
                count={PokemonCount}
                page={page}
                onChange={handleChange}
                sx={{ marginTop: 2 }}
            />
        </Container>
    )
}

export default PokemonInfo;