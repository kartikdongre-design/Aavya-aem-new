import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images = [], alt = '' }) {
  const [active, setActive] = useState(0);

  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/55 bg-[var(--glass-light)] shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[var(--glass-dark)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={main}
            src={main}
            alt={alt}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0.6, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="aspect-square w-full object-cover lg:aspect-[5/6]"
          />
        </AnimatePresence>
      </div>
      <div className="flex gap-3 lg:flex-col lg:w-28">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`relative overflow-hidden rounded-2xl border-2 shadow-md transition ${i === active ? 'border-brand-500 ring-2 ring-brand-300/40' : 'border-transparent opacity-80 hover:opacity-100'}`}
            aria-label={`View image ${i + 1}`}
          >
            <img src={src} alt="" className="h-16 w-full object-cover sm:h-20 lg:h-24" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
