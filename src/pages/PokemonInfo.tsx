import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container, Grid, Box, Paper, Typography, Card, CardMedia,
    CardContent, Chip, Divider, Pagination, IconButton,
    LinearProgress, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar, Tooltip, Skeleton
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { usePokemonById } from "../hooks/usePokemons";
import { typeColors, PokemonCount } from "../utils/Utils";

// Componente Interno para el Skeleton de Detalles
const InfoSkeleton = () => (
    <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 } }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={200} height={60} />
            <Skeleton variant="text" width={80} height={60} sx={{ ml: 'auto' }} />
        </Box>
        <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
                <Card sx={{ borderRadius: '30px', bgcolor: 'rgba(255,255,255,0.05)', p: 3 }}>
                    <Skeleton variant="rectangular" width="80%" height={250} sx={{ mx: 'auto', borderRadius: '20px', mb: 2 }} />
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                        <Skeleton variant="rounded" width={80} height={32} />
                        <Skeleton variant="rounded" width={80} height={32} />
                    </Stack>
                    <Skeleton variant="rectangular" width="100%" height={60} />
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
                <Paper sx={{ p: 3, borderRadius: '30px', bgcolor: 'rgba(255,255,255,0.03)' }}>
                    <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} variant="text" width="100%" height={20} />
                        ))}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </Container>
);

const PokemonInfo = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(id ? parseInt(id) : 1);
    const { data, loading } = usePokemonById(page);
    const [openTooltip, setOpenTooltip] = useState<number | null>(null);

    const mainType = data?.types[0].type.name || 'normal';
    const themeColor = typeColors[mainType];

    const radarData = data?.stats.map(stat => ({
        subject: stat.stat.name.replace("special-", "Sp. "),
        value: stat.base_stat,
        fullMark: 255,
    }));

    const handleTouchStart = (type: number) => {
        setOpenTooltip(type);
        setTimeout(() => setOpenTooltip(null), 2000);
    };

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

    // Usamos el Skeleton si está cargando
    if (loading) return <InfoSkeleton />;

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 } }}>
            {/* Header: Back Button and Name */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                    onClick={goPokedex}
                    sx={{ bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'capitalize', letterSpacing: 2 }}>
                    {data?.name.replace("-", " ")}
                </Typography>
                <Typography variant="h4" sx={{ opacity: 0.3, fontWeight: 900, ml: 'auto' }}>
                    #{data?.id.toString().padStart(3, '0')}
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Left Column: Visuals */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <Card sx={{
                            borderRadius: '30px',
                            background: `linear-gradient(135deg, ${themeColor}22 0%, rgba(255,255,255,0.05) 100%)`,
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${themeColor}`,
                            textAlign: 'center',
                            overflow: 'visible'
                        }}>
                            <CardMedia
                                component="img"
                                image={data?.sprites.other['official-artwork'].front_default}
                                alt={data?.name}
                                sx={{ width: '80%', mx: 'auto', mt: -5, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))' }}
                            />
                            <CardContent>
                                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                                    {data?.types.map((item) => (
                                        <Chip
                                            key={item.type.name}
                                            label={item.type.name}
                                            sx={{ backgroundColor: typeColors[item.type.name], color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}
                                        />
                                    ))}
                                </Stack>
                                <Divider sx={{ my: 2, opacity: 0.1 }} />
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" color="text.secondary">WEIGHT</Typography>
                                        <Typography variant="h6">{data ? data.weight / 10 : 0} kg</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" color="text.secondary">HEIGHT</Typography>
                                        <Typography variant="h6">{data ? data.height / 10 : 0} m</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Forms / Sprites panel */}
                    <Paper sx={{ mt: 3, p: 2, borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.02)' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.6 }}>VARIANTS</Typography>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {[
                                { id: 1, src: data?.sprites.front_default, title: "Default" },
                                { id: 2, src: data?.sprites.front_female, title: "Female" },
                                { id: 3, src: data?.sprites.front_shiny, title: "Shiny" },
                                { id: 4, src: data?.sprites.front_shiny_female, title: "Shiny Female" }
                            ].map((sprite) => sprite.src && (
                                <Tooltip key={sprite.id} title={sprite.title} open={openTooltip === sprite.id}>
                                    <Avatar
                                        src={sprite.src}
                                        sx={{ width: 60, height: 60, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        onMouseEnter={() => setOpenTooltip(sprite.id)}
                                        onMouseLeave={() => setOpenTooltip(null)}
                                        onClick={() => handleTouchStart(sprite.id)}
                                    />
                                </Tooltip>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>

                {/* Right Column: Stats & Moves */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <Paper sx={{ p: 3, borderRadius: '30px', bgcolor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}>
                            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Base Stats</Typography>

                            <Grid container spacing={2} alignItems="center">
                                <Grid size={{ xs: 12, lg: 6 }}>
                                    {data?.stats.map((stat) => (
                                        <Box key={stat.stat.name} sx={{ mb: 1.5 }}>
                                            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{stat.stat.name.replace("-", " ")}</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{stat.base_stat}</Typography>
                                            </Stack>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(stat.base_stat / 255) * 100}
                                                sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: themeColor } }}
                                            />
                                        </Box>
                                    ))}
                                </Grid>
                                <Grid size={{ xs: 12, lg: 6 }} sx={{ height: 250 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                            <PolarGrid stroke="rgba(255,255,255,0.2)" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                                            <Radar
                                                name="Stats"
                                                dataKey="value"
                                                stroke={themeColor}
                                                fill={themeColor}
                                                fillOpacity={0.5}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </Grid>
                            </Grid>
                        </Paper>
                    </motion.div>

                    <Paper sx={{ mt: 3, borderRadius: '30px', overflow: 'hidden', bgcolor: 'rgba(255,255,255,0.03)' }}>
                        <Typography variant="h6" sx={{ p: 3, pb: 0, fontWeight: 'bold' }}>Moveset</Typography>
                        <TableContainer sx={{ maxHeight: 300 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ bgcolor: '#ff3d3d', color: "white" }}>#</TableCell>
                                        <TableCell sx={{ bgcolor: '#ff3d3d', color: "white" }}>Move Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.moves.map((row, index) => (
                                        <TableRow key={row.move.name} hover>
                                            <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{index + 1}</TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'capitalize' }}>
                                                {row.move.name.replace("-", " ")}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                    count={PokemonCount}
                    page={page}
                    onChange={handleChange}
                    size="large"
                    color="primary"
                    sx={{
                        '& .MuiPaginationItem-root': { backdropFilter: 'blur(10px)', bgcolor: 'rgba(255,255,255,0.05)' }
                    }}
                />
            </Box>
        </Container>
    );
}

export default PokemonInfo;