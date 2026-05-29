import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Container from './Container.jsx';
import Button from '../ui/Button.jsx';
import { logout } from '../../store/slices/authSlice.js';
import { clearAdminSession, getAdminSession } from '../../services/api.js';
import { cn } from '../../utils/cn.js';

const navLink = ({ isActive }) =>
  cn('text-sm font-medium transition', isActive ? 'text-gold-600' : 'text-slate-600 hover:text-gold-600');

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const adminSession = getAdminSession();

  const handleLogout = () => {
    dispatch(logout());
    clearAdminSession();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
          Urban<span className="text-gold-600">Nest</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLink} end>
            Home
          </NavLink>
          <NavLink to="/properties" className={navLink}>
            Properties
          </NavLink>
          <NavLink to="/contact" className={navLink}>
            Contact
          </NavLink>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {adminSession?.user?.role === 'admin' ? (
            <Link to="/admin/dashboard">
              <Button variant="secondary" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          ) : null}
          {user ? (
            <Button variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
        <button type="button" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </Container>
      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/properties" onClick={() => setOpen(false)}>Properties</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
            <Link to="/login" onClick={() => setOpen(false)}>Sign In</Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
