import { Navigate, useLocation } from 'react-router-dom';
import { getAdminSession } from '../services/adminApi.js';

export default function AdminRoute({ children }) {
  const location = useLocation();
  const session = getAdminSession();
  if (!session?.token || session?.user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
