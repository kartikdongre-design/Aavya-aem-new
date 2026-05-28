import Navbar from '../../ecommerce-react/src/components/layout/Navbar.jsx';
import Footer from '../../ecommerce-react/src/components/layout/Footer.jsx';
import BackToTop from '../../ecommerce-react/src/components/layout/BackToTop.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-violet-50 via-white to-brand-50/40 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-black dark:text-white">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
