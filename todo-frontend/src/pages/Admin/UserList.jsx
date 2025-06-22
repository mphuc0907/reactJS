import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { getUserRole } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu không phải admin thì redirect
    if (getUserRole() !== 'admin') {
      navigate('/my-todos');
      return;
    }

    // Gọi API lấy danh sách user
    axios.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Không thể tải danh sách user:', err);
        alert('Không có quyền truy cập hoặc lỗi máy chủ');
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border text-blue-600">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
