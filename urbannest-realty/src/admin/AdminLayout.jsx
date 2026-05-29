import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, FileText, LogOut, Home } from 'lucide-react';
import { clearAdminSession } from '../services/api.js';
import { cn } from '../utils/cn.js';

const linkClass = ({ isActive }) =>
  cn(
    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
    isActive ? 'bg-gold-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white',
  );

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    clearAdminSession();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-slate-950 p-6 text-white lg:static">
        <Link to="/" className="font-display text-2xl font-bold">
          Urban<span className="text-gold-400">Nest</span>
        </Link>
        <p className="mt-1 text-xs text-slate-500">Admin Panel</p>
        <nav className="mt-10 space-y-1">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/properties" className={linkClass}>
            <Building2 className="h-5 w-5" />
            Properties
          </NavLink>
          <NavLink to="/admin/content" className={linkClass}>
            <FileText className="h-5 w-5" />
            Website Content
          </NavLink>
          <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:text-white">
            <Home className="h-5 w-5" />
            View Site
          </Link>
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-auto flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-red-900/30 hover:text-red-300 lg:mt-10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </aside>
      <main className="flex-1 overflow-auto p-6 lg:p-10">{children}</main>
    </div>
  );
}
