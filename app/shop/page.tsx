'use client';

import React, { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import DrawersAndModals from '../components/DrawersAndModals';
import { StoreProvider } from '../context/StoreContext';
import { products, categories, saleInfo, Product } from '../data';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCat = searchParams.get('cat') || '';
  const currentFor = searchParams.get('for') || '';
  const currentSort = searchParams.get('sort') || '';
  const currentSale = searchParams.get('sale') || '';

  const [sortOption, setSortOption] = useState<string>(currentSort || 'featured');

  // Filter products based on URL query params
  const filteredProducts = useMemo(() => {
    let list: Product[] = [...products];

    // Filter by Category
    if (currentCat) {
      if (currentCat === 'coats') list = list.filter((p) => p.productType === 'Coats');
      else if (currentCat === 'cardigans') list = list.filter((p) => p.productType === 'Cardigans');
      else if (currentCat === 'embroidered-cardigans')
        list = list.filter((p) => p.productType === 'Embroidered Cardigans');
      else if (currentCat === 'sweaters') list = list.filter((p) => p.productType === 'Sweaters');
    }

    // Filter by Gender
    if (currentFor) {
      if (currentFor.toLowerCase() === 'women') list = list.filter((p) => p.for === 'Women');
      else if (currentFor.toLowerCase() === 'men') list = list.filter((p) => p.for === 'Men');
    }

    // Filter by Sale
    if (currentSale === '1') {
      list = list.filter((p) => p.compareAt != null);
    }

    // Apply Sorting
    if (sortOption === 'newest' || currentSort === 'newest') {
      list.sort((a, b) => (b.justIn ? 1 : 0) - (a.justIn ? 1 : 0) || (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [currentCat, currentFor, currentSale, currentSort, sortOption]);

  // Page title and subtitle based on active filter
  const pageTitle = useMemo(() => {
    if (currentSale === '1') return 'Winter Sale';
    if (currentCat) {
      const match = categories.find((c) => c.key === currentCat);
      if (match) return match.label;
      return currentCat.charAt(0).toUpperCase() + currentCat.slice(1).replace('-', ' ');
    }
    if (currentFor) {
      return currentFor.toLowerCase() === 'women' ? "Women's Collection" : "Men's Collection";
    }
    if (currentSort === 'newest') return 'New Arrivals';
    return 'All Products';
  }, [currentCat, currentFor, currentSale, currentSort]);

  const pageSub = useMemo(() => {
    if (currentSale === '1') return '20% off selected winter coats and knitwear until Sunday 1 November.';
    if (currentCat === 'coats') return 'Tailored wool-look and faux-fur winter coats, crafted for real warmth.';
    if (currentCat === 'cardigans') return 'Heavy-knit zip bombers and mesh cardigans for versatile everyday layering.';
    if (currentCat === 'embroidered-cardigans')
      return 'Authentic embroidered artisan cardigans in floral, mandala, and scroll motifs.';
    if (currentCat === 'sweaters') return 'Cozy textured crews and V-neck knit sweaters made in Bangladesh.';
    return 'Coats, cardigans, and sweaters for real winter, made in Bangladesh. Cash on delivery nationwide.';
  }, [currentCat, currentSale]);

  const filterChips = [
    { label: 'All products', href: '/shop', isActive: !currentCat && !currentFor && !currentSale && !currentSort },
    { label: 'Winter Sale (−20%)', href: '/shop?sale=1', isActive: currentSale === '1', isSale: true },
    { label: 'Coats', href: '/shop?cat=coats', isActive: currentCat === 'coats' },
    { label: 'Cardigans', href: '/shop?cat=cardigans', isActive: currentCat === 'cardigans' },
    { label: 'Embroidered Cardigans', href: '/shop?cat=embroidered-cardigans', isActive: currentCat === 'embroidered-cardigans' },
    { label: 'Sweaters', href: '/shop?cat=sweaters', isActive: currentCat === 'sweaters' },
    { label: 'Women', href: '/shop?for=women', isActive: currentFor === 'women' },
    { label: 'Men', href: '/shop?for=men', isActive: currentFor === 'men' },
  ];

  return (
    <div className="shop wrap">
      {/* Page Heading */}
      <div className="shop__head">
        <h1 className="shop__title">{pageTitle}</h1>
        <p className="shop__sub">{pageSub}</p>
      </div>

      {/* Filter Chips Bar */}
      <div className="shop__bar">
        <div className="chips">
          {filterChips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.href}
              className={`chip ${chip.isActive ? 'is-active' : ''} ${chip.isSale ? 'chip--sale' : ''}`}
            >
              {chip.label}
            </Link>
          ))}
        </div>

        {/* Sort Select */}
        <select
          className="shop__sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Piece Count */}
      <p className="shop__count">
        Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'piece' : 'pieces'}
      </p>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: '18px', color: 'var(--ink)' }}>No pieces found in this category.</p>
          <p style={{ marginTop: '8px' }}>Try switching filters or view all products.</p>
          <Link href="/shop" className="btn btn--primary" style={{ marginTop: '20px' }}>
            View all products
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <StoreProvider>
      <main>
        <Header />
        <Suspense fallback={<div className="wrap" style={{ padding: '60px 0', textAlign: 'center' }}>Loading collection...</div>}>
          <ShopContent />
        </Suspense>
        <Footer />
        <DrawersAndModals />
      </main>
    </StoreProvider>
  );
}
