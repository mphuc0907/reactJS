import { useState } from 'react';
import api from '../api';

interface Props {
  onLogin: () => void;
}

export default function LoginRegister({ onLogin }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/login' : '/register';
      const res = await api.post(url, form);
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch {
      alert('Đăng nhập/Đăng ký thất bại');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && <input name="name" placeholder="Tên" onChange={handleChange} required />}
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mật khẩu" onChange={handleChange} required />
        {!isLogin && (
          <input
            name="password_confirmation"
            type="password"
            placeholder="Xác nhận mật khẩu"
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Chuyển sang Đăng ký' : 'Chuyển sang Đăng nhập'}
      </button>
    </div>
  );
}
