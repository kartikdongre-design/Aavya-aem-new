import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Container from '../layout/Container.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 3200);
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-white/55 bg-gradient-to-r from-brand-600 via-violet-600 to-fuchsia-500 p-10 text-white shadow-2xl dark:border-white/10"
        >
          <div className="pointer-events-none absolute inset-y-0 right-[-20%] w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_62%)]" />
          <div className="relative grid gap-8 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3 space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="h-4 w-4" /> Newsletter
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
                First access to launches & invites
              </h2>
              <p className="max-w-2xl text-sm text-white/85 sm:text-base">
                Join tens of thousands of members receiving curated drops — no clutter, unsubscribe anytime.
              </p>
            </div>
            <form className="lg:col-span-2 space-y-3" onSubmit={submit}>
              <Input
                type="email"
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                className="rounded-2xl border-white/35 bg-white/15 text-white placeholder:text-white/60 focus:border-white focus:ring-white/30"
              />
              <Button type="submit" variant="secondary" className="w-full border-white/30 bg-white/15 text-white hover:bg-white/25">
                {sent ? 'You’re on the list — thanks!' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
