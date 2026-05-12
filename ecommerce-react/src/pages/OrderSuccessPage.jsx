import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Container className="flex min-h-[60vh] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl rounded-[2rem] border border-emerald-200/80 bg-emerald-50/80 p-12 text-center shadow-2xl backdrop-blur-2xl dark:border-emerald-900/70 dark:bg-emerald-950/40"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg">
            <CheckCircle2 className="h-9 w-9" aria-hidden />
          </div>
          <h1 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-bold text-emerald-900 dark:text-emerald-100">
            Order placed
          </h1>
          <p className="mt-4 text-sm text-emerald-900/85 dark:text-emerald-50/85">
            We sent a recap to your email. Keep exploring while our warehouse stages your picks.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button type="button" onClick={() => navigate('/products')}>
              Keep shopping
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/')}>
              Back home
            </Button>
          </div>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
