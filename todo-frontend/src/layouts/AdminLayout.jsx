import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserRole, isLoggedIn, logout } from '../utils/auth';
import Navbar from '../components/Navbar';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate('/login');
    if (getUserRole() !== 'admin') navigate('/my-todos');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}