import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Chrome } from 'lucide-react';
import { useDispatch } from 'react-redux';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { loginSuccess } from '../store/slices/authSlice.js';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const onChange =
    (key) =>
      (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        setErrors({});
      };

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.password.length < 8) e.password = 'Minimum 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    dispatch(loginSuccess({ name: form.email.split('@')[0] || 'Member', email: form.email }));
    navigate('/');
  };

  const socialDisabled = () => {
    dispatch(loginSuccess({ name: 'Explore guest', email: 'guest@velvora.shop' }));
    navigate('/');
  };

  return (
    <PageWrapper>
      <Container className="flex min-h-[calc(100vh-12rem)] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md rounded-[2rem] border border-white/55 bg-[var(--glass-light)] p-10 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[var(--glass-dark)]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-700 dark:text-brand-300">
            Welcome back
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-zinc-900 dark:text-white">
            Log in to Velvora
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Credentials stay client-side — this is an interactive UX demo.
          </p>
          <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange('email')}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={onChange('password')}
              error={errors.password}
            />
            <Button type="submit" className="mt-4 w-full">
              Continue with email
            </Button>
          </form>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Button type="button" variant="secondary" className="w-full gap-2" onClick={socialDisabled}>
              <Chrome className="h-4 w-4" /> Google
            </Button>
            <Button type="button" variant="secondary" className="w-full gap-2" onClick={socialDisabled}>
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            New shopper?{' '}
            <Link className="font-semibold text-brand-700 underline-offset-4 hover:underline dark:text-brand-300" to="/signup">
              Create an account
            </Link>
          </p>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
