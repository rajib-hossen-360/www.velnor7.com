'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { products, guides, Product } from '../data';

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

interface StoreContextType {
  cart: CartItem[];
  saved: string[];
  isMenuOpen: boolean;
  isCartOpen: boolean;
  isSavedOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  selectedProduct: Product | null;
  modalColorKey: string;
  modalSize: string;
  selectedGuide: typeof guides[0] | null;
  toast: string | null;
  totalCartCount: number;
  cartSubtotal: number;
  filteredProducts: Product[];
  setIsMenuOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSavedOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
  setSelectedProduct: (p: Product | null) => void;
  setModalColorKey: (key: string) => void;
  setModalSize: (size: string) => void;
  setSelectedGuide: (guide: typeof guides[0] | null) => void;
  showToast: (msg: string) => void;
  addToCart: (product: Product, size: string, e?: React.MouseEvent) => void;
  updateCartQty: (handle: string, size: string, delta: number) => void;
  toggleSave: (handle: string, e?: React.MouseEvent) => void;
  openProductModal: (product: Product, defaultColorKey?: string) => void;
  getWhatsAppOrderLink: () => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalColorKey, setModalColorKey] = useState<string>('');
  const [modalSize, setModalSize] = useState<string>('');
  const [selectedGuide, setSelectedGuide] = useState<typeof guides[0] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('v7-cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('v7-saved');
      if (savedWishlist) setSaved(JSON.parse(savedWishlist));
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('v7-cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('v7-saved', JSON.stringify(saved));
    } catch {}
  }, [saved]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const toggleSave = (handle: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSaved((prev) => {
      if (prev.includes(handle)) {
        showToast('Removed from saved pieces');
        return prev.filter((h) => h !== handle);
      } else {
        showToast('Saved to your pieces');
        return [...prev, handle];
      }
    });
  };

  const addToCart = (product: Product, size: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.handle === product.handle && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.handle === product.handle && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { product, size, qty: 1 }];
      }
    });
    showToast(`Added ${product.title} (${size}) to bag`);
  };

  const updateCartQty = (handle: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.handle === handle && item.size === size) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const openProductModal = (product: Product, defaultColorKey?: string) => {
    setSelectedProduct(product);
    const colKey = defaultColorKey || (product.colours ? product.colours[0].key : '');
    setModalColorKey(colKey);
    setModalSize(product.variants[0]?.size || 'Free size');
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchType = p.productType.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchColor = p.colour.name.toLowerCase().includes(q);
      return matchTitle || matchType || matchDesc || matchColor;
    });
  }, [searchQuery]);

  const getWhatsAppOrderLink = () => {
    if (cart.length === 0) return 'https://wa.me/923217429067?text=Hi%20VELNOR7,%20I%20want%20to%20order';
    let text = 'Hi VELNOR7, I would like to place an order for:\n\n';
    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.title} - Size: ${item.size} x ${item.qty} (PKR ${(item.product.price * item.qty).toLocaleString('en-US')})\n`;
    });
    text += `\nTotal: PKR ${cartSubtotal.toLocaleString('en-US')}\nPayment: Cash on Delivery\nPlease confirm my order.`;
    return `https://wa.me/923217429067?text=${encodeURIComponent(text)}`;
  };

  return (
    <StoreContext.Provider
      value={{
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
        showToast,
        addToCart,
        updateCartQty,
        toggleSave,
        openProductModal,
        getWhatsAppOrderLink,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
