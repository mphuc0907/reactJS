import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/auth';

export default function MyTodos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    axios.get('/todos')
      .then(res => setTodos(res.data))
      .catch(() => alert('Không thể tải danh sách công việc'));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xoá công việc này?')) return;
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      alert('Xoá thất bại');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Công việc của tôi</h2>
        <button onClick={() => navigate('/todos/add')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Thêm công việc
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">STT</th>
              <th className="p-2 border">Tiêu đề</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="p-2 border">{todo.stt}</td>
                <td className="p-2 border font-medium">{todo.title}</td>
                <td className="p-2 border text-sm">{todo.status}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => navigate(`/todos/edit/${todo.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >Sửa</button>

                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
