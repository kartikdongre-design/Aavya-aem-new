import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem('velvora_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (ids) => {
  try {
    localStorage.setItem('velvora_wishlist', JSON.stringify(ids));
  } catch {
    /* ignore */
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    productIds: loadFromStorage(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      const idx = state.productIds.indexOf(id);
      if (idx >= 0) {
        state.productIds.splice(idx, 1);
      } else {
        state.productIds.push(id);
      }
      saveToStorage(state.productIds);
    },
    clearWishlist: (state) => {
      state.productIds = [];
      saveToStorage(state.productIds);
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
