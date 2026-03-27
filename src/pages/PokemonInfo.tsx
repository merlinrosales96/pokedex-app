import { useEffect, useState, lazy, Suspense, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container, Grid, Box, Paper, Typography, Card, CardMedia,
    CardContent, Chip, Divider, Pagination, IconButton,
    LinearProgress, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar, Tooltip, Skeleton
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
// Optimizamos Framer Motion usando 'm' y LazyMotion
import { m, LazyMotion, domAnimation } from "framer-motion";

// Importa tus propios hooks y utils.
import { usePokemonById } from "../hooks/usePokemons";
import { typeColors, PokemonCount } from "../utils/Utils";

const PokemonRadarChart = lazy(() => import('recharts').then(mod => ({
    // Cambiamos la función anónima por una con nombre: "ChartComponent"
    default: function ChartComponent({ data, themeColor }: { data: any[], themeColor: string }) {
        const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
        const wrapperRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const measure = () => {
                if (wrapperRef.current) {
                    const { clientWidth, clientHeight } = wrapperRef.current;
                    if (clientWidth > 0 && clientHeight > 0) {
                        setDimensions({ width: clientWidth, height: clientHeight });
                    }
                }
            };

            measure();
            window.addEventListener('resize', measure);
            return () => window.removeEventListener('resize', measure);
        }, []);

        if (dimensions.width === 0) {
            return <div ref={wrapperRef} style={{ width: '100%', height: '300px' }} />;
        }

        return (
            <div ref={wrapperRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                <mod.RadarChart
                    cx={dimensions.width / 2}
                    cy={dimensions.height / 2}
                    outerRadius={Math.min(dimensions.width, dimensions.height) * 0.35}
                    width={dimensions.width}
                    height={dimensions.height}
                    data={data}
                >
                    <mod.PolarGrid stroke="#e0e0e0" />
                    <mod.PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 11, fontWeight: 600 }} />
                    <mod.Radar
                        name="Stats"
                        dataKey="value"
                        stroke={themeColor}
                        fill={themeColor}
                        fillOpacity={0.4}
                    />
                </mod.RadarChart>
            </div>
        );
    }
})));

// --- Configuración de Estilos Comunes ---
const commonPaperStyle = {
    p: { xs: 3, md: 4 },
    borderRadius: '30px',
    bgcolor: '#fff',
    border: '1px solid #e0e0e0',
    boxShadow: 'none',
};

const TableHeaderCell = (props: any) => (
    <TableCell
        sx={{
            bgcolor: '#f5f5f5',
            color: "text.secondary",
            fontWeight: 700,
            border: 0,
            py: 1.5,
        }}
        {...props}
    />
);

const MovesetTableCell = (props: any) => (
    <TableCell
        sx={{
            borderBottom: '1px solid #f0f0f0',
            fontWeight: 500,
        }}
        {...props}
    />
);

const InfoSkeleton = () => (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, mt: { xs: '84px', md: '100px' } }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width="40%" height={60} />
        </Box>
        <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '30px' }} />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '30px' }} />
            </Grid>
        </Grid>
    </Container>
);

const PokemonInfo = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(id ? parseInt(id) : 1);
    const { data, loading } = usePokemonById(page);
    const [_, setOpenTooltip] = useState<number | null>(null);

    const mainType = data?.types[0].type.name || 'normal';
    const themeColor = typeColors[mainType];

    const radarData = data?.stats.map(stat => ({
        subject: stat.stat.name.replace("special-", "Sp. ").toUpperCase(),
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

    if (loading) return <InfoSkeleton />;

    return (
        // Agregamos LazyMotion para activar la optimización de bundle en Framer Motion
        <LazyMotion features={domAnimation}>
            <Container
                maxWidth="lg"
                sx={{
                    py: { xs: 2, md: 8 },
                    mt: { xs: '84px', md: '100px' },
                    minHeight: '100vh',
                    bgcolor: '#fafafa',
                }}
            >
                <Box sx={{
                    mb: { xs: 4, md: 8 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, md: 2 }
                }}>
                    <IconButton
                        onClick={goPokedex}
                        sx={{ bgcolor: '#eee', color: 'inherit', '&:hover': { bgcolor: '#e0e0e0' } }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h3" sx={{
                        fontWeight: 900,
                        textTransform: 'capitalize',
                        fontSize: { xs: '1.8rem', sm: '2.6rem', md: '3.5rem' },
                        color: '#333'
                    }}>
                        {data?.name.replace("-", " ")}
                    </Typography>
                    <Typography variant="h4" sx={{
                        opacity: 0.15,
                        fontWeight: 900,
                        ml: 'auto',
                        fontSize: { xs: '1.2rem', md: '2.5rem' },
                        color: '#000'
                    }}>
                        #{data?.id.toString().padStart(3, '0')}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <m.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
                            <Card sx={{
                                ...commonPaperStyle,
                                border: `1px solid ${themeColor}15`,
                                textAlign: 'center',
                                overflow: 'hidden',
                                position: 'relative',
                                mt: { xs: '0px', sm: '0px', md: '0px' },
                                boxShadow: `0 10px 40px ${themeColor}10`,
                            }}>
                                <CardMedia
                                    component="img"
                                    image={data?.sprites.other['official-artwork'].front_default}
                                    alt={data?.name}
                                    sx={{
                                        width: { xs: '180px', sm: '220px', md: '95%' },
                                        mx: 'auto',
                                        mt: { xs: '0px', sm: '0px', md: '0px' },
                                        filter: `drop-shadow(0 25px 45px rgba(0,0,0,0.2))`,
                                        zIndex: 2,
                                        position: 'relative'
                                    }}
                                />
                                <CardContent sx={{ pt: 2 }}>
                                    <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 3, gap: 1 }}>
                                        {data?.types.map((item) => (
                                            <Chip
                                                key={item.type.name}
                                                label={item.type.name.toUpperCase()}
                                                sx={{
                                                    backgroundColor: typeColors[item.type.name],
                                                    color: '#fff',
                                                    fontWeight: '900',
                                                    letterSpacing: 1,
                                                    fontSize: '0.8rem',
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                    <Divider sx={{ my: 2, opacity: 0.05 }} />
                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, fontWeight: 500 }}>WEIGHT</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#333' }}>{data ? data.weight / 10 : 0} kg</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, fontWeight: 500 }}>HEIGHT</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#333' }}>{data ? data.height / 10 : 0} m</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </m.div>

                        <Paper sx={{ ...commonPaperStyle, mt: 3, p: 3 }}>
                            <Typography variant="subtitle2" sx={{ mb: 2.5, color: "text.secondary", textAlign: 'center', fontWeight: 800 }}>AVAILABLE FORMS</Typography>
                            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ gap: 1 }}>
                                {[
                                    { id: 1, src: data?.sprites.front_default, title: "Normal" },
                                    { id: 3, src: data?.sprites.front_shiny, title: "Shiny" },
                                    { id: 2, src: data?.sprites.front_female, title: "Female" },
                                    { id: 4, src: data?.sprites.front_shiny_female, title: "Shiny Fem." }
                                ].map((sprite) => sprite.src && (
                                    <Tooltip key={sprite.id} title={sprite.title} arrow placement="top">
                                        <Avatar
                                            src={sprite.src}
                                            sx={{
                                                width: { xs: 55, md: 68 },
                                                height: { xs: 55, md: 68 },
                                                bgcolor: '#f5f5f5',
                                                border: '2px solid #e0e0e0',
                                                cursor: 'pointer',
                                                transition: '0.2s ease-in-out',
                                                '&:hover': { borderColor: themeColor, transform: 'scale(1.1)', boxShadow: `0 5px 15px ${themeColor}20` }
                                            }}
                                            onClick={() => handleTouchStart(sprite.id)}
                                        />
                                    </Tooltip>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <m.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
                            <Paper sx={{ ...commonPaperStyle }}>
                                <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, color: '#333' }}>Base Stats</Typography>

                                <Grid container spacing={4} alignItems="center">
                                    <Grid size={{ xs: 12, lg: 6 }}>
                                        {data?.stats.map((stat) => (
                                            <Box key={stat.stat.name} sx={{ mb: 2.5 }}>
                                                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.8 }}>
                                                    <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '0.75rem', color: "text.secondary" }}>
                                                        {stat.stat.name.replace("-", " ")}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 900, color: '#333' }}>{stat.base_stat}</Typography>
                                                </Stack>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={Math.min((stat.base_stat / 160) * 100, 100)}
                                                    sx={{
                                                        height: 8,
                                                        borderRadius: 4,
                                                        bgcolor: '#f0f0f0',
                                                        '& .MuiLinearProgress-bar': { bgcolor: themeColor, borderRadius: 4 }
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                    </Grid>

                                    <Grid
                                        size={{ xs: 12, lg: 6 }}
                                        sx={{
                                            height: { xs: 300, md: 350 }, // Altura explícita
                                            mt: { xs: 2, lg: 0 },
                                            position: 'relative' // Crea un contexto de renderizado estable
                                        }}
                                    >
                                        <Suspense fallback={
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <Skeleton variant="circular" width={220} height={220} />
                                            </Box>
                                        }>
                                            <PokemonRadarChart data={radarData || []} themeColor={themeColor} />
                                        </Suspense>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Paper sx={{ ...commonPaperStyle, mt: 3, p: 0, overflow: 'hidden' }}>
                                <Typography variant="h6" sx={{ p: 3, pb: 1.5, fontWeight: 800, color: '#333' }}>Moveset</Typography>
                                <TableContainer sx={{ maxHeight: 300 }}>
                                    <Table stickyHeader size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderCell>#</TableHeaderCell>
                                                <TableHeaderCell>Move Name</TableHeaderCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.moves.map((row, index) => (
                                                <TableRow key={row.move.name} hover>
                                                    <MovesetTableCell sx={{ color: 'text.secondary' }}>
                                                        {index + 1}
                                                    </MovesetTableCell>
                                                    <MovesetTableCell sx={{ textTransform: 'capitalize', color: '#333' }}>
                                                        {row.move.name.replace("-", " ")}
                                                    </MovesetTableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </m.div>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 5, md: 8 }, mb: 4 }}>
                    <Pagination
                        count={PokemonCount}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                        siblingCount={window.innerWidth < 600 ? 0 : 1}
                        boundaryCount={1}
                        size={window.innerWidth < 600 ? "small" : "large"}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                backdropFilter: 'blur(10px)',
                                bgcolor: 'rgba(0,0,0,0.05)',
                                fontWeight: 700,
                                borderRadius: '10px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.1)',
                                },
                                '&.Mui-selected': {
                                    bgcolor: themeColor,
                                    color: '#fff',
                                    '&:hover': {
                                        filter: 'brightness(0.8)',
                                    }
                                }
                            }
                        }}
                    />
                </Box>
            </Container>
        </LazyMotion>
    );
}

export default PokemonInfo;