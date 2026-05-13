import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import ThemePreferenceProvider from './context/ThemePreferenceProvider.jsx';
import { store } from './store/index.js';
import './index.css';

/** Hash routes on static hosts (e.g. aem.page) where `/cart` has no server fallback. */
const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemePreferenceProvider>
        <Router>
          <App />
        </Router>
      </ThemePreferenceProvider>
    </Provider>
  </StrictMode>,
);
