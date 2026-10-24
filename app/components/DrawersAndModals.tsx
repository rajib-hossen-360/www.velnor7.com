'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Search,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

function formatPKR(amount: number | null | undefined): string {
  if (amount == null) return 'Price on request';
  return `PKR ${Math.round(amount).toLocaleString('en-US')}`;
}

export default function DrawersAndModals() {
  const {
    cart,
    saved,
    isMenuOpen,
    isCartOpen,
    isSavedOpen,
    isSearchOpen,
    searchQuery,
    selectedProduct,
    modalColorKey,
    modalSize,
    selectedGuide,
    toast,
    totalCartCount,
    cartSubtotal,
    filteredProducts,
    setIsMenuOpen,
    setIsCartOpen,
    setIsSavedOpen,
    setIsSearchOpen,
    setSearchQuery,
    setSelectedProduct,
    setModalColorKey,
    setModalSize,
    setSelectedGuide,
    addToCart,
    updateCartQty,
    toggleSave,
    openProductModal,
    getWhatsAppOrderLink,
  } = useStore();

  return (
    <>
      {/* 0. MOBILE MENU DRAWER */}
      <div
        className={`drawer-scrim ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
      <aside className={`drawer drawer--left ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="drawer__head">
          <h2 className="drawer__title">Menu</h2>
          <button className="icon-btn" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="drawer__body menu-nav" aria-label="Shop">
          <Link href="/shop?sort=newest" onClick={() => setIsMenuOpen(false)}>New in</Link>
          <Link href="/shop?for=women" onClick={() => setIsMenuOpen(false)}>Women</Link>
          <Link href="/shop?for=men" onClick={() => setIsMenuOpen(false)}>Men</Link>
          <Link href="/shop?cat=coats" onClick={() => setIsMenuOpen(false)}>Coats</Link>
          <Link href="/shop?cat=cardigans" onClick={() => setIsMenuOpen(false)}>Cardigans</Link>
          <Link href="/shop?cat=embroidered-cardigans" onClick={() => setIsMenuOpen(false)}>Embroidered Cardigans</Link>
          <Link href="/shop?cat=sweaters" onClick={() => setIsMenuOpen(false)}>Sweaters</Link>
          <span className="menu-divider" />
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="menu-sublink">All pieces</Link>
          <Link href="/#guides" onClick={() => setIsMenuOpen(false)} className="menu-sublink">Care guides</Link>
          <Link href="/#story" onClick={() => setIsMenuOpen(false)} className="menu-sublink">Our story</Link>
        </nav>
      </aside>

      {/* 1. SHOPPING BAG DRAWER */}
      <div
        className={`drawer-scrim ${isCartOpen ? 'is-open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />
      <aside className={`drawer ${isCartOpen ? 'is-open' : ''}`}>
        <div className="drawer__head">
          <h2 className="drawer__title">Your bag ({totalCartCount})</h2>
          <button className="icon-btn" onClick={() => setIsCartOpen(false)} aria-label="Close bag">
            <X size={20} />
          </button>
        </div>
        <div className="drawer__body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <p style={{ fontSize: '16px', color: 'var(--ink)' }}>Your bag is empty.</p>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>Discover new coats and knitwear.</p>
              <button
                className="btn btn--primary"
                style={{ marginTop: '20px' }}
                onClick={() => setIsCartOpen(false)}
              >
                Browse collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.handle}-${item.size}`} className="cart-item">
                <img src={item.product.images[0]?.src} alt={item.product.title} />
                <div className="cart-item__info">
                  <div>
                    <h4 style={{ fontSize: '15px' }}>{item.product.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                      Size: {item.size} · {item.product.colour.name}
                    </p>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>
                      {formatPKR(item.product.price * item.qty)}
                    </p>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateCartQty(item.product.handle, item.size, -1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateCartQty(item.product.handle, item.size, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer__foot">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
              <span>Subtotal:</span>
              <strong style={{ color: 'var(--ink)' }}>{formatPKR(cartSubtotal)}</strong>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
              Cash on delivery across Bangladesh. Delivery fee calculated at checkout.
            </p>
            <a
              href={getWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              style={{ width: '100%', gap: '8px' }}
            >
              <MessageCircle size={18} />
              Confirm order on WhatsApp
            </a>
          </div>
        )}
      </aside>

      {/* 2. SAVED PIECES (WISHLIST) DRAWER */}
      <div
        className={`drawer-scrim ${isSavedOpen ? 'is-open' : ''}`}
        onClick={() => setIsSavedOpen(false)}
      />
      <aside className={`drawer ${isSavedOpen ? 'is-open' : ''}`}>
        <div className="drawer__head">
          <h2 className="drawer__title">Saved pieces ({saved.length})</h2>
          <button className="icon-btn" onClick={() => setIsSavedOpen(false)} aria-label="Close saved">
            <X size={20} />
          </button>
        </div>
        <div className="drawer__body">
          {saved.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
              <Heart size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <p style={{ fontSize: '16px', color: 'var(--ink)' }}>No saved pieces yet.</p>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>Click the heart on any coat or cardigan.</p>
            </div>
          ) : (
            filteredProducts
              .filter((p) => saved.includes(p.handle))
              .map((p) => (
                <div key={p.handle} className="cart-item">
                  <img src={p.images[0]?.src} alt={p.title} />
                  <div className="cart-item__info">
                    <div>
                      <h4 style={{ fontSize: '15px' }}>{p.title}</h4>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>
                        {formatPKR(p.price)}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn--primary"
                        style={{ height: '32px', padding: '0 12px', fontSize: '12px' }}
                        onClick={() => addToCart(p, p.variants[0]?.size || 'Free size')}
                      >
                        Add to bag
                      </button>
                      <button
                        className="btn btn--outline"
                        style={{ height: '32px', padding: '0 10px', fontSize: '12px' }}
                        onClick={() => toggleSave(p.handle)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </aside>

      {/* 3. PRODUCT DETAIL QUICK-VIEW MODAL */}
      <div
        className={`modal-overlay ${selectedProduct ? 'is-open' : ''}`}
        onClick={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close">
              <X size={18} />
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
                padding: '28px',
              }}
            >
              <div>
                <div
                  style={{
                    aspectRatio: '4 / 5',
                    background: 'var(--photo)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--line)',
                  }}
                >
                  <img
                    src={
                      (selectedProduct.colours?.find((c) => c.key === modalColorKey)?.images[0]?.src) ||
                      selectedProduct.images[0]?.src
                    }
                    alt={selectedProduct.title}
                    style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <span className="eyebrow">{selectedProduct.productType} · {selectedProduct.for}</span>
                  <h2 style={{ fontSize: '28px', marginTop: '6px' }}>{selectedProduct.title}</h2>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
                    {selectedProduct.compareAt && (
                      <s style={{ color: 'var(--muted)', fontSize: '15px' }}>{formatPKR(selectedProduct.compareAt)}</s>
                    )}
                    <strong
                      style={{
                        fontSize: '22px',
                        color: selectedProduct.compareAt ? 'var(--red-bright)' : 'var(--ink)',
                      }}
                    >
                      {formatPKR(selectedProduct.price)}
                    </strong>
                    {selectedProduct.compareAt && <span className="tag tag--sale">−20%</span>}
                  </div>
                </div>

                <p style={{ color: 'var(--ink-2)', fontSize: '14px', lineHeight: 1.6 }}>
                  {selectedProduct.about || selectedProduct.description}
                </p>

                {/* Colours */}
                {selectedProduct.colours && selectedProduct.colours.length > 1 && (
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                      COLOUR: {selectedProduct.colours.find((c) => c.key === modalColorKey)?.name}
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {selectedProduct.colours.map((col) => (
                        <button
                          key={col.key}
                          onClick={() => setModalColorKey(col.key)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: col.hex,
                            border: modalColorKey === col.key ? '2px solid var(--ink)' : '2px solid transparent',
                            outline: '1px solid rgba(255,255,255,0.2)',
                          }}
                          title={col.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                    SIZE: {modalSize}
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedProduct.variants.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setModalSize(v.size)}
                        style={{
                          minWidth: '44px',
                          height: '38px',
                          padding: '0 12px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          background: modalSize === v.size ? 'var(--ink)' : 'var(--well)',
                          color: modalSize === v.size ? '#121110' : 'var(--ink)',
                          border: '1px solid var(--line)',
                        }}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button
                    className="btn btn--primary"
                    style={{ flex: 1 }}
                    onClick={() => {
                      addToCart(selectedProduct, modalSize);
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                  >
                    Add to bag
                  </button>
                  <button
                    className="btn btn--outline"
                    onClick={() => toggleSave(selectedProduct.handle)}
                  >
                    <Heart size={18} fill={saved.includes(selectedProduct.handle) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {selectedProduct.details && selectedProduct.details.length > 0 && (
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                    <h4
                      style={{
                        fontSize: '13px',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                      }}
                    >
                      Piece Details
                    </h4>
                    <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13px', color: 'var(--muted)' }}>
                      {selectedProduct.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. GUIDE DETAIL MODAL */}
      <div
        className={`modal-overlay ${selectedGuide ? 'is-open' : ''}`}
        onClick={() => setSelectedGuide(null)}
      >
        {selectedGuide && (
          <div
            className="modal-card"
            style={{ maxWidth: '640px', padding: '32px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedGuide(null)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="eyebrow">VELNOR7 GUIDE</span>
            <h2 style={{ fontSize: '26px', marginTop: '8px', marginBottom: '14px' }}>
              {selectedGuide.title}
            </h2>
            <p style={{ color: '#c7c1bb', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              {selectedGuide.lead}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {selectedGuide.sections.map((sec, idx) => (
                <div key={idx} style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--ink)', marginBottom: '8px' }}>
                    {sec.heading}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.6 }}>
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. INSTANT SEARCH MODAL */}
      <div
        className={`search-modal ${isSearchOpen ? 'is-open' : ''}`}
        onClick={() => setIsSearchOpen(false)}
      >
        <div style={{ width: '100%', maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button className="icon-btn" onClick={() => setIsSearchOpen(false)} aria-label="Close search">
              <X size={24} />
            </button>
          </div>
          <div className="search-input-wrap">
            <Search size={24} color="var(--muted)" />
            <input
              type="text"
              placeholder="Search coats, cardigans, fur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isSearchOpen}
            />
          </div>

          <div style={{ marginTop: '28px', maxHeight: '68vh', overflowY: 'auto' }}>
            {searchQuery.trim() === '' ? (
              <p style={{ color: 'var(--muted)', textAlign: 'center', paddingTop: '40px' }}>
                Type to find coats, cardigans, sweaters or colours...
              </p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ color: 'var(--muted)', textAlign: 'center', paddingTop: '40px' }}>
                No pieces found matching &ldquo;{searchQuery}&rdquo;
              </p>
            ) : (
              <div className="product-grid" style={{ gap: '20px' }}>
                {filteredProducts.map((p) => (
                  <article
                    key={p.handle}
                    className="card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openProductModal(p);
                    }}
                  >
                    <div className="card__frame">
                      <img className="card__cutout" src={p.images[0]?.src} alt={p.title} />
                    </div>
                    <div className="card__body">
                      <h4 className="card__title">{p.title}</h4>
                      <span className="card__meta">{p.colour.name}</span>
                      <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                        {formatPKR(p.price)}
                      </strong>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. FLOATING WHATSAPP CHAT BUTTON */}
      <a
        href="https://wa.me/923217429067?text=Hi%20VELNOR7,%20I%20have%20a%20question%20about%20your%20pieces."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Support"
      >
        <MessageCircle size={26} />
      </a>

      {/* 7. TOAST NOTIFICATION */}
      <div className={`toast ${toast ? 'is-visible' : ''}`}>{toast}</div>
    </>
  );
}
