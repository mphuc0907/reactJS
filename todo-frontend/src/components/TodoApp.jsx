import { useEffect, useState } from "react";
import axios from "../api/axios";


function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    stt: 1,
    content: "",
    status: "pending",
    start_date: "",
    end_date: "",
  });

  const fetchTodos = async () => {
    const res = await axios.get("/todos");
    setTodos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/todos", form);
    setForm({
      title: "",
      stt: 1,
      content: "",
      status: "pending",
      start_date: "",
      end_date: "",
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
    
      <div className="max-w-3xl mx-auto mt-6">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-2 bg-white p-4 rounded shadow"
        >
          <input
            type="text"
            placeholder="Tiêu đề"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Nội dung"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Số thứ tự"
            value={form.stt}
            onChange={(e) =>
              setForm({ ...form, stt: parseInt(e.target.value) })
            }
            className="w-full border p-2 rounded"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Thêm Todo
          </button>
        </form>

        <ul className="mt-6 space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-4 border rounded shadow bg-white flex justify-between items-start"
            >
              <div>
                <h2 className="font-bold">{todo.title}</h2>
                <p>{todo.content}</p>
                <small>Trạng thái: {todo.status}</small>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:underline"
              >
                Xoá
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
