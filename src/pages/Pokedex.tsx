import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Snackbar, Alert,
} from '@mui/material';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useTheme } from '@mui/material/styles';
import { itemsPerPage, PokemonCount } from '../utils/Utils';
import { usePokemonList } from '../hooks/usePokemons';
import { PokemonDetail } from '../utils/Types';
import axios from '../utils/axios';

import PokedexHeader from '../components/Pokedex/PokedexHeader';
import PokedexSearch from '../components/Pokedex/PokedexSearch';
import TypeFilterBar from '../components/Pokedex/TypeFilterBar';
import PokedexGrid from '../components/Pokedex/PokedexGrid';
import PokedexPagination from '../components/Pokedex/PokedexPagination';
import PokedexSkeleton from '../components/Pokedex/PokedexSkeleton';

const Pokedex: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const [page, setPage] = useState<number>(id ? parseInt(id) : 1);
  const [searchText, setSearchText] = useState<string>('');
  const [activeType, setActiveType] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const { data, pokemonDetails, loading } = usePokemonList(page);

  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  useEffect(() => {
    const numId = id ? parseInt(id, 10) : 1;
    const maxPages = Math.ceil(PokemonCount / itemsPerPage);
    if (isNaN(numId) || numId < 1 || numId > maxPages) navigate('/not-found');
  }, [id, navigate]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setActiveType(null);
    navigate(`/pokedex/${value}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async () => {
    const query = searchText.trim().toLowerCase();
    if (!query) { showAlert('Please enter a Pokémon name'); return; }
    try {
      const res = await axios.get(`/pokemon/${query}`);
      const p: PokemonDetail = res.data;
      if (p.id > 0 && p.id <= PokemonCount) navigate(`/pokemon/${p.id}`);
      else showAlert('Pokémon out of range');
    } catch {
      showAlert('Pokémon not found');
    }
  };

  const showAlert = (msg: string) => setAlert({ open: true, message: msg });

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setAlert(prev => ({ ...prev, open: false }));
  };

  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    data.forEach((p) => {
      const detail = pokemonDetails[p.name];
      detail?.types.forEach((t: any) => types.add(t.type.name));
    });
    return Array.from(types).sort();
  }, [data, pokemonDetails]);

  const filteredData = useMemo(() => {
    if (!activeType) return data;
    return data.filter((p) => {
      const detail = pokemonDetails[p.name];
      return detail?.types.some((t: any) => t.type.name === activeType);
    });
  }, [data, pokemonDetails, activeType]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 }, mt: { xs: 8, md: 4 } }}>

      <PokedexHeader />

      <PokedexSearch
        value={searchText}
        onChange={setSearchText}
        onSearch={handleSearch}
        isDark={isDark}
      />

      {!loading && availableTypes.length > 0 && (
        <TypeFilterBar
          types={availableTypes}
          activeType={activeType}
          onSelect={setActiveType}
          page={page}
          isDark={isDark}
        />
      )}

      {loading ? (
        <PokedexSkeleton />
      ) : (
        <PokedexGrid
          filteredData={filteredData}
          pokemonDetails={pokemonDetails}
          isDark={isDark}
          borderColor={borderColor}
        />
      )}

      <PokedexPagination
        page={page}
        onChange={handlePageChange}
        isDark={isDark}
      />

      <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ borderRadius: '12px' }}>
          {alert.message}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default Pokedex;