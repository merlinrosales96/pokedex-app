import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Grid, Stack, LinearProgress, Skeleton,
} from '@mui/material';

const PokemonRadarChart = lazy(() =>
    import('recharts').then((mod) => ({
        default: function ChartComponent({
            data,
            themeColor,
            isDark,
        }: {
            data: any[];
            themeColor: string;
            isDark: boolean;
        }) {
            const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
            const wrapperRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
                const measure = () => {
                    if (wrapperRef.current) {
                        const { clientWidth, clientHeight } = wrapperRef.current;
                        if (clientWidth > 0 && clientHeight > 0)
                            setDimensions({ width: clientWidth, height: clientHeight });
                    }
                };
                measure();
                window.addEventListener('resize', measure);
                return () => window.removeEventListener('resize', measure);
            }, []);

            if (dimensions.width === 0)
                return <div ref={wrapperRef} style={{ width: '100%', height: '280px' }} />;

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
                        <mod.PolarGrid stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} />
                        <mod.PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 10, fontWeight: 600 }}
                        />
                        <mod.Radar
                            name="Stats"
                            dataKey="value"
                            stroke={themeColor}
                            fill={themeColor}
                            fillOpacity={0.25}
                        />
                    </mod.RadarChart>
                </div>
            );
        },
    }))
);

interface Stat {
    stat: { name: string };
    base_stat: number;
}

interface PokemonBaseStatsProps {
    stats: Stat[];
    themeColor: string;
    isDark: boolean;
}

const PokemonBaseStats: React.FC<PokemonBaseStatsProps> = ({ stats, themeColor, isDark }) => {
    const statTrack = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    const radarData = stats.map((stat) => ({
        subject: stat.stat.name.replace('special-', 'Sp.').toUpperCase(),
        value: stat.base_stat,
        fullMark: 255,
    }));

    return (
        <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }}>
                {stats.map((stat) => (
                    <Box key={stat.stat.name} sx={{ mb: 2 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    textTransform: 'uppercase',
                                    fontSize: '0.68rem',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                {stat.stat.name.replace('-', ' ')}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.78rem' }}>
                                {stat.base_stat}
                            </Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={Math.min((stat.base_stat / 160) * 100, 100)}
                            sx={{
                                height: 6,
                                borderRadius: 6,
                                bgcolor: statTrack,
                                '& .MuiLinearProgress-bar': { bgcolor: themeColor, borderRadius: 6 },
                            }}
                        />
                    </Box>
                ))}
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }} sx={{ height: { xs: 260, md: 300 } }}>
                <Suspense
                    fallback={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Skeleton variant="circular" width={200} height={200} />
                        </Box>
                    }
                >
                    <PokemonRadarChart data={radarData} themeColor={themeColor} isDark={isDark} />
                </Suspense>
            </Grid>
        </Grid>
    );
};

export default PokemonBaseStats;