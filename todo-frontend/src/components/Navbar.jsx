import { Link, useNavigate } from 'react-router-dom';
import { getUserRole, isLoggedIn, logout } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isLoggedIn()) return null;

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">TODO APP</div>
      <div className="space-x-4">
        {role === 'admin' ? (
          <>
            <Link to="/admin/todos" className="hover:underline">Tất cả công việc</Link>
            <Link to="/admin/users" className="hover:underline">Người dùng</Link>
            <Link to="/admin/todos/assign" className="hover:underline">Giao việc</Link>
          </>
        ) : (
          <>
            <Link to="/my-todos" className="hover:underline">Công việc của tôi</Link>
            <Link to="/todos/add" className="hover:underline">+ Thêm</Link>
          </>
        )}
        <button onClick={handleLogout} className="underline text-black ml-4">Đăng xuất</button>
      </div>
    </nav>
  );
}