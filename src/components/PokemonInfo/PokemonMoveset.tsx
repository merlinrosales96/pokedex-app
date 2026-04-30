import React from 'react';
import {
  Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
} from '@mui/material';

interface Move {
  move: { name: string };
}

interface PokemonMovesetProps {
  moves: Move[];
  isDark: boolean;
}

const PokemonMoveset: React.FC<PokemonMovesetProps> = ({ moves, isDark }) => {
  const subtleBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const subtleHover = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';

  return (
    <>
      <Typography
        variant="body2"
        sx={{
          p: 3,
          pb: 0,
          fontWeight: 700,
          color: 'text.primary',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Moveset
      </Typography>
      <TableContainer sx={{ maxHeight: 300, mt: 2 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {['#', 'Move Name'].map((label) => (
                <TableCell
                  key={label}
                  sx={{
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: 'none',
                    borderBottom: '1px solid',
                    borderBottomColor: 'divider',
                    ...(label === '#' && { pl: 3, width: 60 }),
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {moves.map((row, index) => (
              <TableRow key={row.move.name} sx={{ '&:hover': { bgcolor: subtleHover } }}>
                <TableCell
                  sx={{
                    color: 'text.disabled',
                    fontSize: '0.8rem',
                    border: 'none',
                    borderBottom: '1px solid',
                    borderBottomColor: subtleBorder,
                    pl: 3,
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    textTransform: 'capitalize',
                    color: 'text.primary',
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    border: 'none',
                    borderBottom: '1px solid',
                    borderBottomColor: subtleBorder,
                  }}
                >
                  {row.move.name.replace('-', ' ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PokemonMoveset;