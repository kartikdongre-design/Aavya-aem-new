import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../components/layout/Container.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { loginClient } from '../services/authService.js';
import { loginSuccess } from '../store/slices/authSlice.js';
import { showToast } from '../store/slices/toastSlice.js';
import { validateLoginFields } from '../../shared/validation.js';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateLoginFields(form);
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    setBusy(true);
    try {
      const data = await loginClient(form);
      dispatch(loginSuccess(data.user));
      dispatch(showToast({ message: data.message, type: 'success' }));
      navigate('/');
    } catch (err) {
      dispatch(showToast({ message: err.message, type: 'error' }));
      if (err.data?.errors) setErrors(err.data.errors);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="font-display text-3xl font-bold">Client Sign In</h1>
        <form className="mt-8 space-y-4" onSubmit={submit}>
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} disabled={busy} />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} disabled={busy} />
          <Button type="submit" className="w-full" disabled={busy}>{busy ? 'Signing in...' : 'Sign In'}</Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          No account? <Link to="/register" className="font-semibold text-gold-600">Register</Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link to="/admin/login" className="text-slate-500 hover:text-gold-600">Admin login</Link>
        </p>
      </div>
    </Container>
  );
}
