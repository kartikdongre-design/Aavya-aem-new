import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-20 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-brand-700 dark:text-brand-300">
            Lost signal
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl font-bold text-zinc-900 dark:text-white">
            404
          </h1>
          <p className="mt-6 max-w-md text-base text-zinc-600 dark:text-zinc-300">
            Even glassmorphism can’t salvage this route. Navigate back home or revisit the storefront.
          </p>
          <Button type="button" className="mt-10 px-12" onClick={() => navigate('/')}>
            Take me home
          </Button>
          <Button type="button" variant="outline" className="mt-4 px-12" onClick={() => navigate('/products')}>
            Open shop
          </Button>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
