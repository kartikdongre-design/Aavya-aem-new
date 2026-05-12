import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/common/Loader.jsx';

const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const ProductsPage = lazy(() => import('../pages/ProductsPage.jsx'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage.jsx'));
const CartPage = lazy(() => import('../pages/CartPage.jsx'));
const WishlistPage = lazy(() => import('../pages/WishlistPage.jsx'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage.jsx'));
const LoginPage = lazy(() => import('../pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('../pages/SignupPage.jsx'));
const OrderSuccessPage = lazy(() => import('../pages/OrderSuccessPage.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));

/**
 * Application routes — each page lazy-loads independently for parity with production bundles.
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
