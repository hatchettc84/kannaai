'use client';

import { useState, useEffect } from 'react';

const heroVideos = [
  'https://videos.pexels.com/video-files/3576880/3576880-sd_640_360_30fps.mp4',
  'https://videos.pexels.com/video-files/7667908/7667908-sd_640_360_25fps.mp4',
];

const productShowcase = [
  { image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=500&q=80', title: 'Premium Flower', subtitle: 'Hand-trimmed buds from local growers' },
  { image: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=500&q=80', title: 'Gourmet Edibles', subtitle: 'Precisely dosed treats and gummies' },
  { image: 'https://images.unsplash.com/photo-1616690002498-89e8e49710c2?w=500&q=80', title: 'Concentrates', subtitle: 'Solventless rosin and live resin' },
  { image: 'https://images.unsplash.com/photo-1585063560888-e56b8badf8ec?w=500&q=80', title: 'Pre-Rolls', subtitle: 'Ready to enjoy, crafted with care' },
  { image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&q=80', title: 'Tinctures & Oils', subtitle: 'Precise dosing for daily wellness' },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % productShowcase.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* Hero Section with Video Background */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        >
          <source src={heroVideos[0]} type="video/mp4" />
        </video>

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <h1 style={{ fontSize: 56, fontWeight: 800, marginBottom: 8, letterSpacing: -1, fontFamily: 'Georgia, serif' }}>
            KannaAI
          </h1>
          <p style={{ fontSize: 20, color: '#5B8C51', fontWeight: 600, marginBottom: 12 }}>
            Your Personal Cannabis Concierge
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.6, marginBottom: 40 }}>
            Tell Kanna how you feel. She'll recommend the perfect strain,
            find it at a dispensary near you, and help you reserve for pickup.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#download" style={{
              background: '#4A6741', color: '#fff',
              padding: '16px 32px', borderRadius: 16,
              fontSize: 16, fontWeight: 700, textDecoration: 'none',
            }}>
              Download the App
            </a>
            <a href="#how-it-works" style={{
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              padding: '16px 32px', borderRadius: 16,
              fontSize: 16, fontWeight: 600, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              See How It Works
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, opacity: 0.5, animation: 'bounce 2s infinite',
        }}>
          <div style={{ width: 24, height: 40, border: '2px solid rgba(255,255,255,0.4)', borderRadius: 12, position: 'relative' }}>
            <div style={{ width: 4, height: 8, background: '#fff', borderRadius: 2, position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)' }} />
          </div>
        </div>
      </section>

      {/* Product Showcase Carousel */}
      <section id="products" style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: '#5B8C51', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>
            Browse Products
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
            Discover What's Near You
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Flower, edibles, drinks, concentrates, and more — all from verified local dispensaries.
          </p>
        </div>

        {/* Carousel */}
        <div style={{ display: 'flex', gap: 16, overflow: 'hidden', justifyContent: 'center' }}>
          {productShowcase.map((item, idx) => (
            <div
              key={item.title}
              style={{
                flex: activeSlide === idx ? '0 0 320px' : '0 0 180px',
                height: activeSlide === idx ? 400 : 360,
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.5s ease',
                opacity: Math.abs(activeSlide - idx) > 2 ? 0 : 1,
                cursor: 'pointer',
              }}
              onClick={() => setActiveSlide(idx)}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: 20,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              }}>
                <h3 style={{ fontSize: activeSlide === idx ? 18 : 14, fontWeight: 700, marginBottom: 4 }}>
                  {item.title}
                </h3>
                {activeSlide === idx && (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{item.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {productShowcase.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setActiveSlide(idx)}
              style={{
                width: activeSlide === idx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: activeSlide === idx ? '#4A6741' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '80px 24px', background: '#111' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#5B8C51', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>
            How It Works
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 48 }}>
            Three Steps to Your Perfect Experience
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {[
              { step: '01', icon: '💬', title: 'Tell Kanna How You Feel', desc: '"I need to relax after work" or "Something creative for the weekend" — Kanna understands your mood and recommends the perfect strain.' },
              { step: '02', icon: '🗺️', title: 'Find It Nearby', desc: 'Kanna searches dispensaries near you with real-time inventory. See prices, stock, and distance — then get directions.' },
              { step: '03', icon: '📱', title: 'Reserve & Pick Up', desc: 'Reserve your products ahead of time. Walk in, pick up, and pay. No waiting, no guessing if it\'s in stock.' },
            ].map((item) => (
              <div key={item.step} style={{ background: '#1a1a1a', borderRadius: 20, padding: 32, textAlign: 'left' }}>
                <span style={{ fontSize: 32 }}>{item.icon}</span>
                <div style={{ color: '#4A6741', fontSize: 12, fontWeight: 700, marginTop: 16, marginBottom: 4 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dispensary CTA */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{
          maxWidth: 800, margin: '0 auto',
          background: 'linear-gradient(135deg, #4A6741, #2D3B2A)',
          borderRadius: 24, padding: 48, textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Own a Dispensary?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            List your products on KannaAI, reach new customers through AI recommendations,
            manage inventory, and run promotions — all from one dashboard.
          </p>
          <a
            href="https://biz.kannaai.com"
            style={{
              background: '#fff', color: '#4A6741',
              padding: '14px 28px', borderRadius: 12,
              fontSize: 15, fontWeight: 700, textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Get Started — Kanna for Business →
          </a>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" style={{ padding: '60px 24px 80px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🌿</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Get KannaAI</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24 }}>
          Available on iOS and Android — coming soon
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <div style={{
            background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '12px 24px', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Download on the</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>App Store</div>
          </div>
          <div style={{
            background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '12px 24px', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Get it on</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Google Play</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
          KannaAI © 2026 · Must be 21+ · Not medical advice ·{' '}
          <a href="https://biz.kannaai.com" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>
            Dispensary Portal
          </a>
        </p>
      </footer>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
