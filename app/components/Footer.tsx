'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { guides } from '../data';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { setSelectedGuide } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      <div className="wrap footer__in">
        <div className="footer__brand">
          <Link className="wordmark" href="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="site-logo footer__logo"
            />
          </Link>
          <p>
            Designed with purpose. Created with precision. Made to be experienced, trusted, and remembered.
          </p>
        </div>

        <div className="footer__nav-cols">
          <div className="footer__col">
            <h4 className="footer__head">Shop</h4>
            <Link href="/shop?sort=newest">New in</Link>
            <Link href="/shop?for=women">Women</Link>
            <Link href="/shop?for=men">Men</Link>
            <Link href="/shop">All products</Link>
          </div>

          <div className="footer__col footer__col--help">
            <h4 className="footer__head">Help</h4>
            <Link href="/track">Track my order</Link>
            <span onClick={() => setSelectedGuide(guides[0])}>
              Guides
            </span>
            <span onClick={() => setSelectedGuide(guides[1])}>
              Size guide
            </span>
            <Link href="/shipping">Shipping and delivery</Link>
            <Link href="/returns">Returns and exchange</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/#story">Our story</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__head">Follow</h4>
            <a href="https://instagram.com/vel_nor7" target="_blank" rel="noopener noreferrer">
              Instagram @vel_nor7
            </a>
            <a href="https://tiktok.com/@velnor7official" target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a href="https://facebook.com/velnor7brandpk" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms of sale</Link>
          </div>
        </div>
      </div>

      <form
        className="wrap signup"
        onSubmit={(e) => {
          e.preventDefault();
          if (email.includes('@')) {
            setSubscribed(true);
            setEmail('');
          }
        }}
      >
        <label className="signup__label" htmlFor="email-input">
          New pieces and winter news, by email
        </label>
        <div className="signup__row">
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <button className="btn btn--primary" type="submit">
            Subscribe
          </button>
        </div>
        {subscribed && (
          <p style={{ marginTop: '10px', color: '#9bcb9e', fontSize: '13px' }}>
            Thank you. You have been subscribed to winter updates!
          </p>
        )}
      </form>

      <div className="wrap footer__base">
        <p>© 2026 VELNOR7. Crafted for Cold. Made in Bangladesh.</p>
        <p>Cash on delivery across Bangladesh</p>
      </div>
    </footer>
  );
}
