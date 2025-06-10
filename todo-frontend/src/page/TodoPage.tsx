interface Todo {
  id: number;
  title: string;
  stt: number;
  content: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'in_progress' | 'done';
}
import { useEffect, useState } from 'react';
import api from '../api';

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form, setForm] = useState<Omit<Todo, 'id'>>({
    title: '',
    stt: 0,
    content: '',
    start_date: '',
    end_date: '',
    status: 'pending',
  });

  const fetchTodos = async () => {
    const res = await api.get('/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTodo = async () => {
    await api.post('/todos', form);
    setForm({ title: '', stt: 0, content: '', start_date: '', end_date: '', status: 'pending' });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  const toggleStatus = async (todo: Todo) => {
    const nextStatus =
      todo.status === 'pending' ? 'in_progress' : todo.status === 'in_progress' ? 'done' : 'pending';

    await api.put(`/todos/${todo.id}`, { ...todo, status: nextStatus });
    fetchTodos();
  };

  const logout = async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <h2 className="text-3xl font-bold text-blue-600">Todo List</h2>
      <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} />
      <input name="content" placeholder="Nội dung" value={form.content} onChange={handleChange} />
      <input name="start_date" type="date" value={form.start_date} onChange={handleChange} />
      <input name="end_date" type="date" value={form.end_date} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={addTodo}>Thêm</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> ({todo.status}) - STT: {todo.stt}
            <br />
            {todo.content} | {todo.start_date} → {todo.end_date}
            <br />
            <button onClick={() => toggleStatus(todo)}>Đổi trạng thái</button>
            <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
          </li>
        ))}
      </ul>

      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
}
