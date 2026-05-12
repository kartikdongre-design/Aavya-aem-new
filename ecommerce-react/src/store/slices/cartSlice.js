import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem('velvora_cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items) => {
  try {
    localStorage.setItem('velvora_cart', JSON.stringify(items));
  } catch {
    /* ignore */
  }
};

const initialState = {
  items: loadFromStorage(),
  coupon: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedSize, selectedColor } = action.payload;
      const key = `${product.id}-${selectedSize || 'default'}-${selectedColor || 'default'}`;
      const existing = state.items.find(
        (i) => i.key === key,
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          key,
          product,
          quantity,
          selectedSize: selectedSize || null,
          selectedColor: selectedColor || null,
        });
      }
      saveToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { key, quantity } = action.payload;
      const item = state.items.find((i) => i.key === key);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      saveToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.key !== action.payload);
      saveToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      saveToStorage(state.items);
    },
    applyCoupon: (state, action) => {
      const code = (action.payload || '').trim().toUpperCase();
      if (code === 'SAVE10') {
        state.coupon = { code, percent: 10 };
      } else if (code === 'WELCOME20') {
        state.coupon = { code, percent: 20 };
      } else {
        state.coupon = null;
      }
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;
