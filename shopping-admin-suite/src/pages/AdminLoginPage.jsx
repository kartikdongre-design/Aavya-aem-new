import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../../../ecommerce-react/src/components/layout/Container.jsx';
import PageWrapper from '../../../ecommerce-react/src/components/layout/PageWrapper.jsx';
import Button from '../../../ecommerce-react/src/components/ui/Button.jsx';
import Input from '../../../ecommerce-react/src/components/ui/Input.jsx';
import FormAlert from '../../../ecommerce-react/src/components/ui/FormAlert.jsx';
import { loginAdmin } from '../services/adminApi.js';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setStatus('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      const result = await loginAdmin(form);
      if (!result.success) {
        setStatus(result.message);
        return;
      }
      navigate(location.state?.from || '/admin/dashboard', { replace: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageWrapper>
      <Container className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-[2rem] border border-white/55 bg-[var(--glass-light)] p-10 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[var(--glass-dark)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-700 dark:text-brand-300">Admin Access</p>
          <h1 className="mt-3 text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Only administrators can access content editing tools.</p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            {status ? <FormAlert>{status}</FormAlert> : null}
            <Input label="Admin email" type="email" value={form.email} onChange={onChange('email')} disabled={busy} />
            <Input label="Password" type="password" value={form.password} onChange={onChange('password')} disabled={busy} />
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? 'Signing in...' : 'Sign in as admin'}
            </Button>
          </form>
        </div>
      </Container>
    </PageWrapper>
  );
}
