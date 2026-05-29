import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../layout/Container.jsx';
import PropertySearch from '../property/PropertySearch.jsx';
import Button from '../ui/Button.jsx';

export default function HeroSection({ cms }) {
  const hero = cms?.homepage || {};
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <img
        src={hero.heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
      <Container className="relative flex min-h-[85vh] flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">UrbanNest Realty</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {hero.heroTitle}
          </h1>
          <p className="mt-5 text-lg text-slate-300">{hero.heroSubtitle}</p>
          <Link to="/properties" className="mt-8 inline-block">
            <Button>{hero.ctaText || 'Explore Properties'}</Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 max-w-4xl"
        >
          <PropertySearch />
        </motion.div>
      </Container>
    </section>
  );
}
