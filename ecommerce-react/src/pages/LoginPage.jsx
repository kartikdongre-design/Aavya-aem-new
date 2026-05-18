import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Chrome } from 'lucide-react';
import { useDispatch } from 'react-redux';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import FormAlert from '../components/ui/FormAlert.jsx';
import { loginSuccess } from '../store/slices/authSlice.js';
import { validateLoginFields } from '../../shared/validation.js';
import { loginUser } from '../services/authService.js';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange =
    (key) =>
      (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        setErrors((prev) => {
          if (!prev[key]) return prev;
          const next = { ...prev };
          delete next[key];
          return next;
        });
        setStatus({ type: '', message: '' });
      };

  const submit = async (ev) => {
    ev.preventDefault();
    setStatus({ type: '', message: '' });

    const fieldErrors = validateLoginFields(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      if (!result.success) {
        if (result.errors) setErrors(result.errors);
        setStatus({ type: 'error', message: result.message });
        return;
      }

      setStatus({ type: 'success', message: result.message });
      dispatch(
        loginSuccess({
          name: form.email.trim().split('@')[0] || 'Member',
          email: form.email.trim(),
        }),
      );
      navigate('/');
    } catch {
      setStatus({
        type: 'error',
        message: 'Unable to reach the login service. Is the API server running?',
      });
    } finally {
      setIsSubmitting(false);
    }
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
            Sign in with your email and password. New accounts are saved securely on the server.
          </p>

          <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
            {status.message ? (
              <FormAlert variant={status.type === 'success' ? 'success' : 'error'}>
                {status.message}
              </FormAlert>
            ) : null}

            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange('email')}
              error={errors.email}
              disabled={isSubmitting}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={onChange('password')}
              error={errors.password}
              disabled={isSubmitting}
            />
            <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in…' : 'Login'}
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
