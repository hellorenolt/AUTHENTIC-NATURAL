'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const PRICE = 1499;
const WHATSAPP = '923248019501';

const ingredients = [
  { name: 'Argan Oil', desc: 'Deeply moisturises and adds natural shine', tag: 'Moisture' },
  { name: 'Castor Oil', desc: 'Supports thicker, stronger looking hair', tag: 'Growth' },
  { name: 'Coconut Oil', desc: 'Nourishes from root to tip', tag: 'Nourish' },
  { name: 'Amla', desc: 'Traditional scalp and hair tonic', tag: 'Strength' },
  { name: 'Bhringraj', desc: 'Ayurvedic herb for healthy scalp', tag: 'Scalp' },
  { name: 'Vitamin E', desc: 'Protects and softens hair strands', tag: 'Protect' },
];

const steps = [
  { img: '/assets/use-01.png', title: 'Part your hair', text: 'Create sections so the oil reaches the scalp evenly.' },
  { img: '/assets/use-02.png', title: 'Warm a few drops', text: 'Rub between palms to activate the blend.' },
  { img: '/assets/use-03.png', title: 'Massage the scalp', text: 'Use circular motions for 3–5 minutes.' },
  { img: '/assets/use-04.png', title: 'Work through lengths', text: 'Focus on mid-lengths and ends where dryness shows.' },
  { img: '/assets/use-05.png', title: 'Leave it in', text: 'Minimum 30 minutes, or overnight for deeper care.' },
  { img: '/assets/use-06.png', title: 'Wash gently', text: 'Rinse with a mild shampoo. Style as usual.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, className = '', id, style }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [bag, setBag] = useState(0);
  const [qty, setQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [filter, setFilter] = useState('All');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    try {
      const s = localStorage.getItem('an-bag');
      if (s) setBag(Math.min(20, Math.max(0, parseInt(s) || 0)));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('an-bag', String(bag)); } catch {}
  }, [bag]);

  const addToBag = () => { setBag(b => Math.min(20, b + qty)); setCartOpen(true); };
  const orderWA = () => {
    const msg = encodeURIComponent(`Hello Authentic Naturals,\n\nI would like to order:\n• Hair Repair & Revive Growth Oil × ${bag}\nTotal: Rs. ${(bag * PRICE).toLocaleString('en-PK')}\n\nPlease confirm availability and delivery.`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };

  const filtered = ingredients.filter(ing => filter === 'All' || ing.tag === filter);

  return (
    <>
      <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        style={{ background: 'var(--green)', color: '#fff', textAlign: 'center', fontSize: 12, letterSpacing: '0.04em', padding: '10px 16px' }}>
        Your hair care, delivered to your door. <strong style={{ fontWeight: 500, marginLeft: 8 }}>Free delivery across Pakistan</strong>
        <span style={{ opacity: 0.8 }}> • 3 to 4 days</span>
      </motion.div>

      <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
        className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, height: 88, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', borderBottom: '1px solid var(--line)' }}>
        <a href="#"><Image src="/assets/logo-transparent.png" alt="Authentic Naturals" width={64} height={64} style={{ objectFit: 'contain' }} /></a>
        <nav style={{ display: 'flex', gap: 28, fontSize: 13, fontWeight: 500 }} className="desk-nav">
          <a href="#shop">Shop hair care</a>
          <a href="#ingredients">Our ingredients</a>
          <a href="#ritual">Your ritual</a>
          <a href="#story">Our story</a>
        </nav>
        <button onClick={() => setCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, padding: '10px 16px', borderRadius: 999, background: 'var(--green)', color: '#fff' }}>
          Bag <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '2px 8px', fontSize: 12 }}>{bag}</span>
        </button>
      </motion.header>

      <main>
        <section ref={heroRef} style={{ position: 'relative', minHeight: '86vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', overflow: 'hidden' }}>
          <motion.div style={{ opacity, padding: '60px 8% 40px' }}>
            <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', color: 'var(--olive)', marginBottom: 24 }}>NATURAL CARE FOR YOUR EVERYDAY ROUTINE</motion.p>
            <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} style={{ marginBottom: 24 }}>Give your hair<br /><em style={{ fontStyle: 'italic', color: 'var(--olive)', fontWeight: 400 }}>a little more care.</em></motion.h1>
            <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} style={{ maxWidth: 420, color: 'var(--muted)', marginBottom: 32 }}>Dry ends? Frizz that won’t settle? Make time for a little nourishment with our blend of oils and botanicals.</motion.p>
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
              <a href="#shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--green)', color: '#fff', padding: '16px 28px', borderRadius: 999, fontWeight: 500, fontSize: 14 }}>Take a closer look ↗</a>
            </motion.div>
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} style={{ marginTop: 36, fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>❧</span> Creating value through natural purity.
            </motion.div>
          </motion.div>
          <motion.div style={{ y, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: 40 }}>
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
              <Image src="/assets/product.png" alt="Product" width={520} height={520} priority style={{ objectFit: 'contain', maxHeight: 560 }} />
            </motion.div>
          </motion.div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, padding: '20px 5%', background: 'var(--cream-dark)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', fontSize: 12, fontWeight: 500, color: 'var(--green)', flexWrap: 'wrap' }}>
          {['Made for hair & scalp care', 'Free nationwide delivery', 'Cash on delivery', 'Care that fits your budget'].map(t => <span key={t}>{t}</span>)}
        </div>

        <Reveal id="shop" style={{ padding: '90px 6%', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5%', alignItems: 'center' }}>
            <motion.div variants={fadeUp} custom={0} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow)', position: 'relative' }}>
              <span style={{ position: 'absolute', top: 18, left: 18, fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', color: 'var(--olive)', zIndex: 2 }}>YOUR EVERYDAY ESSENTIAL</span>
              <Image src="/assets/product.png" alt="Product" width={600} height={600} style={{ width: '100%', height: 'auto' }} />
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--olive)', marginBottom: 12 }}>HAIR REPAIR & REVIVE GROWTH OIL</p>
              <h2 style={{ marginBottom: 16 }}>100 ml of quiet care</h2>
              <p style={{ color: 'var(--muted)', marginBottom: 24, maxWidth: 360 }}>A thoughtful blend of oils and botanicals made for everyday use. Softens, nourishes and helps your hair feel a little more cared for.</p>
              <div style={{ fontSize: 28, fontFamily: 'Cormorant Garamond, serif', marginBottom: 6 }}>Rs. {PRICE.toLocaleString('en-PK')}</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Free delivery • Cash on delivery</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 999 }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 42, height: 42, fontSize: 18 }}>−</button>
                  <span style={{ width: 36, textAlign: 'center', fontWeight: 500 }}>{qty}</span>
                  <button onClick={() => setQty(q => Math.min(10, q + 1))} style={{ width: 42, height: 42, fontSize: 18 }}>+</button>
                </div>
                <button onClick={addToBag} style={{ flex: 1, background: 'var(--green)', color: '#fff', padding: '14px 22px', borderRadius: 999, fontWeight: 500 }}>Add to bag</button>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal id="ingredients" style={{ background: 'var(--cream-dark)', padding: '90px 6%' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.div variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: 'var(--olive)', marginBottom: 12 }}>WHAT’S INSIDE</p>
              <h2>Simple ingredients. Clear purpose.</h2>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
              {['All', 'Moisture', 'Growth', 'Nourish', 'Strength', 'Scalp', 'Protect'].map(t => (
                <button key={t} onClick={() => setFilter(t)} style={{ padding: '8px 16px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: filter === t ? 'var(--green)' : 'transparent', color: filter === t ? '#fff' : 'var(--ink)', border: '1px solid var(--line)' }}>{t}</button>
              ))}
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
              {filtered.map((ing, i) => (
                <motion.div key={ing.name} variants={fadeUp} custom={i * 0.07} className="glass" whileHover={{ y: -6 }} style={{ padding: '26px 20px', borderRadius: 16, minHeight: 150 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--olive)' }}>{ing.tag}</span>
                  <h3 style={{ fontSize: 21, margin: '10px 0 8px', fontFamily: 'Cormorant Garamond, serif' }}>{ing.name}</h3>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)' }}>{ing.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="ritual" style={{ padding: '90px 6%' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.div variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: 'var(--olive)', marginBottom: 12 }}>YOUR RITUAL</p>
              <h2>How to use it</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
              <motion.div variants={fadeUp} custom={1}>
                <Image src={steps[activeStep].img} alt={steps[activeStep].title} width={480} height={480} style={{ borderRadius: 18, width: '100%', height: 'auto', boxShadow: 'var(--shadow)' }} />
              </motion.div>
              <div>
                {steps.map((step, i) => (
                  <motion.button key={i} variants={fadeUp} custom={i * 0.05} onClick={() => setActiveStep(i)}
                    style={{ display: 'flex', gap: 14, width: '100%', textAlign: 'left', padding: '16px 14px', borderRadius: 12, marginBottom: 6, background: activeStep === i ? 'var(--cream-dark)' : 'transparent', border: activeStep === i ? '1px solid var(--line)' : '1px solid transparent' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive)', minWidth: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 3 }}>{step.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)' }}>{step.text}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal id="story" style={{ background: 'var(--green)', color: '#fff', padding: '100px 6%' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <motion.p variants={fadeUp} custom={0} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', opacity: 0.7, marginBottom: 16 }}>OUR STORY</motion.p>
            <motion.h2 variants={fadeUp} custom={1} style={{ color: '#fff', marginBottom: 24 }}>Creating value through natural purity</motion.h2>
            <motion.p variants={fadeUp} custom={2} style={{ fontSize: 16, lineHeight: 1.8, opacity: 0.9, marginBottom: 32 }}>Authentic Naturals began with a simple belief: hair care should feel honest. We blend familiar oils and time-tested botanicals so you can give your hair a little more care — without complication or excess.</motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <a href="#shop" style={{ display: 'inline-flex', padding: '14px 30px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.35)', fontWeight: 500, fontSize: 14 }}>Shop the oil</a>
            </motion.div>
          </div>
        </Reveal>

        <footer style={{ padding: '44px 6%', borderTop: '1px solid var(--line)', textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
          <Image src="/assets/logo-transparent.png" alt="" width={44} height={44} style={{ margin: '0 auto 14px', opacity: 0.75 }} />
          <p>© {new Date().getFullYear()} Authentic Naturals. All rights reserved.</p>
          <p style={{ marginTop: 6 }}>Orders via WhatsApp • Free delivery across Pakistan</p>
        </footer>
      </main>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 80 }} />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="glass" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(380px, 100%)', zIndex: 90, padding: 26, display: 'flex', flexDirection: 'column', boxShadow: '-12px 0 40px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 22, fontFamily: 'Cormorant Garamond, serif' }}>Your bag</h3>
                <button onClick={() => setCartOpen(false)} style={{ fontSize: 22, opacity: 0.6 }}>×</button>
              </div>
              {bag === 0 ? <p style={{ color: 'var(--muted)', flex: 1 }}>Your bag is empty.</p> : (
                <>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                      <Image src="/assets/product.png" alt="" width={72} height={72} style={{ borderRadius: 10, background: '#fff' }} />
                      <div>
                        <div style={{ fontWeight: 500 }}>Hair Repair & Revive Growth Oil</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>100 ml × {bag}</div>
                        <div style={{ marginTop: 6, fontWeight: 500 }}>Rs. {(bag * PRICE).toLocaleString('en-PK')}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button onClick={() => setBag(b => Math.max(0, b - 1))} style={{ width: 34, height: 34, border: '1px solid var(--line)', borderRadius: 8 }}>−</button>
                      <span>{bag}</span>
                      <button onClick={() => setBag(b => Math.min(20, b + 1))} style={{ width: 34, height: 34, border: '1px solid var(--line)', borderRadius: 8 }}>+</button>
                    </div>
                  </div>
                  <button onClick={orderWA} style={{ width: '100%', background: 'var(--green)', color: '#fff', padding: '15px', borderRadius: 999, fontWeight: 500, fontSize: 15, marginTop: 20 }}>Order on WhatsApp</button>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 900px) {
          section { grid-template-columns: 1fr !important; }
          .desk-nav { display: none !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
