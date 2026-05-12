import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemePreferenceContext } from './themePreferenceContext.js';
import { setTheme, toggleTheme } from '../store/slices/themeSlice.js';

/** Bridges Redux theme slice into Context for hooks-based consumers. */
export default function ThemePreferenceProvider({ children }) {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);

  const value = useMemo(
    () => ({
      mode,
      toggle: () => dispatch(toggleTheme()),
      /** @param {'light' | 'dark'} next */
      set: (next) => dispatch(setTheme(next)),
    }),
    [mode, dispatch],
  );

  return <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>;
}
