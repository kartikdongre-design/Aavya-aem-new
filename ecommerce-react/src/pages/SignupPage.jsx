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
import { validateRegisterFields } from '../../shared/validation.js';
import { registerUser } from '../services/authService.js';

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
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

  const validate = () => {
    const fieldErrors = validateRegisterFields(form);
    if (form.password && form.confirm && form.password !== form.confirm) {
      fieldErrors.confirm = 'Passwords must match';
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerUser({
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
          name: form.name.trim() || form.email.trim().split('@')[0] || 'Member',
          email: form.email.trim(),
        }),
      );
      navigate('/login');
    } catch {
      setStatus({
        type: 'error',
        message: 'Unable to reach the registration service. Is the API server running?',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoSocial = () => {
    dispatch(loginSuccess({ name: 'Social member', email: 'hello@velvora.shop' }));
    navigate('/');
  };

  return (
    <PageWrapper>
      <Container className="flex min-h-[calc(100vh-12rem)] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-[2rem] border border-white/55 bg-[var(--glass-light)] p-10 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[var(--glass-dark)]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-700 dark:text-brand-300">
            Become a member
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-zinc-900 dark:text-white">
            Create account
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Register with your email and password. Your credentials are stored securely on the server.
          </p>

          <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
            {status.message ? (
              <FormAlert variant={status.type === 'success' ? 'success' : 'error'}>
                {status.message}
              </FormAlert>
            ) : null}

            <Input
              label="Full name"
              name="name"
              value={form.name}
              onChange={onChange('name')}
              disabled={isSubmitting}
            />
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
              autoComplete="new-password"
              value={form.password}
              onChange={onChange('password')}
              error={errors.password}
              disabled={isSubmitting}
            />
            <Input
              label="Confirm password"
              name="confirm"
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={onChange('confirm')}
              error={errors.confirm}
              disabled={isSubmitting}
            />
            <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </Button>
          </form>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Button type="button" variant="secondary" className="w-full gap-2" onClick={demoSocial}>
              <Chrome className="h-4 w-4" /> Google
            </Button>
            <Button type="button" variant="secondary" className="w-full gap-2" onClick={demoSocial}>
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Already shopping?{' '}
            <Link className="font-semibold text-brand-700 underline-offset-4 hover:underline dark:text-brand-300" to="/login">
              Log in
            </Link>
          </p>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
