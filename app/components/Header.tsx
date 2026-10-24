'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Search, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { saleInfo } from '../data';

export default function Header() {
  const { totalCartCount, saved, setIsCartOpen, setIsSavedOpen, setIsSearchOpen, setIsMenuOpen } = useStore();

  const navItems = [
    { label: 'New in', href: '/shop?sort=newest' },
    { label: 'Women', href: '/shop?for=women' },
    { label: 'Men', href: '/shop?for=men' },
    { label: 'Coats', href: '/shop?cat=coats' },
    { label: 'Cardigans', href: '/shop?cat=cardigans' },
    { label: 'Embroidered', href: '/shop?cat=embroidered-cardigans' },
    { label: 'Sweaters', href: '/shop?cat=sweaters' },
    { label: 'Story', href: '/#story' },
  ];

  return (
    <>
      {/* 1. TOP SALE BAR */}
      <Link href="/shop?sale=1" className="sale-bar">
        <strong>{saleInfo.name}</strong>
        <span>20% off on {saleInfo.onCount} pieces</span>
        <span className="sale-bar__ends">ends in 8 days</span>
        <span className="sale-bar__cta">
          Shop the sale <ArrowRight size={14} />
        </span>
      </Link>

      {/* 2. SITE HEADER */}
      <header className="site-header">
        <div className="wrap header__in">
          {/* Mobile Menu Button */}
          <button
            aria-label="Open menu"
            className="icon-btn header__menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <Link className="wordmark" href="/" aria-label="Home">
            <img
              src="/logo.png"
              alt="Logo"
              className="site-logo"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="header-actions">
            <button aria-label="Search" className="icon-btn" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
            </button>
            <button aria-label="Saved pieces" className="icon-btn" onClick={() => setIsSavedOpen(true)}>
              <Heart size={20} fill={saved.length > 0 ? 'currentColor' : 'none'} />
              {saved.length > 0 && <span className="badge-count">{saved.length}</span>}
            </button>
            <button aria-label="Shopping bag" className="icon-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {totalCartCount > 0 && <span className="badge-count">{totalCartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
