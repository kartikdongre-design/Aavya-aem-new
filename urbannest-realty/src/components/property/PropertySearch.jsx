import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { CATEGORIES } from '../../utils/categories.js';

export default function PropertySearch({ compact = false }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (category) params.set('category', category);
    if (status) params.set('status', status);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className={`grid gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur md:grid-cols-4 ${compact ? '' : 'lg:p-5'}`}
    >
      <input
        type="search"
        placeholder="Location or keyword..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-gold-400 md:col-span-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-gold-400"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-gold-400"
      >
        <option value="">Buy or Rent</option>
        <option value="for-sale">For Sale</option>
        <option value="for-rent">For Rent</option>
      </select>
      <Button type="submit" className="md:col-span-4 lg:col-span-1 lg:col-start-4">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
}
