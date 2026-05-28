import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../ecommerce-react/src/components/ui/Button.jsx';
import Input from '../../../ecommerce-react/src/components/ui/Input.jsx';
import FormAlert from '../../../ecommerce-react/src/components/ui/FormAlert.jsx';
import Container from '../../../ecommerce-react/src/components/layout/Container.jsx';
import PageWrapper from '../../../ecommerce-react/src/components/layout/PageWrapper.jsx';
import { clearAdminSession } from '../services/adminApi.js';
import { getCmsContent, updateCmsContent } from '../services/cmsApi.js';

function editableCard(content, idx, onChange) {
  return (
    <div key={content.id || idx} className="rounded-2xl border border-zinc-200/70 bg-white/80 p-4 dark:border-zinc-700 dark:bg-zinc-900/50">
      <Input
        label={`Card ${idx + 1} title`}
        value={content.title || ''}
        onChange={(e) => onChange(idx, 'title', e.target.value)}
      />
      <Input
        label="Description"
        value={content.description || ''}
        onChange={(e) => onChange(idx, 'description', e.target.value)}
        className="mt-3"
      />
      <Input
        label="Image URL"
        value={content.image || ''}
        onChange={(e) => onChange(idx, 'image', e.target.value)}
        className="mt-3"
      />
    </div>
  );
}

export default function AdminDashboardPage() {
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCmsContent()
      .then((data) => setContent(data))
      .catch((err) => setStatus({ type: 'error', message: err.message }));
  }, []);

  const cards = useMemo(() => content?.homepage?.featureCards || [], [content]);

  const setHomepageField = (key, value) => {
    setContent((prev) => ({
      ...prev,
      homepage: {
        ...prev.homepage,
        [key]: value,
      },
    }));
  };

  const setCardField = (idx, key, value) => {
    setContent((prev) => ({
      ...prev,
      homepage: {
        ...prev.homepage,
        featureCards: prev.homepage.featureCards.map((card, i) => (i === idx ? { ...card, [key]: value } : card)),
      },
    }));
  };

  const save = async () => {
    setBusy(true);
    setStatus({ type: '', message: '' });
    try {
      await updateCmsContent(content);
      setStatus({ type: 'success', message: 'Content saved and published immediately.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    clearAdminSession();
    navigate('/admin/login');
  };

  return (
    <PageWrapper>
      <Container className="py-10">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-white/55 bg-[var(--glass-light)] p-5 shadow-xl dark:border-white/10 dark:bg-[var(--glass-dark)]">
            <p className="text-xs uppercase tracking-[0.25em] text-brand-700 dark:text-brand-300">Admin Panel</p>
            <h2 className="mt-2 text-xl font-semibold">Content Manager</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Edit homepage text, banners, and cards.</p>
            <div className="mt-6 space-y-2">
              <Button className="w-full" onClick={save} disabled={busy}>
                {busy ? 'Saving...' : 'Save updates'}
              </Button>
              <Button variant="secondary" className="w-full" onClick={logout}>
                Logout
              </Button>
            </div>
          </aside>
          <section className="rounded-3xl border border-white/55 bg-[var(--glass-light)] p-6 shadow-xl dark:border-white/10 dark:bg-[var(--glass-dark)]">
            <h1 className="text-2xl font-bold">Homepage Controls</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Changes are persisted to JSON and visible instantly.</p>
            {status.message ? (
              <div className="mt-4">
                <FormAlert variant={status.type === 'success' ? 'success' : 'error'}>{status.message}</FormAlert>
              </div>
            ) : null}
            {content ? (
              <div className="mt-5 space-y-4">
                <Input label="Hero title" value={content.homepage?.heroTitle || ''} onChange={(e) => setHomepageField('heroTitle', e.target.value)} />
                <Input
                  label="Hero subtitle"
                  value={content.homepage?.heroSubtitle || ''}
                  onChange={(e) => setHomepageField('heroSubtitle', e.target.value)}
                />
                <Input
                  label="Banner image URL"
                  value={content.homepage?.bannerImage || ''}
                  onChange={(e) => setHomepageField('bannerImage', e.target.value)}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  {cards.map((card, idx) => editableCard(card, idx, setCardField))}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">Loading content...</p>
            )}
          </section>
        </div>
      </Container>
    </PageWrapper>
  );
}
