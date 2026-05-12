import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import BackToTop from './components/layout/BackToTop.jsx';

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
