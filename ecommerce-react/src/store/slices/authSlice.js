import { createSlice } from '@reduxjs/toolkit';

const loadUser = () => {
  try {
    const raw = localStorage.getItem('velvora_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadUser(),
    isAuthenticated: Boolean(loadUser()),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      try {
        localStorage.setItem('velvora_user', JSON.stringify(action.payload));
      } catch {
        /* ignore */
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem('velvora_user');
      } catch {
        /* ignore */
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
