import { createSlice } from '@reduxjs/toolkit';

const getInitial = () => {
  if (typeof document === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('velvora_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const applyDom = (mode) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const initialMode = getInitial();
applyDom(initialMode);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: initialMode,
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      applyDom(state.mode);
      try {
        localStorage.setItem('velvora_theme', state.mode);
      } catch {
        /* ignore */
      }
    },
    setTheme: (state, action) => {
      const mode = action.payload === 'dark' ? 'dark' : 'light';
      state.mode = mode;
      applyDom(mode);
      try {
        localStorage.setItem('velvora_theme', mode);
      } catch {
        /* ignore */
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
