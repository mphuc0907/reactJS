import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/auth';

export default function AssignTodo() {
  const [form, setForm] = useState({
    title: '',
    stt: 1,
    content: '',
    status: 'pending',
    start_date: '',
    end_date: '',
    id_user: ''
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserRole() !== 'admin') {
      navigate('/my-todos');
      return;
    }

    axios.get('/users')
      .then(res => setUsers(res.data))
      .catch(() => alert('Không tải được danh sách người dùng'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/todos', form);
      alert('Đã giao việc thành công!');
      navigate('/admin/todos');
    } catch (err) {
      alert('Lỗi khi giao việc');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Giao việc cho người dùng</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Tiêu đề" required
          value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />

        <textarea name="content" placeholder="Nội dung"
          value={form.content} onChange={handleChange} className="w-full p-2 border rounded" />

        <input type="number" name="stt" placeholder="Số thứ tự" required
          value={form.stt} onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="pending">Chưa làm</option>
          <option value="in_progress">Đang làm</option>
          <option value="done">Hoàn thành</option>
        </select>

        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="id_user" required value={form.id_user} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">-- Chọn người nhận việc --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
          ))}
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Giao việc
        </button>
      </form>
    </div>
  );
}
