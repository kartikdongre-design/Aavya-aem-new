import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import PropertiesPage from '../pages/PropertiesPage.jsx';
import PropertyDetailPage from '../pages/PropertyDetailPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import AdminLoginPage from '../admin/pages/AdminLoginPage.jsx';
import AdminDashboardPage from '../admin/pages/AdminDashboardPage.jsx';
import AdminPropertiesPage from '../admin/pages/AdminPropertiesPage.jsx';
import AdminContentPage from '../admin/pages/AdminContentPage.jsx';
import AdminRoute from '../admin/AdminRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:slug" element={<PropertyDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={(
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        )}
      />
      <Route
        path="/admin/properties"
        element={(
          <AdminRoute>
            <AdminPropertiesPage />
          </AdminRoute>
        )}
      />
      <Route
        path="/admin/content"
        element={(
          <AdminRoute>
            <AdminContentPage />
          </AdminRoute>
        )}
      />
      <Route path="*" element={<div className="py-20 text-center">Page not found</div>} />
    </Routes>
  );
}
