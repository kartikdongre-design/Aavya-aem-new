import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import AdminLayout from '../AdminLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Textarea from '../../components/ui/Textarea.jsx';
import { fetchProperties, createProperty, updateProperty, deleteProperty } from '../../services/propertyService.js';
import { uploadImage } from '../../services/authService.js';
import { showToast } from '../../store/slices/toastSlice.js';
import { CATEGORIES } from '../../utils/categories.js';
import { formatPrice } from '../../utils/formatPrice.js';

const emptyForm = {
  title: '',
  description: '',
  price: '',
  location: '',
  category: 'apartments',
  bedrooms: '',
  bathrooms: '',
  areaSqft: '',
  featured: false,
  status: 'for-sale',
  images: '',
  amenities: '',
  imageFile: null,
};

export default function AdminPropertiesPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const load = () => fetchProperties().then(setList).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      price: String(p.price),
      location: p.location,
      category: p.category,
      bedrooms: String(p.bedrooms),
      bathrooms: String(p.bathrooms),
      areaSqft: String(p.areaSqft),
      featured: p.featured,
      status: p.status,
      images: (p.images || []).join('\n'),
      amenities: (p.amenities || []).join(', '),
      imageFile: null,
    });
  };

  const buildPayload = async () => {
    let images = form.images.split('\n').map((s) => s.trim()).filter(Boolean);
    if (form.imageFile) {
      const url = await uploadImage(form.imageFile);
      images = [url, ...images];
    }
    return {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      location: form.location,
      category: form.category,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      areaSqft: Number(form.areaSqft) || 0,
      featured: form.featured,
      status: form.status,
      images,
      amenities: form.amenities.split(',').map((s) => s.trim()).filter(Boolean),
    };
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = await buildPayload();
      if (editingId) {
        await updateProperty(editingId, payload);
        dispatch(showToast({ message: 'Property updated.', type: 'success' }));
      } else {
        await createProperty(payload);
        dispatch(showToast({ message: 'Property created.', type: 'success' }));
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      dispatch(showToast({ message: err.message, type: 'error' }));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      await deleteProperty(id);
      dispatch(showToast({ message: 'Property deleted.', type: 'success' }));
      load();
    } catch (err) {
      dispatch(showToast({ message: err.message, type: 'error' }));
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold">Properties</h1>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Property' : 'New Property'}</h2>
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required disabled={busy} />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} disabled={busy} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} disabled={busy} />
            <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} disabled={busy} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <Input label="Beds" type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} disabled={busy} />
            <Input label="Baths" type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} disabled={busy} />
          </div>
          <Input label="Area (sqft)" type="number" value={form.areaSqft} onChange={(e) => setForm({ ...form, areaSqft: e.target.value })} disabled={busy} />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured
            </label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-lg border px-3 py-1 text-sm">
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Upload image</label>
            <input type="file" accept="image/*" className="mt-1 block w-full text-sm" onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })} />
          </div>
          <Textarea label="Image URLs (one per line)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} disabled={busy} />
          <Input label="Amenities (comma-separated)" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} disabled={busy} />
          <Button type="submit" disabled={busy}>{busy ? 'Saving...' : 'Save Property'}</Button>
        </form>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-b border-slate-100">
                  <td className="p-4">
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.location}</p>
                  </td>
                  <td className="p-4">{formatPrice(p.price, p.status)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => openEdit(p)} className="rounded-lg p-2 text-gold-600 hover:bg-gold-50" aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => remove(p.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
