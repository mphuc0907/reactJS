import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/auth';

export default function AllTodos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserRole() !== 'admin') {
      navigate('/my-todos');
      return;
    }

    axios.get('/todos')
      .then(res => setTodos(res.data))
      .catch(() => alert('Không thể tải danh sách công việc'));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tất cả công việc (Admin)</h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">STT</th>
              <th className="p-2 border">Tiêu đề</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Người được giao</th>
              <th className="p-2 border">Ngày bắt đầu</th>
              <th className="p-2 border">Ngày kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="p-2 border">{todo.stt}</td>
                <td className="p-2 border font-medium">{todo.title}</td>
                <td className="p-2 border text-sm">{todo.status}</td>
                <td className="p-2 border text-sm">{todo.user?.name || 'N/A'}</td>
                <td className="p-2 border text-sm">{todo.start_date || '-'}</td>
                <td className="p-2 border text-sm">{todo.end_date || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}