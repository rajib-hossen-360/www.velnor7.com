'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowUpRight,
  Truck,
  RefreshCw,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import DrawersAndModals from './components/DrawersAndModals';
import HeroSnow from './components/HeroSnow';
import { StoreProvider, useStore } from './context/StoreContext';
import { products, categories, guides, saleInfo } from './data';

function formatPKR(amount: number | null | undefined): string {
  if (amount == null) return 'Price on request';
  return `PKR ${Math.round(amount).toLocaleString('en-US')}`;
}

function HomeContent() {
  const { openProductModal, setSelectedGuide, addToCart } = useStore();

  // 3D Turning Rack state
  const [rackIndex, setRackIndex] = useState(0);

  const rackHandles = [
    { handle: 'celadon-faux-fur-coat', colorKey: 'cream' },
    { handle: 'suede-faux-fur-coat', colorKey: 'grey' },
    { handle: 'plain-belted-coat', colorKey: 'black' },
    { handle: 'plain-belted-coat', colorKey: 'camel' },
    { handle: 'suede-faux-fur-coat', colorKey: 'light-grey' },
  ];

  const rackPieces = useMemo(() => {
    return rackHandles.map(({ handle, colorKey }) => {
      const p = products.find((x) => x.handle === handle) || products[0];
      const c = p.colours?.find((col) => col.key === colorKey);
      const img = c?.images?.[0]?.src || p.images[0]?.src;
      return {
        product: p,
        colorKey,
        colorName: c?.name || p.colour.name,
        image: img,
        title: `${p.title}, ${(c?.name || p.colour.name).toLowerCase()}`,
      };
    });
  }, []);

  const currentRack = rackPieces[rackIndex] || rackPieces[0];

  // Auto-advance hero rack carousel every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRackIndex((prev) => (prev + 1) % rackPieces.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [rackIndex, rackPieces.length]);

  const justInProducts = useMemo(() => {
    return products.filter((p) => p.justIn).slice(0, 12);
  }, []);

  const watchAndShopReels = useMemo(() => {
    return products.slice(0, 10);
  }, []);

  const newInProducts = useMemo(() => {
    return products.filter((p) => p.isNew && !p.justIn).slice(0, 8);
  }, []);

  return (
    <>
      <Header />

      {/* 1. HERO SECTION WITH 3D TURNING RACK CAROUSEL */}
      <section className="hero" id="top">
        <HeroSnow />
        <div className="wrap hero__in">
          <div className="hero__copy">
            <p className="eyebrow">{saleInfo.name.toUpperCase()} · 20% OFF UNTIL {saleInfo.ends.toUpperCase()}</p>
            <h1 className="hero__title">
              Crafted for<br />
              Cold.
            </h1>
            <p className="hero__sub">
              Winter knitwear and coats, made in Bangladesh. Pay cash on delivery anywhere in the country.
            </p>
            <div className="hero__cta">
              <Link href="/shop?sale=1" className="btn btn--primary">
                Shop the sale
              </Link>
              <a href="#watch" className="btn btn--outline">
                <Play size={14} fill="currentColor" /> Watch and shop
              </a>
            </div>
          </div>

          {/* 3D Turning Rack Stage */}
          <div className="rack">
            <div className="rack__stage">
              {rackPieces.map((item, idx) => {
                const offset = (idx - rackIndex + rackPieces.length) % rackPieces.length;
                let transform = '';
                let opacity = 0;
                let zIndex = 1;

                if (offset === 0) {
                  transform = 'translate3d(0, 0, 90px) scale(1)';
                  opacity = 1;
                  zIndex = 5;
                } else if (offset === 1) {
                  transform = 'translate3d(var(--rack-x, 125px), 0, -35px) scale(0.85)';
                  opacity = 0.65;
                  zIndex = 4;
                } else if (offset === rackPieces.length - 1) {
                  transform = 'translate3d(calc(-1 * var(--rack-x, 125px)), 0, -35px) scale(0.85)';
                  opacity = 0.65;
                  zIndex = 4;
                } else {
                  transform = 'translate3d(0, 0, -180px) scale(0.68)';
                  opacity = 0.15;
                  zIndex = 2;
                }

                return (
                  <div
                    key={item.product.handle + item.colorKey}
                    className="rack__item"
                    style={{
                      transform,
                      opacity,
                      zIndex,
                    }}
                    onClick={() => {
                      if (offset === 0) openProductModal(item.product, item.colorKey);
                      else setRackIndex(idx);
                    }}
                  >
                    <span className="rack__shadow" />
                    <img src={item.image} alt={item.title} />
                  </div>
                );
              })}
            </div>

            <div className="rack__caption">
              <button
                className="rack__btn"
                aria-label="Previous piece"
                onClick={() => setRackIndex((prev) => (prev - 1 + rackPieces.length) % rackPieces.length)}
              >
                <ChevronLeft size={18} />
              </button>
              <div
                className="rack__label"
                onClick={() => openProductModal(currentRack.product, currentRack.colorKey)}
                style={{ cursor: 'pointer' }}
              >
                <span className="rack__name">{currentRack.title}</span>
                <span className="rack__price">
                  {currentRack.product.compareAt ? (
                    <>
                      <s style={{ marginRight: '6px' }}>{formatPKR(currentRack.product.compareAt)}</s>
                      <b>{formatPKR(currentRack.product.price)}</b>
                      <span className="rack__tag">−20%</span>
                    </>
                  ) : (
                    formatPKR(currentRack.product.price)
                  )}
                </span>
              </div>
              <button
                className="rack__btn"
                aria-label="Next piece"
                onClick={() => setRackIndex((prev) => (prev + 1) % rackPieces.length)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. JUST ARRIVED SECTION */}
      <section className="section wrap" id="arrived">
        <div className="section-head">
          <div>
            <p className="eyebrow">NEW STOCK</p>
            <h2 className="section-title">Just arrived</h2>
          </div>
          <Link href="/shop?sort=newest" className="text-link">
            See all new in <ArrowRight size={15} />
          </Link>
        </div>

        <div className="product-grid">
          {justInProducts.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      {/* 3. WATCH AND SHOP REELS */}
      <section className="reels" id="watch">
        <div className="wrap section-head">
          <h2 className="section-title">Watch and shop</h2>
          <div className="reels__nav">
            <button
              aria-label="Previous reel"
              onClick={() => {
                const el = document.getElementById('reels-track');
                if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              aria-label="Next reel"
              onClick={() => {
                const el = document.getElementById('reels-track');
                if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="wrap reels__track" id="reels-track">
          {watchAndShopReels.map((p) => (
            <article key={p.handle} className="reel">
              <div className="reel__media" onClick={() => openProductModal(p)}>
                <img src={p.images[0]?.src} alt={p.title} loading="lazy" />
              </div>
              <div className="reel__shop">
                <div className="reel__meta">
                  <span
                    style={{ cursor: 'pointer', fontFamily: "Georgia, 'Playfair Display', serif", fontSize: '15px' }}
                    onClick={() => openProductModal(p)}
                  >
                    {p.title}
                  </span>
                  <span className="reel__price">
                    {p.compareAt ? <b>{formatPKR(p.price)}</b> : formatPKR(p.price)}
                  </span>
                </div>
                <button
                  className="reel__btn"
                  aria-label={`Quick add ${p.title}`}
                  onClick={() => addToCart(p, p.variants[0]?.size || 'Free size')}
                >
                  <Plus size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. NEW IN SECTION */}
      <section className="section wrap" id="new-in">
        <div className="section-head">
          <h2 className="section-title">New in</h2>
          <Link href="/shop?sort=newest" className="text-link">
            See all new in <ArrowRight size={15} />
          </Link>
        </div>

        <div className="product-grid">
          {newInProducts.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      {/* 5. SHOP BY CATEGORY SECTION */}
      <section className="section wrap" id="category-section" style={{ paddingTop: 0 }}>
        <h2 className="section-title" id="cats-title" style={{ marginBottom: '28px' }}>
          Shop by category
        </h2>
        <div className="cats">
          {categories.map((cat, i) => (
            <Link
              key={cat.key}
              href={`/shop?cat=${cat.key}`}
              className={`cat ${i === 0 ? 'cat--coats' : i === 1 ? 'cat--wide' : ''}`}
            >
              <img src={cat.image} alt={cat.label} loading="lazy" decoding="async" />
              <span className="cat__label">
                <span className="cat__name">{cat.label}</span>
                <span className="cat__count">
                  {cat.count} {cat.count === 1 ? 'piece' : 'pieces'}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. BEFORE YOU BUY / GUIDES SECTION */}
      <section className="section wrap" id="guides">
        <div className="section-head">
          <h2 className="section-title">Before you buy</h2>
          <span className="text-link" style={{ cursor: 'pointer' }} onClick={() => setSelectedGuide(guides[0])}>
            All guides <ArrowRight size={15} />
          </span>
        </div>
        <ul className="guides">
          {guides.map((g) => (
            <li key={g.slug}>
              <div className="guide" onClick={() => setSelectedGuide(g)}>
                <span className="guide__title">{g.title}</span>
                <span className="guide__desc">{g.description}</span>
                <span className="text-link" style={{ marginTop: '16px', display: 'inline-flex' }}>
                  Read guide <ArrowUpRight size={14} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. BRAND STORY BANNER */}
      <section className="band" id="story">
        <div className="wrap">
          <h2 className="band__text">
            Built for winter, <em>not just worn in it.</em>
          </h2>
          <div className="band__row">
            <p>
              VELNOR7 makes knitwear and outerwear in Bangladesh for real cold-weather wear, through the whole season.
            </p>
            <p>
              <Link className="text-link" href="/shop">
                Read our story <ArrowRight size={15} />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 8. GUARANTEE / SERVICE TILES */}
      <section className="service wrap" aria-label="Shopping with VELNOR7">
        <div className="tile">
          <div className="tile-icon">
            <Truck size={22} />
          </div>
          <div>
            <h3>Cash on delivery</h3>
            <p>Pay when your order reaches your door, anywhere in Bangladesh.</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <RefreshCw size={22} />
          </div>
          <div>
            <h3>Size exchange</h3>
            <p>Wrong fit? Message us and we arrange another size.</p>
          </div>
        </div>
        <div className="tile">
          <div className="tile-icon">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3>Every order confirmed</h3>
            <p>We confirm your order before it ships. Cancel any time before dispatch.</p>
          </div>
        </div>
      </section>

      <Footer />
      <DrawersAndModals />
    </>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <main>
        <HomeContent />
      </main>
    </StoreProvider>
  );
}
