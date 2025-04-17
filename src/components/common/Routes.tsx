import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import ScrollToTop from './ScrollToTop';
import Home from '../../pages/Home';
import Pokedex from '../../pages/Pokedex';
import PokemonInfo from '../../pages/PokemonInfo';
import NotFound from '../../pages/NotFound';

const RoutesApp = () => {

    return (
        <BrowserRouter>
            <NavBar />
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/pokedex/:id' element={<Pokedex />} />
                <Route path='/pokemon/:id' element={<PokemonInfo />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;