import Container from '../layout/Container.jsx';

export default function PartnersSection({ partners = [] }) {
  if (!partners.length) return null;
  return (
    <section className="border-y border-slate-200 py-12">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500">Trusted Partners</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((p) => (
            <span key={p.id} className="text-lg font-semibold text-slate-400 transition hover:text-gold-600">
              {p.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
