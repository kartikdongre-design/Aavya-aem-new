import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice.js';
import Button from './Button.jsx';

export default function ThemeToggle({ className = '' }) {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const dark = mode === 'dark';

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600 ${className}`}
      onClick={() => dispatch(toggleTheme())}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
