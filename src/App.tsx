import { LazyMotion, domAnimation } from 'framer-motion';
import RoutesApp from './components/common/Routes';
import { AppThemeProvider } from './theme/ThemeProvider';
import './App.css';

function App() {

  return (
    <LazyMotion features={domAnimation} strict>
      <AppThemeProvider>
        <RoutesApp />
      </AppThemeProvider>
    </LazyMotion>
  );
}

export default App;