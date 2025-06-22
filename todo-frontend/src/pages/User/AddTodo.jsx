import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddTodo() {
  const [form, setForm] = useState({
    title: '',
    stt: 1,
    content: '',
    status: 'pending',
    start_date: '',
    end_date: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/todos', form);
      alert('Đã thêm công việc');
      navigate('/my-todos');
    } catch (err) {
      alert('Thêm thất bại');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Thêm công việc mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Tiêu đề" required
          value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />

        <textarea name="content" placeholder="Nội dung" value={form.content} onChange={handleChange} className="w-full p-2 border rounded" />

        <input type="number" name="stt" placeholder="Số thứ tự" required
          value={form.stt} onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="pending">Chưa làm</option>
          <option value="in_progress">Đang làm</option>
          <option value="done">Hoàn thành</option>
        </select>

        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Lưu công việc
        </button>
      </form>
    </div>
  );
}