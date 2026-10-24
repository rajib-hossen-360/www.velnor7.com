'use client';

import React from 'react';
import { Heart, Plus } from 'lucide-react';
import { Product } from '../data';
import { useStore } from '../context/StoreContext';

function formatPKR(amount: number | null | undefined): string {
  if (amount == null) return 'Price on request';
  return `PKR ${Math.round(amount).toLocaleString('en-US')}`;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { saved, toggleSave, addToCart, openProductModal } = useStore();
  const isLiked = saved.includes(product.handle);

  const cutoutImg = product.images[0]?.src;
  const studioImg =
    product.images.find((img) => img.kind === 'studio' || img.kind === 'detail')?.src || cutoutImg;

  return (
    <article className="card">
      <div className="card__frame">
        <div className="card__media" onClick={() => openProductModal(product)}>
          <img className="card__cutout" src={cutoutImg} alt={product.title} loading="lazy" />
          <img className="card__studio" src={studioImg} alt={product.title} loading="lazy" />
        </div>

        {/* Badges */}
        <div className="card__tags">
          {product.justIn && <span className="tag tag--new">Just in</span>}
          {!product.justIn && product.isNew && <span className="tag tag--new">New</span>}
          {product.compareAt && <span className="tag tag--sale">−20%</span>}
        </div>

        {/* Wishlist Heart */}
        <button
          className={`card__save ${isLiked ? 'is-saved' : ''}`}
          aria-label={`Save ${product.title}`}
          onClick={(e) => toggleSave(product.handle, e)}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {/* Desktop Quick Size selector on hover */}
        <div className="card__quick">
          {product.variants.map((v) => (
            <button
              key={v.size}
              className="card__size"
              onClick={(e) => addToCart(product, v.size, e)}
              title={`Add size ${v.size}`}
            >
              {v.size}
            </button>
          ))}
        </div>

        {/* Mobile Quick Add Button */}
        <button
          className="card__add-mobile"
          onClick={(e) => addToCart(product, product.variants[0]?.size || 'Free size', e)}
          aria-label={`Add ${product.title} to bag`}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Card Body */}
      <div className="card__body" onClick={() => openProductModal(product)}>
        <h3 className="card__title">{product.title}</h3>
        <span className="card__meta">
          {product.colours ? `${product.colours.length} colours` : product.colour.name}
        </span>
        <div className="card__price-row">
          {product.compareAt ? (
            <>
              <span className="card__was">{formatPKR(product.compareAt)}</span>
              <span className="card__now">{formatPKR(product.price)}</span>
            </>
          ) : (
            <span className="card__normal-price">{formatPKR(product.price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
