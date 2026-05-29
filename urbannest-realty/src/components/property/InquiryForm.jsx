import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../ui/Input.jsx';
import Textarea from '../ui/Textarea.jsx';
import Button from '../ui/Button.jsx';
import { submitInquiry } from '../../services/authService.js';
import { showToast } from '../../store/slices/toastSlice.js';

export default function InquiryForm({ propertyId = null, type = 'contact', title = 'Send Inquiry' }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [busy, setBusy] = useState(false);

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await submitInquiry({ ...form, propertyId, type });
      dispatch(showToast({ message: 'Thank you! We will contact you soon.', type: 'success' }));
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      dispatch(showToast({ message: err.message, type: 'error' }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <Input label="Name" value={form.name} onChange={onChange('name')} required disabled={busy} />
      <Input label="Email" type="email" value={form.email} onChange={onChange('email')} required disabled={busy} />
      <Input label="Phone" value={form.phone} onChange={onChange('phone')} disabled={busy} />
      <Textarea label="Message" value={form.message} onChange={onChange('message')} required disabled={busy} />
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  );
}
