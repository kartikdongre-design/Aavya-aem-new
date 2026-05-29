import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AdminLayout from '../AdminLayout.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { fetchCmsContent, updateCmsContent } from '../../services/cmsService.js';
import { showToast } from '../../store/slices/toastSlice.js';

export default function AdminContentPage() {
  const [content, setContent] = useState(null);
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCmsContent().then(setContent).catch(console.error);
  }, []);

  const setHome = (key, value) => {
    setContent((c) => ({
      ...c,
      homepage: { ...c.homepage, [key]: value },
    }));
  };

  const setContact = (key, value) => {
    setContent((c) => ({
      ...c,
      contact: { ...c.contact, [key]: value },
    }));
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await updateCmsContent(content);
      dispatch(showToast({ message: 'Website content updated.', type: 'success' }));
    } catch (err) {
      dispatch(showToast({ message: err.message, type: 'error' }));
    } finally {
      setBusy(false);
    }
  };

  if (!content) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold">Website Content</h1>
      <form onSubmit={save} className="mt-8 max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Homepage Hero</h2>
        <Input label="Hero title" value={content.homepage?.heroTitle || ''} onChange={(e) => setHome('heroTitle', e.target.value)} disabled={busy} />
        <Input label="Hero subtitle" value={content.homepage?.heroSubtitle || ''} onChange={(e) => setHome('heroSubtitle', e.target.value)} disabled={busy} />
        <Input label="Hero image URL" value={content.homepage?.heroImage || ''} onChange={(e) => setHome('heroImage', e.target.value)} disabled={busy} />
        <Input label="CTA button text" value={content.homepage?.ctaText || ''} onChange={(e) => setHome('ctaText', e.target.value)} disabled={busy} />
        <h2 className="text-lg font-semibold pt-4">Contact Info</h2>
        <Input label="Phone" value={content.contact?.phone || ''} onChange={(e) => setContact('phone', e.target.value)} disabled={busy} />
        <Input label="Email" value={content.contact?.email || ''} onChange={(e) => setContact('email', e.target.value)} disabled={busy} />
        <Input label="Address" value={content.contact?.address || ''} onChange={(e) => setContact('address', e.target.value)} disabled={busy} />
        <Button type="submit" disabled={busy}>{busy ? 'Saving...' : 'Save Content'}</Button>
      </form>
    </AdminLayout>
  );
}
