import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', password_confirmation: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/my-todos');
    } catch (err) {
      alert('Đăng ký thất bại: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>

        <input type="text" name="name" placeholder="Tên" required value={form.name}
          onChange={handleChange} className="w-full p-2 mb-3 border rounded" />

        <input type="email" name="email" placeholder="Email" required value={form.email}
          onChange={handleChange} className="w-full p-2 mb-3 border rounded" />

        <input type="password" name="password" placeholder="Mật khẩu" required value={form.password}
          onChange={handleChange} className="w-full p-2 mb-3 border rounded" />

        <input type="password" name="password_confirmation" placeholder="Xác nhận mật khẩu" required
          value={form.password_confirmation} onChange={handleChange}
          className="w-full p-2 mb-4 border rounded" />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Đăng ký
        </button>

        <p className="mt-4 text-sm">
          Đã có tài khoản? <a href="/login" className="text-blue-500 hover:underline">Đăng nhập</a>
        </p>
      </form>
    </div>
  );
}
