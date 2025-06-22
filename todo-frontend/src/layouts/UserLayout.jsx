import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserRole, isLoggedIn, logout } from '../utils/auth';

export default function UserLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate('/login');
    if (getUserRole() === 'admin') navigate('/admin/todos');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Todo App - User</h1>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}