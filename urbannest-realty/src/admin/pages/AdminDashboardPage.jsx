import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star, DollarSign, MessageSquare } from 'lucide-react';
import AdminLayout from '../AdminLayout.jsx';
import { fetchAdminStats } from '../../services/authService.js';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className={`inline-flex rounded-xl p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAdminStats().then((d) => setStats(d.stats)).catch(console.error);
  }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Overview of your real estate platform.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Building2} label="Total Properties" value={stats?.totalProperties ?? '—'} color="bg-gold-600" />
        <StatCard icon={Star} label="Featured" value={stats?.featured ?? '—'} color="bg-amber-500" />
        <StatCard icon={DollarSign} label="For Sale" value={stats?.forSale ?? '—'} color="bg-emerald-600" />
        <StatCard icon={MessageSquare} label="Inquiries" value={stats?.inquiries ?? '—'} color="bg-slate-700" />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/properties" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-gold-300">
          <h2 className="text-lg font-semibold">Manage Properties</h2>
          <p className="mt-1 text-sm text-slate-500">Add, edit, or delete listings</p>
        </Link>
        <Link to="/admin/content" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-gold-300">
          <h2 className="text-lg font-semibold">Edit Website Content</h2>
          <p className="mt-1 text-sm text-slate-500">Hero, testimonials, contact info</p>
        </Link>
      </div>
    </AdminLayout>
  );
}
