import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/my-todos');
    } catch (err) {
      alert('Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" required className="w-full p-2 mb-3 border rounded" />

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu" required className="w-full p-2 mb-4 border rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Đăng nhập
        </button>

        <p className="mt-4 text-sm">
          Chưa có tài khoản? <a href="/register" className="text-blue-500 hover:underline">Đăng ký</a>
        </p>
      </form>
    </div>
  );
}