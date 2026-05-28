import { useEffect, useState } from 'react';
import { getCmsContent } from '../services/cmsApi.js';

const cardBase =
  'rounded-2xl border border-white/55 bg-white/70 p-5 shadow-xl shadow-brand-900/5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/65';

export default function ManagedHomepageSection() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    getCmsContent()
      .then((data) => {
        if (mounted) setContent(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (error) return null;
  if (!content?.homepage) return null;

  return (
    <section className="mx-auto mb-10 mt-8 max-w-6xl px-4">
      <div className={`${cardBase} overflow-hidden`}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700 dark:text-brand-300">Managed Content</p>
            <h2 className="mt-3 text-3xl font-bold">{content.homepage.heroTitle}</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">{content.homepage.heroSubtitle}</p>
          </div>
          {content.homepage.bannerImage ? (
            <img
              src={content.homepage.bannerImage}
              alt="Managed banner"
              className="h-56 w-full rounded-2xl object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(content.homepage.featureCards || []).map((card) => (
            <article key={card.id} className={cardBase}>
              {card.image ? <img src={card.image} alt={card.title} className="h-32 w-full rounded-xl object-cover" loading="lazy" /> : null}
              <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
