import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import ThemePreferenceProvider from '../../ecommerce-react/src/context/ThemePreferenceProvider.jsx';
import { store } from '../../ecommerce-react/src/store/index.js';
import App from './App.jsx';
import '../../ecommerce-react/src/index.css';

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
