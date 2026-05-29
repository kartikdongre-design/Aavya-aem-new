import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginAdmin } from '../../services/authService.js';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import Container from '../../components/layout/Container.jsx';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await loginAdmin(form);
      navigate(location.state?.from || '/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Container className="flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 text-white shadow-2xl">
          <p className="text-xs uppercase tracking-widest text-gold-400">Admin Only</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Admin Sign In</h1>
          <form className="mt-8 space-y-4" onSubmit={submit}>
            {error ? <p className="rounded-xl bg-red-900/40 px-4 py-3 text-sm text-red-200">{error}</p> : null}
            <Input label="Admin email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={busy} className="bg-slate-800 text-white border-slate-700" />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} disabled={busy} className="bg-slate-800 text-white border-slate-700" />
            <Button type="submit" className="w-full" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
