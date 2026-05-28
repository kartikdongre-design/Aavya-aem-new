import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../../../ecommerce-react/src/components/common/Loader.jsx';
import AdminRoute from '../components/AdminRoute.jsx';
import HomePageManaged from '../pages/HomePageManaged.jsx';
import AdminLoginPage from '../pages/AdminLoginPage.jsx';
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx';

const ProductsPage = lazy(() => import('../../../ecommerce-react/src/pages/ProductsPage.jsx'));
const ProductDetailPage = lazy(() => import('../../../ecommerce-react/src/pages/ProductDetailPage.jsx'));
const CartPage = lazy(() => import('../../../ecommerce-react/src/pages/CartPage.jsx'));
const WishlistPage = lazy(() => import('../../../ecommerce-react/src/pages/WishlistPage.jsx'));
const CheckoutPage = lazy(() => import('../../../ecommerce-react/src/pages/CheckoutPage.jsx'));
const LoginPage = lazy(() => import('../../../ecommerce-react/src/pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('../../../ecommerce-react/src/pages/SignupPage.jsx'));
const OrderSuccessPage = lazy(() => import('../../../ecommerce-react/src/pages/OrderSuccessPage.jsx'));
const NotFoundPage = lazy(() => import('../../../ecommerce-react/src/pages/NotFoundPage.jsx'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePageManaged />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={(
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          )}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
