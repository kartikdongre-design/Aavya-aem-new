import { useContext } from 'react';
import { ThemePreferenceContext } from '../context/themePreferenceContext.js';

export function useThemePreference() {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error('useThemePreference must be used within ThemePreferenceProvider');
  }
  return ctx;
}
