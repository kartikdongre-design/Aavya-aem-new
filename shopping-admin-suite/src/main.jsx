import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ThemePreferenceProvider from '../../ecommerce-react/src/context/ThemePreferenceProvider.jsx';
import { store } from '../../ecommerce-react/src/store/index.js';
import App from './App.jsx';
import '../../ecommerce-react/src/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemePreferenceProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemePreferenceProvider>
    </Provider>
  </StrictMode>,
);
