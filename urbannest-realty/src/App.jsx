import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Toast from './components/ui/Toast.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import { fetchCmsContent } from './services/cmsService.js';

export default function App() {
  const location = useLocation();
  const isAdminShell = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  const isAdminLogin = location.pathname === '/admin/login';
  const [contact, setContact] = useState({});

  useEffect(() => {
    if (!isAdminShell && !isAdminLogin) {
      fetchCmsContent().then((c) => setContact(c.contact || {})).catch(() => {});
    }
  }, [isAdminShell, isAdminLogin]);

  if (isAdminLogin) {
    return (
      <>
        <AppRoutes />
        <Toast />
      </>
    );
  }

  if (isAdminShell) {
    return (
      <>
        <AppRoutes />
        <Toast />
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer contact={contact} />
      <Toast />
    </div>
  );
}
