import {memo, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';

import GlobalStyles from './GlobalStyles';
import Routes from '@/app/Routes';
import {isProduction} from '@/constants';
import {AuthDataProvider} from '@/contexts/AuthDataContext';
import './font.css';
import theme from '@/theme';

const vitePreloadErrorEvent = 'vite:preloadError';
const vitePreloadErrorHandler = () => {
  window.location.reload();
};

const App = () => {
  // Need to apply the following useEffect only for production
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    if (isProduction) {
      window.addEventListener(vitePreloadErrorEvent, vitePreloadErrorHandler);

      return () => {
        window.removeEventListener(
          vitePreloadErrorEvent,
          vitePreloadErrorHandler,
        );
      };
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <AuthDataProvider>
          <Routes />
        </AuthDataProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default memo(App);
